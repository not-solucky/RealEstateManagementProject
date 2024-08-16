package auth

import (
	"context"
	"fmt"
	"learninggo/config"
	"learninggo/types"
	"learninggo/utils"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type contextKey string

const UserKey contextKey = "userID"

func WithJWTAuth(handlerFunc http.HandlerFunc, store types.UserStore) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		tokenString := utils.GetTokenFromRequest(r)
		if tokenString == "" {
			log.Println("No token found")
			permissionDenied(w)
			return
		}

		var test = strings.Split(tokenString, " ")

		if len(test) < 2 {
			log.Println("No token found")
			permissionDenied(w)
			return
		}

		log.Println("Token", test[1])
		token, err := validateJWT(test[1])

		if err != nil {

			log.Printf("failed to validate token: %v", err)
			permissionDenied(w)
			return
		}

		if !token.Valid {
			log.Println("invalid token")
			permissionDenied(w)
			return
		}

		claims := token.Claims.(jwt.MapClaims)
		str := claims["userID"].(string)

		userID, err := strconv.Atoi(str)
		if err != nil {
			log.Printf("failed to convert userID to int: %v", err)
			permissionDenied(w)
			return
		}

		u, err := store.GetUserByID(userID)
		if err != nil {
			log.Printf("failed to get user by id: %v", err)
			permissionDenied(w)
			return
		}

		userContext := types.UserContext{
			ID:       u.ID,
			Role:     u.Role,
			Verified: u.Verified,
		}

		// Add the user to the context
		log.Println(UserKey)
		ctx := r.Context()
		ctx = context.WithValue(ctx, UserKey, userContext)
		r = r.WithContext(ctx)

		// Call the function if the token is valid

		handlerFunc(w, r)
	}
}

func validateJWT(tokenString string) (*jwt.Token, error) {
	return jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(config.Envs.JWTSecret), nil
	})
}

func permissionDenied(w http.ResponseWriter) {
	utils.WriteError(w, http.StatusForbidden, fmt.Errorf("permission denied"))
}

func CreateJWT(secret []byte, user *types.User) (string, error) {

	expiration := time.Second * time.Duration(config.Envs.JWTExpirationInSeconds)

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userID":    strconv.Itoa(user.ID),
		"expiredAt": time.Now().Add(expiration).Unix(),
		"username":  user.Name,
		"userImage": user.ImagePath,
	})

	tokenString, err := token.SignedString(secret)

	if err != nil {
		return "", err
	}

	return tokenString, nil
}
