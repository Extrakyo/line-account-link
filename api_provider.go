package main

import (
	"database/sql"
	b64 "encoding/base64"
	"crypto/md5"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"time"

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

	// customers = append(customers, []CustData{
	// 	CustData{ID: "11", PW: "pw11", Name: "Tom", Age: 43, Desc: "He is from A corp. likes to read comic books."},
	// 	CustData{ID: "22", PW: "pw22", Name: "John", Age: 25, Desc: "He is from B corp. likes to read news paper"},
	// 	CustData{ID: "33", PW: "pw33", Name: "Mary", Age: 13, Desc: "She is a student, like to read science books"},
	// }...,
	// )
}
func verifyBefore(ID string, PW string) {
	db, err := sql.Open("mysql", "canis:vz3s10cdDtkU1BRv@103.200.113.92/foodler")
	checkErr(err)
	data := md5.Sum([]byte(PW))
	rows, err := db.Query("SELECT * FROM users WHERE username = ? AND password = ? AND identity	= 'customer'", ID, PW)
	var exists bool
	if err := rows.Scan(&exists); err != nil {
		return err
	} else if !exists {
		if err := db.Exec("") {
			
		}
	}

	//切記用完都要做 Close
	defer rows.Close()


	db.SetConnMaxLifetime(time.Minute * 3)
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)

}
func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}

// WEB: List all user in memory
func listCust(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Bookstore customer list as follow:\n")
	for i, usr := range customers {
		fmt.Fprintf(w, "%d \tID: %s \tPW: %s \n", i, usr.ID, usr.PW)
	}
}

// WEB: For login (just for demo)
func login(w http.ResponseWriter, r *http.Request) {
	//7. The user enters his/her credentials.
	FormUser := r.FormValue("username") 	
	FormPassword := w.FormValue("password")


	if err := r.ParseForm(); err != nil {
		log.Printf("ParseForm() err: %v\n", err)
		return
	}
	name := r.FormValue("user")
	pw := r.FormValue("pass")
	token := r.FormValue("token")

	verifyBefore(name, pw)


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
	return b64.StdEncoding.EncodeToString([]byte(token + name + pw))
}
