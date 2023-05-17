export default { 
  doAuth,
  setToken,
}


let token = null
const url = 'https://pizza-api-app.herokuapp.com/api'


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
  
  if (!res.ok) {
    throw new Error(res.status, res.statusText)
  }

  const json = await res.json()
  setToken(json.acccess_token)

  return
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