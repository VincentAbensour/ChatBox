/* This component retrieve all the messages linked to the current channel and allorws to create new messages.
The getMessages function is updated every second to render new messages*/
import React, {useState, useContext, useEffect, useRef} from 'react'
import AuthContext from '../context/AuthContext'

const ChatBox = (currentChannel) => {

    let {authToken, user} = useContext(AuthContext)
    let [messages, setMessages] = useState([])
    let [channel, setChannel] = useState(currentChannel.currentChannel)
    let [messageContent, setmessageContent] = useState('')

    let getMessages = async () => {
        let response = await fetch(`http://127.0.0.1:8000/chat/message/`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authToken.access),
            },
        })
        let data = await response.json()
        let filter = await data.filter(message => message.channel.id === currentChannel.currentChannel.id);
        setMessages(filter)
    }

    let createMessage = async (e) => {
        e.preventDefault()
        const data = {
            "channel" : currentChannel.currentChannel.id,
            "content" : messageContent,
        }
        const response = await fetch(`http://127.0.0.1:8000/chat/message/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authToken.access)
            },
            body: JSON.stringify(data)
        })
        getMessages()
      }


    useEffect(()=>{
            setChannel(currentChannel.currentChannel)
            getMessages()

            let interval = setInterval(()=>{
                if(authToken){
                    getMessages()
                }
            },1000)
            return ()=>clearInterval(interval)
        },[currentChannel]
      )

    return (
        <div className="chat-box">
            <div className="message_history">
                <div>
                    {messages.map((message,index)=>
                        message.user.id===user.user_id ?
                            <div className="sent_message" key={index}>
                                <div className="message_user_name">You</div>
                                <p className="sent_message_content message_content">{message.content}</p>
                                <span className="time_date">{message.created_date.slice(-27, -17)} | {message.created_date.slice(-16, -8)}</span>
                            </div>
                        :
                            <div className="incoming_message">
                                <div className="message_user_name">{message.user.username} </div>
                                <div className="incoming_message_content message_content">{message.content}</div>
                                <span className="time_date">{message.created_date.slice(-27, -17)} | {message.created_date.slice(-16, -8)}</span>
                            </div>
                    )}
                </div>
                <div id="scroll-to"></div>
            </div>
            <div className='send-messages-box'>
                <form onSubmit={createMessage}>
                    <textarea className="message-textarea" onChange={(event) => {setmessageContent(event.target.value)}}> </textarea>
                    <input className="message-button" type="submit"/>
                </form>
            </div>
        </div>
    )
}

export default ChatBox
