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
	router.HandleFunc("/getrentproperty", h.handleGetRentProperty).Methods("GET")
	router.HandleFunc("/getproperty/{id}", h.handleGetProperty).Methods("GET")
	router.HandleFunc("/admin/getallproperty", auth.WithJWTAuth(h.handleGetAllProperty, h.Ustore)).Methods("GET")
	router.HandleFunc("/myproperty/forsale", auth.WithJWTAuth(h.handleGetMySaleProperty, h.Ustore)).Methods("GET")

	// dashboard content
	router.HandleFunc("/dashboard/getactivelistings", auth.WithJWTAuth(h.handleDashGetActiveListings, h.Ustore)).Methods("GET")
	router.HandleFunc("/dashboard/getpendinglistings", auth.WithJWTAuth(h.handleDashGetPendingListings, h.Ustore)).Methods("GET")
	router.HandleFunc("/dashboard/getdocument/{id}", auth.WithJWTAuth(h.handleDashGetDocument, h.Ustore)).Methods("GET")
	router.HandleFunc("/dashboard/submitdocument", auth.WithJWTAuth(h.handleDashSubmitDocument, h.Ustore)).Methods("POST")
	router.HandleFunc("/dashboard/getallpendingproperty/{page}", auth.WithJWTAuth(h.GetAllPendingProperty, h.Ustore)).Methods("GET")
	router.HandleFunc("/dashboard/verifyproperty", auth.WithJWTAuth(h.handleVerifyProperty, h.Ustore)).Methods("POST")
}

func parseFilters(r *http.Request) types.PropertyFilters {
	query := r.URL.Query()
	filters := types.PropertyFilters{}

	filters.Type = query.Get("type")
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

	if limit, err := strconv.Atoi(query.Get("Limit")); err == nil {
		filters.Limit = limit
	} else {
		filters.Limit = 15 // default limit
	}

	if page, err := strconv.Atoi(query.Get("page")); err == nil {
		filters.Page = page
	} else {
		filters.Page = 1 // default page
	}

	filters.Verified = query.Get("verified")
	filters.Status = query.Get("status")

	return filters
}
func (h *Handler) handleDashGetPendingListings(w http.ResponseWriter, r *http.Request) {
	contextValues := r.Context().Value(auth.UserKey).(types.UserContext)
	userID := contextValues.ID
	property, err := h.store.DashGetPropertyNotVerified(userID)

	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}
	count := len(property) // Assuming 'property' is a slice

	// Prepare the response
	response := map[string]interface{}{
		"count":    count,
		"property": property,
	}
	utils.WriteJSON(w, http.StatusOK, response)
}
func (h *Handler) GetAllPendingProperty(w http.ResponseWriter, r *http.Request) {
	contextValues := r.Context().Value(auth.UserKey).(types.UserContext)
	if contextValues.Role != "admin" {
		http.Error(w, "you must be an admin to view all properties", http.StatusUnauthorized)
		return
	}

	page, err := strconv.Atoi(mux.Vars(r)["page"])
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid page number"))
		return
	}


	property,count, err := h.store.GetAllPendingProperty(page)

	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}


	// Prepare the response
	response := map[string]interface{}{
		"count":    count,
		"property": property,
	}
	utils.WriteJSON(w, http.StatusOK, response)
}
func (h *Handler) handleDashGetActiveListings(w http.ResponseWriter, r *http.Request) {
	contextValues := r.Context().Value(auth.UserKey).(types.UserContext)
	userID := contextValues.ID

	property, err := h.store.DashGetPropertyVerified(userID)

	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}
	count := len(property) // Assuming 'property' is a slice

	// Prepare the response
	response := map[string]interface{}{
		"count":    count,
		"property": property,
	}
	utils.WriteJSON(w, http.StatusOK, response)
}
func (h *Handler) handleGetProperty(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid id"))
		return
	}

	property, err := h.store.GetPropertyByID(id)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJSON(w, http.StatusOK, property)
}
func (h *Handler) handleGetMySaleProperty(w http.ResponseWriter, r *http.Request) {
}
func (h *Handler) handleGetAllProperty(w http.ResponseWriter, r *http.Request) {
	contextValues := r.Context().Value(auth.UserKey).(types.UserContext)
	userRole := contextValues.Role

	if userRole != "admin" {
		http.Error(w, "you must be an admin to view all properties", http.StatusUnauthorized)
		return
	}

	filters := parseFilters(r)
	properties, count, err := h.store.GetAllProperty(filters, false)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	output := types.AllProperty{
		Properties: properties,
		Count:      count,
	}

	utils.WriteJSON(w, http.StatusOK, output)
}
func (h *Handler) handleGetRentProperty(w http.ResponseWriter, r *http.Request) {
	filters := parseFilters(r)
	filters.Verified = "yes"
	filters.Status = "available"
	properties, count, err := h.store.GetAllProperty(filters, true)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}
	output := types.AllProperty{
		Properties: properties,
		Count:      count,
	}
	utils.WriteJSON(w, http.StatusOK, output)
}
func (h *Handler) handleGetSaleProperty(w http.ResponseWriter, r *http.Request) {
	filters := parseFilters(r)
	filters.Verified = "yes"
	filters.Status = "available"
	filters.Type = "sale"
	properties, count, err := h.store.GetAllProperty(filters, true)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}
	output := types.AllProperty{
		Properties: properties,
		Count:      count,
	}

	utils.WriteJSON(w, http.StatusOK, output)
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
