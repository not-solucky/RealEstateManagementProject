package property

import (
	"learninggo/service/auth"
	"learninggo/types"
	"net/http"

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
}

// func (h *Handler) eligibilityCheck(w http.ResponseWriter, r *http.Request) (bool){
// 	return false
// }

func (h *Handler) handleCreateHouse(w http.ResponseWriter, r *http.Request) {
	

}
func (h *Handler) handleCreateApartment(w http.ResponseWriter, r *http.Request) {

}
func (h *Handler) handleCreateCommercial(w http.ResponseWriter, r *http.Request) {

}
