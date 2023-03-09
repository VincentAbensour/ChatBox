import { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {

    let [authToken, setAuthToken] = useState(localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(authToken ? jwt_decode(authToken.access) : null)
    let [loading, setLoading] = useState(false)


    let navigate = useNavigate()

    let loginUser = async (event) => {
        event.preventDefault()
        let response =  await fetch(`http://127.0.0.1:8000/api/token/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": event.target.email.value,
                "password": event.target.password.value,
            })
        })
        let data = await response.json()
        if(response.status === 200){
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens' , JSON.stringify(data))
            navigate('/')
        }else{
            alert('Bad Credentials')
        }
    }

    let logout = ()=>{
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    let updateToken = async () =>{
        let response =  await fetch(`http://127.0.0.1:8000/api/token/refresh/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "refresh": authToken?.refresh
            })
        })

        let data = await response.json()

        if(response.status === 200){
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens' , JSON.stringify(data))
        }else{
            alert('Bad Token')
            logout()
        }

        if(loading){
            setLoading(false)
        }
    }

    let contextData = {
        loginUser:loginUser,
        logout : logout,
        user:user,
        authToken:authToken,
    }

    useEffect(()=>{

        if(loading){
            updateToken()
        }
        let intervalDuration = 1000*60*4
        let interval = setInterval(()=>{
            if(authToken){
                updateToken()
            }
        }, intervalDuration)

        return ()=>clearInterval(interval)

    }, [loading, updateToken])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}