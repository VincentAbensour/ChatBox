/* This component is used to add new users to the current channel that is represented by currentChannel */
import {React, useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'

function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

export default function UpdateChannel({currentChannel}) {

    let {authToken, user, logout} = useContext(AuthContext)
    let [users, setUsers] = useState([])
    let [newUser, setNewUser] = useState([])


    let updateChannel = async (e) => {
        e.preventDefault()

        let usersList = currentChannel.users.map(x => x.id)
        usersList.push(parseInt(newUser.id))
        currentChannel['users'].push(newUser)

        const data = {
          "users" : [... new Set(usersList)],
        }
        const response = await fetch(`http://127.0.0.1:8000/chat/channel/${currentChannel.id}/`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authToken.access)
            },
            body: JSON.stringify(data)
        })
        if(response.status==200){
            alert('New user added!')
        }
      }

    let handleChange = (e) => {
        setNewUser(JSON.parse(e))
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
        <form className='add-user' onSubmit={e => updateChannel(e)}>
            <select onChange={e => {handleChange(e.target.value)}}>
                <option selected="selected"> Add a New User</option>
                {
                    users.map((user,index) => (
                        <option key={index} value={JSON.stringify(user)}>{user.username}</option>
                    ))
                }
            </select>
            <input className="submit-button-channel" type="submit" value="  Submit  "/>
        </form>
    )
}