/* This comonent is used to add new users to the current channel this is represented by currentChannel and comes from Home */
import {React, useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'

export default function UpdateChannel(currentChannel) {

    let {authToken, user, logout} = useContext(AuthContext)
    let [users, setUsers] = useState([])
    let [newUser, setNewUser] = useState([])
    let [channelUsers, setChannelUsers] = useState([])

    let updateChannel = async (e) => {
        e.preventDefault()

        /* If the channel has not been updated yet we push the new user in the currentChannel.users array and set channelUsers to this new value
        Otherwise we use channelUsers that include the previous updates and we push the new user*/
        let usersList = null
        channelUsers.length == 0 ? usersList = currentChannel.currentChannel.users.map(x => x.id) : usersList = channelUsers
        usersList.push(parseInt(newUser))

        setChannelUsers([... new Set(usersList)])

        const data = {
        /* We use usersList and not channelUsers at this point for the fetch request because setChannelUsers has not been processed yet*/
          "users" : [... new Set(usersList)],
        }
        const response = await fetch(`http://127.0.0.1:8000/chat/channel/${currentChannel.currentChannel.id}/`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authToken.access)
            },
            body: JSON.stringify(data)
        })
      }

    useEffect(
        ()=>{
            let getUsers = async () => {
                let response = await fetch(`http://127.0.0.1:8000/user/`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + String(authToken.access)
                    },
                })
                let data = await response.json()
                if(response.status === 200){
                    setUsers(data)
                }else{
                  logout()
                }
              }
              getUsers()

        }, []
    )

    return (

            <div className='channel-control-section'>
                <form onSubmit={e => updateChannel(e)}>
                    <select onChange={e => {setNewUser(e.target.value)}}>
                        <option selected="selected"> Select A User</option>
                        {
                            users.map((user,index) => (
                                <option key={index} value={user.id}>{user.username}</option>
                            ))
                        }
                    </select>
                    <input className="submit-button-channel" type="submit" value="Ajouter"/>
                </form>
            </div>

    )
}

