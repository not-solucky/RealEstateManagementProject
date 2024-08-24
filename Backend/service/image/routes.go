package image

import (
	"fmt"
	"learninggo/utils"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gorilla/mux"
)

type Handler struct{}

func NewHandler() *Handler {
	return &Handler{}
}

func (h *Handler) RegisterRoutes(router *mux.Router) {
	router.HandleFunc("/image/{category}/{imagename}", h.handleGetImage).Methods("GET")
}

func (h *Handler) handleGetImage(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	category := vars["category"]
	imageName := vars["imagename"]

	// Construct the file path
	imagePath := filepath.Join("uploads", category, imageName)

	if category == "" || imageName == "" {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid image path"))
		return
	}

	if category == "property" {
		imagePath = filepath.Join("uploads", "property", imageName)
	}

	if category == "profile" {
		imagePath = filepath.Join("uploads", "profile", imageName)
	}

	if category == "udoc" {
		imagePath = filepath.Join("uploads", "documents/user", imageName)
	}

	if category == "pdoc" {
		imagePath = filepath.Join("uploads", "documents/property", imageName)
	}

	log.Println("Image path", imagePath)

	// Check if file exists
	if _, err := os.Stat(imagePath); os.IsNotExist(err) {
		utils.WriteError(w, http.StatusNotFound, fmt.Errorf("file not found"))
		return
	}

	// Open the file
	file, err := os.Open(imagePath)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}
	defer file.Close()

	// Get the file's content type
	fileStat, err := file.Stat()
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}
	// Serve the file
	http.ServeContent(w, r, fileStat.Name(), fileStat.ModTime(), file)
}

