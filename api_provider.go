package main

import (
	"database/sql"
	"encoding/base64"

	"fmt"
	"html/template"
	"log"
	"net/http"

	// "time"
	_ "github.com/go-sql-driver/mysql"
)

// CustData : Customers data for provider website.
type CustData struct {
	ID string
	PW string
	// Name   string
	// Age    int
	// Desc   string
	Nounce string
}

var customers []CustData

func init() {

}

type Tag struct {
	Username string
	Password string
	Nounce   string
}

var tags []Tag

// WEB: List all user in memory
func listCust(w http.ResponseWriter, r *http.Request) {

	db, err := sql.Open("mysql", "canis:vz3s10cdDtkU1BRv@tcp(103.200.113.92)/foodler")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	results, err := db.Query("SELECT username, password FROM users")
	if err != nil {
		panic(err.Error())
	}

	for results.Next() {
		var user Tag
		err = results.Scan(&user.Username, &user.Password)
		if err != nil {
			panic(err.Error())
		}
		log.Printf(user.Username)
		fmt.Fprintf(w, "%s", user.Username)
	}
}

// WEB: For login (just for demo)
var db *sql.DB

func login(w http.ResponseWriter, r *http.Request) {

	db, err := sql.Open("mysql", "canis:vz3s10cdDtkU1BRv@tcp(103.200.113.92)/foodler")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	results, err := db.Query("SELECT username, password FROM users")
	if err != nil {
		panic(err.Error())
	}
	name := r.FormValue("username")
	pw := r.FormValue("password")
	token := r.FormValue("token")
	for results.Next() {
		var user Tag
		err = results.Scan(&user.Username, &user.Password)
		if err != nil {
			panic(err.Error())
		}
		log.Printf(user.Username)
		if user.Username == name {
			//8. The web server acquires the user ID from the provider's service and uses that to generate a nonce.
			sNonce := generateNounce(token, name, pw)

			//update nounce to provider DB to store it.

			//9. The web server redirects the user to the account-linking endpoint.
			//10. The user accesses the account-linking endpoint.
			//Print link to user to click it.
			targetURL := fmt.Sprintf("https://access.line.me/dialog/bot/accountLink?linkToken=%s&nonce=%s", token, sNonce)
			log.Println("generate nonce, targetURL=", targetURL)
			tmpl := template.Must(template.ParseFiles("link.tmpl"))
			if err := tmpl.Execute(w, targetURL); err != nil {
				log.Println("Template err:", err)
			}
			return
		}
	}

	// for i, usr := range customers {
	// 	if usr.ID == name {
	// 		if pw == usr.PW {
	// 			//8. The web server acquires the user ID from the provider's service and uses that to generate a nonce.
	// 			sNonce := generateNounce(token, name, pw)

	// 			//update nounce to provider DB to store it.
	// 			customers[i].Nounce = sNonce

	// 			//9. The web server redirects the user to the account-linking endpoint.
	// 			//10. The user accesses the account-linking endpoint.
	// 			//Print link to user to click it.
	// 			targetURL := fmt.Sprintf("https://access.line.me/dialog/bot/accountLink?linkToken=%s&nonce=%s", token, sNonce)
	// 			log.Println("generate nonce, targetURL=", targetURL)
	// 			tmpl := template.Must(template.ParseFiles("link.tmpl"))
	// 			if err := tmpl.Execute(w, targetURL); err != nil {
	// 				log.Println("Template err:", err)
	// 			}
	// 			return
	// 		}
	// 	}
	// }
	fmt.Fprintf(w, "Your input name or password error.")
}

// WEB: For account link
func link(w http.ResponseWriter, r *http.Request) {
	//5. The user accesses the linking URL.
	TOKEN := r.FormValue("linkToken")
	if TOKEN == "" {
		log.Println("No token.")
		return
	}

	log.Println("token = ", TOKEN)
	tmpl := template.Must(template.ParseFiles("login.tmpl"))
	//6. The web server displays the login screen.
	if err := tmpl.Execute(w, TOKEN); err != nil {
		log.Println("Template err:", err)
	}
}

// generate nonce (currently nounce combine by token + name + pw)
func generateNounce(token, name, pw string) string {
	return base64.StdEncoding.EncodeToString([]byte(token + name + pw))
}

func base64Encode(src []byte) []byte {
	return []byte(base64.StdEncoding.EncodeToString(src))
}

func base64Decode(src []byte) ([]byte, error) {
	return base64.StdEncoding.DecodeString(string(src))
}
