import { useState } from 'react'
import api from './api.js'

export default function SignIn() {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
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
    setError({message: 'bad username or password'})
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
        <SignInForm 
          username={username} 
          password={password} 
          sendAuth={sendAuth}
        >
        </SignInForm> 
      } 
      { error && <h1>{error.message}</h1> }     
    </main>
  )
}


function SignInForm({ username, password, sendAuth}) {
  return (
    <div>
      <input type="text" placeholder="Username" value={username}></input>
      <input type="password" placeholder="Password" value={password}></input>
      <button onClick={() => sendAuth(username, password)}>Sign In</button>
    </div>
  )
}




