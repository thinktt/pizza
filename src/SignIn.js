import { useState } from 'react'
import api from './api.js'

export default function SignIn() {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()
  
  const sendAuth = async (username, password) => {
    let err
    await api.doAuth({ username, password }).catch((e) => err = e)
    if (err) {
      setError(err)
    }
  }

  return (
    <main className="main">
      <h1 className="title">
          Turtle Pizza
      </h1>
      <h4>appears at your table with ninja stealth</h4>
      <img 
        className="turtles" 
        src="/tmnt.png" alt="A group of teenage turtles approving of pizza" 
      />
      <h1>{error}</h1>
      { 
        !error && 
        <SignInForm 
          username={username} 
          password={password} 
          sendAuth={sendAuth}
        >
        </SignInForm> 
      }      


    </main>
  )
}


function SignInForm({ username, password, sendAuth}) {
  return (
    <form>
      <input type="text" placeholder="Username" value={username}></input>
      <input type="password" placeholder="Password" value={password}></input>
      <button onClick={() => sendAuth(username, password)}>Sign In</button>
    </form>
  )
}




