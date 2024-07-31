package utils

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"github.com/go-playground/validator/v10"

	"github.com/google/uuid"
)

var Validate = validator.New()

func WriteJSON(w http.ResponseWriter, status int, v any) error {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(status)
	return json.NewEncoder(w).Encode(v)
}

func WriteError(w http.ResponseWriter, status int, err error) {
	WriteJSON(w, status, map[string]string{"error": err.Error()})
}
func DeleteImage(imagePath string, dir string) error {
	filepath := filepath.Join(dir, imagePath)
	err := os.Remove(filepath)
	if err != nil {
		return fmt.Errorf("error deleting image: %v", err)
	}

	return nil
}

func SaveImage(image string, uploadDir string) (string, error) {
	imageBytes, err := base64.StdEncoding.DecodeString(image)

	if err != nil {
		return "", fmt.Errorf("error decoding image: %v", err)
	}
	err = os.MkdirAll(uploadDir, os.ModePerm)
	if err != nil {
		return "", fmt.Errorf("error creating upload directory: %v", err)
	}

	fileName := fmt.Sprintf("%s.png", uuid.New().String())
	filePath := filepath.Join(uploadDir, fileName)

	err = os.WriteFile(filePath, imageBytes, 0644)
	if err != nil {
		return "", fmt.Errorf("error saving image: %v", err)
	}

	return fileName, nil
}
func ParseJSON(r *http.Request, v any) error {
	if r.Body == nil {
		return fmt.Errorf("missing request body")
	}

	return json.NewDecoder(r.Body).Decode(v)
}

func GetTokenFromRequest(r *http.Request) string {
	tokenAuth := r.Header.Get("Authorization")
	tokenQuery := r.URL.Query().Get("token")

	if tokenAuth != "" {
		return tokenAuth
	}

	if tokenQuery != "" {
		return tokenQuery
	}

	return ""
}
