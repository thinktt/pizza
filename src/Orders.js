import { useState, useEffect } from 'react'
import api from './api.js'
import { useNavigate } from 'react-router-dom'


export default function OrdersPage() {
  const [pizzaFilters, setPizzaFilters] = useState([])
  const [crustFilters, setCrustFilters] = useState([])
  const [sizeFilters, setSizeFilters] = useState([])
  const [tableFilters, setTableFilters] = useState([])

  const filters = {
    pizzaFilters, setPizzaFilters, 
    crustFilters, setCrustFilters,
    sizeFilters, setSizeFilters,
    tableFilters, setTableFilters
  }

 return (
  <main className="order-page">
    <Filters {...filters} />
    <Orders filters={filters} />
  </main>
 )
}

function Orders({ filters }) {
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

  const filteredOrders = getFilteredOrders(orders, filters)

  const orderList = filteredOrders.map(order => 
    <Order key={order.id} cancel={cancelOrder} {...order} />
  )
  
  return (
      <div className='orders'>
        <h1 className="title">
            Orders
        </h1>
        <button onClick={() => navigate('/build')}>New Order</button>
        { successMessage && <h3 style={{color: 'green'}} >{successMessage}</h3> }
        { error && <h3 style={{color: 'red'}} >{error}</h3> }
        { !orders.length ? <h2>No Current Orders</h2> : 
          <div className="order-list"> 
            { orderList }
          </div> 
        }
      </div>
  )
}

function getFilteredOrders(orders, filters) {
  const {pizzaFilters, crustFilters, sizeFilters, tableFilters} = filters
  const filteredOrders = orders.filter(order => {
    if (pizzaFilters.length && !pizzaFilters.includes(order.pizza)) {
      return false
    }
    if (crustFilters.length && !crustFilters.includes(order.crust)) {
      return false
    }
    if (sizeFilters.length && !sizeFilters.includes(order.size)) {
      return false
    }
    if (tableFilters.length && !tableFilters.includes(order.table.toString())) {
      return false
    }
    return true
  })

    
  return filteredOrders
}


function Order(order) {
  return (
    <div className="order">
      <span>{order.pizza}</span>
      <span>{order.crust}</span>
      <span>{order.size}</span>
      <span>Table {order.table}</span>
      {/* <span>Oder No {order.id}</span> */}
      {/* <button onClick={() => order.cancel(order)} >Cancel Order</button> */}
      <span onClick={() => order.cancel(order)}  className="order-button">
        cancel order
      </span>
    </div>
  )
}

function Filters(props) {
  const pizzas = ['Pepperoni', 'Mushroom', 'Pineapple', 'Cheese']
  const crusts = ['Thin Crust', 'Deep Dish']
  const sizes = ['Small', 'Medium', 'Large', 'Extra Large']
  const tables = ['1', '2', '3', '4', '5', '6', '7', '8']

  const { 
    pizzaFilters, setPizzaFilters, crustFilters, setCrustFilters, 
    sizeFilters, setSizeFilters, tableFilters, setTableFilters 
  } = props

  const updateFilter = (filter) => (selections) => {
    const updateMap = {
      pizza: setPizzaFilters,
      crust: setCrustFilters,
      size: setSizeFilters,
      table: setTableFilters
    }
    updateMap[filter](selections)
  }

  const clearFilters = () => {
    setPizzaFilters([])
    setCrustFilters([])
    setSizeFilters([])
    setTableFilters([])
  }

  return (
    <div className="filters">
      <h2>Filters</h2>
        <Filter
          options={pizzas}
          selections={pizzaFilters}
          updateFilter={updateFilter('pizza')} 
        ></Filter>
        <Filter 
          options={crusts}
          selections={crustFilters}
          updateFilter={updateFilter('crust')}
        ></Filter>
        <Filter 
          options={sizes}
          selections={sizeFilters}
          updateFilter={updateFilter('size')}
        ></Filter>
        <Filter
          options={tables}
          selections={tableFilters}
          updateFilter={updateFilter('table')}
        ></Filter>
        <button onClick={clearFilters}>Clear Filters</button>
    </div>
  )
}

function Filter( { options, selections, updateFilter }) {

  const toggle = (option) => {
    const index = selections.indexOf(option)
    if (index > -1) {
      selections.splice(index, 1)
    } else {
      selections.push(option)
    }
    updateFilter(selections.slice())
  }


  return (
    <div className="pizzas">
    { options.map(option => 
      <h5 
        key={option} 
        className={selections.includes(option) ? 'selected' : ''}
        onClick={() => toggle(option)}
      >
        {option}
      </h5> ) 
    }
    </div>
  )
}

