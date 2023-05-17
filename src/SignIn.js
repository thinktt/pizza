import { useState } from 'react'
import api from './api.js'

export default function SignIn() {
  const [error, setError] = useState()
  const [isSending, setIsSending] = useState(false)
  
  const sendAuth = async (username, password) => {
    setError(null)
    setIsSending(true)
    // await new Promise(r => setTimeout(r, 2000))
    
    let err
    await api.doAuth({ username, password }).catch((e) => err = e)
    if (err) {
      setError(err)
      setIsSending(false)
      return 
    }
    
    setIsSending(false)
    setError({message: 'good job'})
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
      { isSending ? <h1>spinner...</h1> : 
        <SignInForm sendAuth={sendAuth}></SignInForm> 
      } 
      { error && <h1>{error.message}</h1> }     
    </main>
  )
}


function SignInForm({ sendAuth}) {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  return (
    <div>
      <input 
        type="text" 
        placeholder="Username" 
        onChange={e => setUsername(e.target.value)}
      ></input>
      <input 
        type="password" 
        placeholder="Password" 
        onChange={e => setPassword(e.target.value)}
      ></input>
      <button onClick={() => sendAuth(username, password)}>Sign In</button>
    </div>
  )
}




