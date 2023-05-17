import { useState, useEffect } from 'react'
import api from './api.js'
import { useNavigate } from "react-router-dom"

export default function Orders() {
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!api.isAuthed()) {
      navigate('/')
    }
  }, [navigate])

  const [orders, setOrders] = useState([])
  const [error, setError ] = useState()
  const [successMessage, setSuccessMessage] = useState()

  const getOrders = async () => {
    let err
    const orders = await api.getOrders().catch((e) => err = e)
    if (err) {
      setError(err.message)
      return
    }
    setOrders(orders)
  }

  const cancelOrder = async (order) => {
    setError(null)
    console.log('cancel order', order)
    let err
    await api.cancelOrder(order.id).catch((e) => err = e)
    if (err) {
      setError(err.message)
      return
    }
    getOrders()
  }

  useEffect(() => {
    getOrders()
  }, [])

  const orderList = orders.map(order => 
    <Order key={order.id} cancel={cancelOrder} {...order} />
  )
  
  return (
    <main className="main">
      <Filters />
      <h1 className="title">
          Orders
      </h1>
      <button onClick={() => navigate('/build')}>Create Order</button>
      { successMessage && <h3 style={{color: 'green'}} >{successMessage}</h3> }
      { error && <h3 style={{color: 'red'}} >{error}</h3> }
      { !orders.length ? <h2>No Current Orders</h2> : orderList }
    </main>
  )
}

function Order(order) {
  return (
    <div className="order">
      <h2>{order.pizza}</h2>
      <h3>{order.crust}</h3>
      <h3>{order.size}</h3>
      <h3>Table {order.table}</h3>
      <h3>Oder No {order.id}</h3>
      <button onClick={() => order.cancel(order)} >Cancel Order</button>
    </div>
  )
}


function Filters() {
  const pizzas = ['Peperoni', 'Mushroom', 'Pinapple', 'Cheese']
  const crusts = ['Thin Crust', 'Deep Dish']
  const sizes = ['Small', 'Medium', 'Large', 'Extra Large']
  const tables = ['1', '2', '3', '4', '5', '6', '7', '8']

  const [pizzaSelections, setPizza] = useState([])
  const [crustSelections, setCrust] = useState([])
  const [sizeSelections, setSize] = useState([])
  const [tableSelections, setTable] = useState([])

  return (
    <div className="filters">
      <h2>Filters</h2>
        <Option 
          options={pizzas}
          optionSelection={pizzaSelections}
          doSelection={setPizza} 
        ></Option>
        <Option 
          options={crusts}
          optionSelection={crustSelections}
          doSelection={setCrust}
        ></Option>
        <Option 
          options={sizes}
          optionSelection={sizeSelections}
          doSelection={setSize}
        ></Option>
        <Option
          options={tables}
          optionSelection={tableSelections}
          doSelection={setTable}
        ></Option>
    </div>
  )
}

function Option( { options, optionSelection, doSelection }) { 
  return (
    <div className="pizzas option-group">
    { options.map(option => 
      <h4 
        key={option} 
        className={optionSelection === option ? 'selected' : ''}
        onClick={() => doSelection(option)}
      >
        {option}
      </h4> ) 
    }
    </div>
  )
}  




