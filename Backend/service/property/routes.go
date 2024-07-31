package property

import (
	"fmt"
	"learninggo/service/auth"
	"learninggo/types"
	"learninggo/utils"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
)

type Handler struct {
	store  types.PropertyStore
	Ustore types.UserStore
}

func NewHandler(store types.PropertyStore, Ustore types.UserStore) *Handler {
	return &Handler{
		store:  store,
		Ustore: Ustore,
	}
}

func (h *Handler) RegisterRoutes(router *mux.Router) {
	router.HandleFunc("/property/create/house", auth.WithJWTAuth(h.handleCreateHouse, h.Ustore)).Methods("POST")
	router.HandleFunc("/property/create/apartment", auth.WithJWTAuth(h.handleCreateApartment, h.Ustore)).Methods("POST")
	router.HandleFunc("/property/create/commercial", auth.WithJWTAuth(h.handleCreateCommercial, h.Ustore)).Methods("POST")
	router.HandleFunc("/getsaleproperty", h.handleGetSaleProperty).Methods("GET")
}

func parseFilters(r *http.Request) types.PropertyFilters {
	query := r.URL.Query()
	filters := types.PropertyFilters{}

	filters.Category = query.Get("category")
	filters.State = query.Get("state")
	filters.City = query.Get("city")

	if priceMin, err := strconv.Atoi(query.Get("priceMin")); err == nil {
		filters.PriceMin = priceMin
	}

	if priceMax, err := strconv.Atoi(query.Get("priceMax")); err == nil {
		filters.PriceMax = priceMax
	}

	filters.Search = query.Get("search")

	if limit, err := strconv.Atoi(query.Get("limit")); err == nil {
		filters.Limit = limit
	} else {
		filters.Limit = 24 // default limit
	}

	if page, err := strconv.Atoi(query.Get("page")); err == nil {
		filters.Page = page
	} else {
		filters.Page = 1 // default page
	}

	return filters
}
func (h *Handler) handleGetSaleProperty(w http.ResponseWriter, r *http.Request) {
	filters := parseFilters(r)
	properties, err := h.store.GetSaleProperty(filters)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJSON(w, http.StatusOK, properties)

}
func (h *Handler) handleCreateHouse(w http.ResponseWriter, r *http.Request) {
	contextValues := r.Context().Value(auth.UserKey).(types.UserContext)
	userVerified := contextValues.Verified

	if !userVerified {
		http.Error(w, "you must be verified to add a property", http.StatusUnauthorized)
		return
	}

	var payload types.PropertyHousePayload

	if err := utils.ParseJSON(r, &payload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	if err := utils.Validate.Struct(payload); err != nil {
		errors := err.(validator.ValidationErrors)
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid payload: %v", errors))
		return
	}

	err := h.store.CreateHouse(payload)

	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJSON(w, http.StatusOK, nil)
}

func (h *Handler) handleCreateApartment(w http.ResponseWriter, r *http.Request) {
	contextValues := r.Context().Value(auth.UserKey).(types.UserContext)
	userVerified := contextValues.Verified

	if !userVerified {
		http.Error(w, "you must be verified to add a property", http.StatusUnauthorized)
		return
	}

	var payload types.PropertyApartmentPayload

	if err := utils.ParseJSON(r, &payload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	if err := utils.Validate.Struct(payload); err != nil {
		errors := err.(validator.ValidationErrors)
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid payload: %v", errors))
		return
	}
	err := h.store.CreateApartment(payload)

	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJSON(w, http.StatusOK, nil)

}
func (h *Handler) handleCreateCommercial(w http.ResponseWriter, r *http.Request) {
	contextValues := r.Context().Value(auth.UserKey).(types.UserContext)
	userVerified := contextValues.Verified

	if !userVerified {
		http.Error(w, "you must be verified to add a property", http.StatusUnauthorized)
		return
	}
	var payload types.PropertyCommercialPayload
	if err := utils.ParseJSON(r, &payload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	if err := utils.Validate.Struct(payload); err != nil {
		errors := err.(validator.ValidationErrors)
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid payload: %v", errors))
		return
	}

	err := h.store.CreateCommercial(payload)

	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJSON(w, http.StatusOK, nil)

}
