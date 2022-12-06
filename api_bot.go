package main

import (
	"database/sql"
	"log"
	"net/http"
	"strings"

	_ "github.com/go-sql-driver/mysql"
	"github.com/line/line-bot-sdk-go/linebot"
)

// LinkCustomer : A chatbot DB to store account link information.
type LinkCustomer struct {
	//Data from CustData from provider.
	ID         string
	Name       string
	Nounce     string
	LinkUserID string
	userID     string
}

var linkedCustomers []LinkCustomer

func callbackHandler(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("mysql", "canis:vz3s10cdDtkU1BRv@tcp(103.200.113.92)/foodler")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()
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
				case strings.EqualFold(message.Text, "#1"):
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
						linebot.NewTextMessage("點擊連結以綁定帳號： "+serverURL+"link?linkToken="+res.LinkToken)).Do(); err != nil {
						log.Println("err:", err)
					}

				case strings.EqualFold(message.Text, "#2"):
					for _, usr := range linkedCustomers {
						rs, err := db.Query("SELECT `userId` FROM linebot WHERE `username` = ?", usr.ID)
						if err != nil {
							panic(err.Error())
						}
						// log.Println("USERID:" + usr.userID)

						var ur LinkCustomer
						for rs.Next() {
							rs.Scan(&ur.userID)
						}
						log.Println("USERID:" + ur.userID)
						if ur.userID == event.Source.UserID {
							if _, err = bot.ReplyMessage(
								event.ReplyToken,
								linebot.NewTextMessage("您已成功取消綁定帳號！")).Do(); err != nil {
								log.Println("err:", err)

							}

						}
					}
					for _, usr := range linkedCustomers {
						if usr.LinkUserID == event.Source.UserID {

							log.Println("before_USERID:" + usr.LinkUserID)
							_, err := db.Exec("DELETE FROM `linebot` WHERE `userId` = ?", usr.LinkUserID)
							if err != nil {
								log.Println("exec failed:", err)
								return
							}

							usr.LinkUserID = ""
							usr.Nounce = ""
							usr.Name = ""
							return
						}
					}
					return
				}

				//Check user if it is linked.
				for _, usr := range linkedCustomers {

					rs, err := db.Query("SELECT `userId`, `name` FROM linebot WHERE `username` = ?", usr.ID)
					if err != nil {
						panic(err.Error())
					}
					// log.Println("USERID:" + usr.userID)

					var ur LinkCustomer
					for rs.Next() {
						rs.Scan(&ur.userID, &ur.Name)
					}
					log.Println("USERID:" + ur.userID)

					if ur.userID == event.Source.UserID {
						if _, err = bot.ReplyMessage(
							event.ReplyToken,
							linebot.NewTextMessage("你好 "+ur.Name+"，您已成功綁定帳號！")).Do(); err != nil {
							log.Println("err:", err)
							return
						}
						return
					}

				}
				log.Println("source:>>>", event.Source, " group:>>", event.Source.GroupID, " room:>>", event.Source.RoomID)

				if _, err = bot.ReplyMessage(
					event.ReplyToken,
					linebot.NewTextMessage("歡迎使用Foodler BOT，請先綁定帳號，以使用完整功能！").
						WithQuickReplies(linebot.NewQuickReplyItems(
							linebot.NewQuickReplyButton(
								"",
								linebot.NewMessageAction("綁定帳號", "#1")),
							// linebot.NewQuickReplyButton(
							// 	"",
							// 	linebot.NewMessageAction("list user", "Un")),
						)),
				).Do(); err != nil {
					log.Println("err:", err)
					return
				}
			}
		} else if event.Type == linebot.EventTypeAccountLink {
			log.Println("EventTypeAccountLink: source=", event.Source, " result=", event.AccountLink.Result)
			for _, user := range linkedCustomers {

				rs, err := db.Query("SELECT `userId`, `name` FROM linebot WHERE `username` = ?", user.ID)
				if err != nil {
					panic(err.Error())
				}
				// log.Println("USERID:" + usr.)

				var urd LinkCustomer
				for rs.Next() {
					rs.Scan(&urd.userID, &urd.Name)
				}

				if urd.userID == event.Source.UserID {
					log.Println("使用者： ", urd.Name, " 的帳號已被綁定！")
					return
				}
			}

			//search from all user using nounce.
			for _, usr := range customers {
				//12. The bot server uses the nonce to acquire the user ID of the provider's service.
				if usr.Nounce == event.AccountLink.Nonce {
					//Append to linked DB.
					USERID := event.Source.UserID
					_, err := db.Exec("UPDATE `linebot` SET `userId`= ? WHERE `nounce` = ?", USERID, usr.Nounce)
					if err != nil {
						log.Println("exec failed:", err)
						return
					}
					log.Println("userID:" + USERID)

					results, err := db.Query("SELECT `userId`, `nounce`, `name` , `username` FROM linebot WHERE `nounce` = ?", usr.Nounce)
					if err != nil {
						panic(err.Error())
					}
					log.Println(usr.Nounce)

					var linkedUser LinkCustomer
					for results.Next() {
						results.Scan(&linkedUser.LinkUserID, &linkedUser.Nounce, &linkedUser.Name, &linkedUser.ID)
						linkedCustomers = append(linkedCustomers, linkedUser)
					}
					log.Println("UserId:" + linkedUser.LinkUserID + "\nNounce:" + linkedUser.Nounce + "\nName:" + linkedUser.Name)

					if _, err = bot.ReplyMessage(
						event.ReplyToken,
						linebot.NewTextMessage("你好，"+usr.Name+"，您的帳號已成功綁定！")).Do(); err != nil {
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
