/* The Home Page is used to get the channels related to the connected user, to create new channels
and to pass the currentChannel object to the others component ChatBox and UpdateChannel (that is used to add new users in a channel) */
import {React, useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import ChatBox from '../components/ChatBox'
import UpdateChannel from '../components/UpdateChannel'

const Home = () => {

  let {authToken, logout, user} = useContext(AuthContext)
  let [currentChannel, setCurrentChannel] = useState({})
  let [channelName, setChannelName] = useState([])
  let [channels, setChannels] = useState([])

  let getChannels = async () => {
    let response = await fetch(`http://127.0.0.1:8000/chat/channel/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authToken.access)
        },
    })
    let data = await response.json()
    if(response.status === 200){
      setChannels(data)
    }else{
      logout()
    }
  }

  let createChannel = async (e) => {
    e.preventDefault()
    const data = {
        "name" : channelName,
        "users" : [user.user_id]
    }
    const response = await fetch(`http://127.0.0.1:8000/chat/channel/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authToken.access)
        },
        body: JSON.stringify(data)
    })
    let fetchedData = await response.json()
    /* As serializer for non-get request is different and return only user'id instead of an object we replace fetchedData['users'] from an array of ID to and array of { "id" : ID } */
    let users = fetchedData.users.map(x => ({'id' : x}))
    fetchedData['users'] = users

    setCurrentChannel(fetchedData)
    getChannels()
  }

  useEffect(
    ()=>{getChannels()},[]
  )

  return (
  <div className="chat-page-container">
    <div className="channels-container">

      <div className="channelslist-container">
          {channels.map((channel,index)=>(
              <div className="channel" key={index} onClick={e => {setCurrentChannel(channel)
              console.log('channel', channel)}}>
                <p>{channel.name}</p>
              </div>
          ))}
      </div>


      <div className='channel-control'>
          <div className='channel-control-section'>
              <form onSubmit={e => {createChannel(e)}}>
                  <input
                  name='newchannel'
                  placeholder='Channel Name'
                  type="text"
                  onChange={e=>setChannelName(e.target.value)}></input>
                  <input className="submit-button-channel" type="submit"/>
              </form>
          </div>
          <UpdateChannel currentChannel={currentChannel}/>
        </div>

    </div>
      <ChatBox currentChannel={currentChannel}/>
  </div>
  )
}

export default Home
