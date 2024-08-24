package property

import (
	"fmt"
	"learninggo/service/auth"
	"learninggo/types"
	"learninggo/utils"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func (h *Handler) handleDashGetDocument(w http.ResponseWriter, r *http.Request) {
	// contextValues := r.Context().Value(auth.UserKey).(types.UserContext)
	// userID := contextValues.ID  for unauthorised access check --- future implementation

	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid id"))
		return
	}
	h.SendDocument(id, w)
}

func (h *Handler) handleDashSubmitDocument(w http.ResponseWriter, r *http.Request) {
	// contextValues := r.Context().Value(auth.UserKey).(types.UserContext)
	// userID := contextValues.ID for unauthorised access check --- future implementation

	var payload types.PropertyDocumentPayload

	if err := utils.ParseJSON(r, &payload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	// check if the document is already submitted
	documentID, err := h.store.GetDocumentID(payload.PropertyID)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	// if document is already submitted, update the document
	if documentID != 0 {
		err = h.store.UpdateDocument(payload)
		if err != nil {
			utils.WriteError(w, http.StatusInternalServerError, err)
			return
		}

		h.SendDocument(documentID, w)
		return
	}

	// if document is not submitted, submit the document
	err = h.store.SubmitDocument(payload)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	documentID, err = h.store.GetDocumentID(payload.PropertyID)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	h.SendDocument(documentID, w)
}

func (h *Handler) SendDocument(documentID int, w http.ResponseWriter) {
	document, err := h.store.GetDocumentByID(documentID)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJSON(w, http.StatusOK, document)
}

func (h *Handler) handleVerifyProperty(w http.ResponseWriter, r *http.Request) {
	contextValues := r.Context().Value(auth.UserKey).(types.UserContext)
	userRole := contextValues.Role

	fmt.Print(userRole)

	if userRole != "admin" {
		utils.WriteError(w, http.StatusForbidden, fmt.Errorf("unauthorized access"))
		return
	}

	var payload types.PropertyVerifyPayload
	if err := utils.ParseJSON(r, &payload); err != nil {
		fmt.Println("error")
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}
	// check if payload.message is null or not

	if payload.Message == "" {
		fmt.Println("message is null")
	}
	
	err := h.store.VerifyProperty(payload)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJSON(w, http.StatusOK, nil)
}
