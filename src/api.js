export default { 
  doAuth,
  setToken,
  isAuthed,
  createOrder,
  getOrders,
  cancelOrder,
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

async function createOrder({pizza, crust, size, table}) {

  const res = await fetch(`${url}/orders`, {
    method: 'POST',
    headers: {
      'Authorization' : 'Bearer ' + token,
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      Flavor: pizza, 
      Crust: crust, 
      Size: size, 
      Table_No: parseInt(table),
      Timestamp: new Date().toISOString(),
      Order_ID: Date.now(),
    })
  })

  const json = await res.json()

  if (!res.ok) {
    throw new Error(`${res.status}: ${json.detail || json.msg}`)
  }
  
} 

async function getOrders() {
  const res = await fetch(`${url}/orders`, {
    headers: {
      'Accept': 'application/json, text/plain, */*',
    },
  })

  const json = await res.json()

  if (!res.ok) {
    throw new Error(`${res.status}: ${json.msg}`)
  }

  const orders = json.map((order) => {
    return {
      pizza: order.Flavor,
      crust: order.Crust,
      size: order.Size,
      table: order.Table_No,
      id: order.Order_ID,
      timestamp: order.Timestamp,
    }
  })

  return orders
}

async function cancelOrder(id) {
  const res = await fetch(`${url}/orders/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization' : 'Bearer ' + token,
      'Accept': 'application/json, text/plain, */*',
    },
  })

  const json = await res.json()
  if (!res.ok) {
    throw new Error(`${res.status}: ${json.msg || json.detail}`)
  }
}


