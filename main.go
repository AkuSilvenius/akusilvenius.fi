package main

import (
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()

	r.PathPrefix("/res/").Handler(http.StripPrefix("/res/", http.FileServer(http.Dir("./res"))))
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./client/build")))

	srv := &http.Server{
		Handler: r,
		Addr:    "127.0.0.1:5000",
		// Good practice: enforce timeouts for servers you create!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}
