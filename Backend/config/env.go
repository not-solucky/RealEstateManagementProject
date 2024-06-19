package config

import (
	"fmt"
	"os"
	"github.com/joho/godotenv"
	"strconv"
)

type Config struct {
	PublicHost             string
	Port	               string
	DBUser 	               string
	DBPassword             string
	DBAddress              string
	DBName	   			   string
	JWTSecret              string
	JWTExpirationInSeconds int64
}

var Envs = initConfig()

func initConfig () Config{

	godotenv.Load()

	return Config{
		PublicHost: getEnv("PUBLIC_HOST", "localhost"),
		Port: getEnv("PORT", "8080"),
		DBUser: getEnv("DB_USER", "root"),
		DBPassword: getEnv("DB_PASSWORD", ""),
		DBAddress: fmt.Sprintf("%s:%s", getEnv("DB_HOST", "127.0.0.1"), getEnv("DB_PORT", "3306")),
		DBName: getEnv("DB_NAME", "learninggo"),
		JWTExpirationInSeconds: getEnvInt64("JWT_EXP", 3600),
		JWTSecret: getEnv("JWT_SECRET", "secret"),

	}
}

func getEnv(key, fallback string)  string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

func getEnvInt64(key string, fallback int64) int64 {
	if value, ok := os.LookupEnv(key); ok {
		i, err := strconv.ParseInt(value, 10, 64)
		if err != nil {
			return fallback
		}
		return i
	}
	return fallback
}