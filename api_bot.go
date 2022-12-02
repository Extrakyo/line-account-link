package main

import (
	"log"
	"net/http"
	"strings"
	"database/sql"
	"github.com/line/line-bot-sdk-go/linebot"
	_ "github.com/go-sql-driver/mysql"
)

//LinkCustomer : A chatbot DB to store account link information.
type LinkCustomer struct {
	//Data from CustData from provider.
	Name   string
	Nounce string
	//For chatbot linked data.
	LinkUserID string
}

var linkedCustomers []LinkCustomer

func callbackHandler(w http.ResponseWriter, r *http.Request) {
	events, err := bot.ParseRequest(r)

	if err != nil {
		if err == linebot.ErrInvalidSignature {
			w.WriteHeader(400)
		} else {
			w.WriteHeader(500)
		}
		return
	}

	for _, event := range events {
		if event.Type == linebot.EventTypeMessage {
			switch message := event.Message.(type) {
			case *linebot.TextMessage:
				var userID string
				if event.Source != nil {
					userID = event.Source.UserID
				}

				switch {
				case strings.EqualFold(message.Text, "link"):
					//token link
					//1. The bot server calls the API that issues a link token from the LINE user ID.
					//2. The LINE Platform returns the link token to the bot server.
					res, err := bot.IssueLinkToken(userID).Do()
					if err != nil {
						log.Println("Issue link token error, err=", err)
					}

					log.Println("Get user token:", res.LinkToken)

					//3. The bot server calls the Messaging API to send a linking URL to the user.
					//4. The LINE Platform sends a linking URL to the user.
					if _, err = bot.ReplyMessage(
						event.ReplyToken,
						linebot.NewTextMessage("Account Link: link= "+serverURL+"link?linkToken="+res.LinkToken)).Do(); err != nil {
						log.Println("err:", err)
						return
					}

					return
				case strings.EqualFold(message.Text, "2"):
					db, err := sql.Open("mysql", "canis:vz3s10cdDtkU1BRv@tcp(103.200.113.92)/foodler")
					if err != nil {
						panic(err.Error())
					}
					defer db.Close()
					var user CustData
					results, err := db.Query("SELECT `sumPrice` FROM `orderList` WHERE `username` = ?", user.Name)

					for results.Next() {
						err = results.Scan(&user.sumPrice)
						if err != nil {
							panic(err.Error())
						}
						if _, err = bot.ReplyMessage(
							event.ReplyToken,
							linebot.NewTextMessage("金額："+user.sumPrice)).Do(); err != nil {
							log.Println("err:", err)
							return
						}
						return
					}

				}

				//Check user if it is linked.
				for _, usr := range linkedCustomers {
					if usr.LinkUserID == event.Source.UserID {
						if _, err = bot.ReplyMessage(
							event.ReplyToken,
							linebot.NewTextMessage("Hi "+usr.Name+"!, Nice to see you. \nWe know you: "+usr.Desc+" \nHere is all features ...")).Do(); err != nil {
							log.Println("err:", err)
							return
						}
						return
					}
				}

				log.Println("source:>>>", event.Source, " group:>>", event.Source.GroupID, " room:>>", event.Source.RoomID)

				if _, err = bot.ReplyMessage(
					event.ReplyToken,
					linebot.NewTextMessage("Welcome to booksstore, currently your account is not linked to provider. \nThis is a starter for account link, check following actions.").
						WithQuickReplies(linebot.NewQuickReplyItems(
							linebot.NewQuickReplyButton(
								"",
								linebot.NewMessageAction("account link", "link")),
							linebot.NewQuickReplyButton(
								"",
								linebot.NewMessageAction("list user", "list")),
						)),
				).Do(); err != nil {
					log.Println("err:", err)
					return
				}
			}
		} else if event.Type == linebot.EventTypeAccountLink {
			//11. The LINE Platform sends an event (which includes the LINE user ID and nonce) via webhook to the bot server.
			// account link success
			log.Println("EventTypeAccountLink: source=", event.Source, " result=", event.AccountLink.Result)
			for _, user := range linkedCustomers {
				if event.Source.UserID == user.LinkUserID {
					log.Println("User:", user, " already linked account.")
					return
				}
			}

			//search from all user using nounce.
			for _, usr := range customers {
				//12. The bot server uses the nonce to acquire the user ID of the provider's service.
				if usr.Nounce == event.AccountLink.Nonce {
					//Append to linked DB.

					linkedUser := LinkCustomer{
						Name:       usr.Name,
						LinkUserID: event.Source.UserID,
					}

					linkedCustomers = append(linkedCustomers, linkedUser)

					//Send message back to user
					if _, err = bot.ReplyMessage(
						event.ReplyToken,
						linebot.NewTextMessage("Hi "+usr.Name+" your account already linked to this chatbot.")).Do(); err != nil {
						log.Println("err:", err)
						return
					}
					return
				}
			}
			log.Println("Error: no such user:", event.Source.UserID, " nounce=", event.AccountLink.Nonce, " for account link.")
		}
	}
}