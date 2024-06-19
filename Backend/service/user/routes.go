package user

import (
	"fmt"
	"learninggo/types"
	"learninggo/utils"
	"learninggo/service/auth"
	"log"
	"net/http"
	"strconv"
	"github.com/gorilla/mux"
	"github.com/go-playground/validator/v10"
	"learninggo/config"
)

type Handler struct {
	store types.UserStore
}

func NewHandler(store types.UserStore) *Handler {
	return &Handler{ store: store }
}

func (h *Handler) RegisterRoutes(router *mux.Router) {

	router.HandleFunc("/login", h.handleLogin).Methods("POST")
	router.HandleFunc("/register", h.handleRegister).Methods("POST")
	router.HandleFunc("/users/{id}", auth.WithJWTAuth(h.handleGetUser, h.store)).Methods(http.MethodGet)
}
func (h *Handler) handleGetUser(w http.ResponseWriter, r *http.Request) {
	log.Println("Get user handler")
	vars := mux.Vars(r)
	id := vars["id"]
	log.Println("ID", id)
	idInt, err := strconv.Atoi(id)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	user, err := h.store.GetUserByID(idInt)
	if err != nil {
		utils.WriteError(w, http.StatusNotFound, err)
		return
	}
	utils.WriteJSON(w, http.StatusOK, user)
}

func (h *Handler) handleLogin (w http.ResponseWriter, r *http.Request) {
	var user types.LoginUserPayload

	if err := utils.ParseJSON(r, &user); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	if err := utils.Validate.Struct(user); err != nil {
		errors := err.(validator.ValidationErrors)
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid payload: %v", errors))
		return
	}

	u, err := h.store.GetUserByEmail(user.Email)

	if err != nil {
		utils.WriteError(w, http.StatusNotFound, fmt.Errorf("not found, invalid email or password"))
		return
	}

	if !auth.ComparePasswords(u.Password, user.Password) {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid email or password"))
		return
	}
	secret := []byte(config.Envs.JWTSecret)
	token, err := auth.CreateJWT(secret, u.ID)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJSON(w, http.StatusOK, map[string]string{"token": token})
	
	log.Println("Login handler")
}
func (h *Handler) handleRegister (w http.ResponseWriter, r *http.Request) {
	// Get json payload
	var user types.RegisterUserPayload
	

	if err := utils.ParseJSON(r, &user); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	if err := utils.Validate.Struct(user); err != nil {
		errors := err.(validator.ValidationErrors)
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid payload: %v", errors))
		return
	}
	//  check if the email is already registered
	_, err := h.store.GetUserByEmail(user.Email)
	
	if err == nil{
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("user with email %s already exists", user.Email) )
		return
	}

	log.Println("Register handler")
	// if not, create the user

	err = h.store.CreateUser(&types.User{
		Email: user.Email,
		Name: user.Name,
		Password: user.Password,
	})

	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	// return success
	utils.WriteJSON(w, http.StatusCreated, nil)

	log.Println("Register ")
}