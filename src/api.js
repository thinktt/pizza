export default { 
  doAuth,
  setToken,
  isAuthed,
}


let token = null
const url = 'https://pizza-api-app.herokuapp.com/api'


function isAuthed() {
  return token !== null
}

function setToken(tokenToSet) {
  token = tokenToSet
}

async function doAuth({ username, password }) {

  const res = await fetch(`${url}/auth`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
  
  const json = await res.json()
  
  if (!res.ok) {
    throw new Error(`${res.status}: ${json.msg}`)
  }

  setToken(json.access_token)
} 


// async function addGame(game) {
//   if (yowApiIsDown) {
//     return apiIsDownRes
//   }
//   const res = await fetch(`${yowApiUrl}/games/`, {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json, text/plain, */*',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(game)
//   }).catch((err) =>  {
//     yowApiIsDown = true
//     return {ok: false, status: 502, message: 'connection refused' }
//   })

//   return res
// } 


// async function getGame(id) {
//   if (yowApiIsDown) {
//     return apiIsDownRes
//   }
//   const res = await fetch(`${yowApiUrl}/games/${id}`, {
//     headers: {
//       'Accept': 'application/json, text/plain, */*',
//       'Content-Type': 'application/json'
//     },
//   }).catch((err) => {
//     yowApiIsDown = true
//     return {ok: false, status: 502, message: 'connection refused' }
//   })

//   return res
// }