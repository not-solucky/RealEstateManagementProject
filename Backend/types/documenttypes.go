package types

import (
	"time"
)

type PropertyDocument struct {
	DocumentID int       `json:"document_id"`
	PropertyID int       `json:"property_id"`
	Document   string    `json:"image"`
	Verified   bool      `json:"verified"`
	Status     string    `json:"status"`
	Message    *string    `json:"message"`
	Submitted  time.Time `json:"submitted"`
}

type PropertyDocumentPayload struct {
	PropertyID int    `json:"property_id"`
	Document   string `json:"image"`
}