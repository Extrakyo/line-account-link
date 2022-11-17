package main

import (
	"crypto/md5"
	"database/sql"
	"encoding/base64"
	"encoding/hex"
	"fmt"
	"html/template"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

// CustData : Customers data for provider website.

type Tag struct {
	Username string
	Password string
	Nounce   string
	USERID   string
}

var tags []Tag

func init() {
}

func listCust(w http.ResponseWriter, r *http.Request) {

}

// WEB: For login (just for demo)
var db *sql.DB

func login(w http.ResponseWriter, r *http.Request) {

	db, err := sql.Open("mysql", "canis:vz3s10cdDtkU1BRv@tcp(103.200.113.92)/foodler")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	results, err := db.Query("SELECT username, password FROM users WHERE identity = 'customer'")
	if err != nil {
		panic(err.Error())
	}

	for results.Next() {
		// var user Tag
		name := r.FormValue("user")
		pw := r.FormValue("pass")
		token := r.FormValue("token")

		var user Tag
		err = results.Scan(&user.Username, &user.Password)
		if err != nil {
			panic(err.Error())
		}
		PW := MD5(pw)
		log.Printf(PW)

		if user.Username == name && user.Password == PW {
			//8. The web server acquires the user ID from the provider's service and uses that to generate a nonce.
			// log.Printf("successful")
			sNonce := generateNounce(token, name)
			//update nounce to provider DB to store it.
			// tags[i].Nounce = sNonce
			user.Nounce = sNonce
			rs, err := db.Exec("UPDATE `linebot` SET `nounce`= ? WHERE `username` = ?", user.Nounce, user.Username)
			if err != nil {
				log.Println("exec failed:", err)
				return
			}

			idAff, err := rs.RowsAffected()
			if err != nil {
				log.Println("RowsAffected failed:", err)
				return
			}
			log.Println("id:", idAff)
			if idAff == 0 {
				_, err := db.Exec("INSERT INTO `linebot`(`nounce`) VALUES (?)", user.Nounce)
				if err != nil {
					log.Println("exec failed:", err)
				}
			}
			log.Println("success")

			targetURL := fmt.Sprintf("https://access.line.me/dialog/bot/accountLink?linkToken=%s&nonce=%s", token, sNonce)
			log.Println("generate nonce, targetURL=", targetURL)
			tmpl := template.Must(template.ParseFiles("link.tmpl"))

			if err := tmpl.Execute(w, targetURL); err != nil {
				log.Println("Template err:", err)
			}
			return
		}
	}
	fmt.Fprintf(w, "請輸入密碼或帳號")
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
func generateNounce(token, name string) string {
	return base64.StdEncoding.EncodeToString([]byte(token + name))
}

func MD5(pw string) string {
	algorithm := md5.New()
	algorithm.Write([]byte(pw))
	return hex.EncodeToString(algorithm.Sum(nil))
}
