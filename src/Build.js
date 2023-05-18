import { useState, useEffect } from 'react'
import api from './api.js'
import { useNavigate } from "react-router-dom"

export default function Build() {
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!api.isAuthed()) {
      navigate('/')
    }
  }, [navigate])

  const pizzas = ['Pepperoni', 'Mushroom', 'Pineaapple', 'Cheese']
  const crusts = ['Thin Crust', 'Deep Dish']
  const sizes = ['Small', 'Medium', 'Large', 'Extra Large']
  const tables = ['1', '2', '3', '4', '5', '6', '7', '8']
  
  const [pizzaSelection, setPizza] = useState()
  const [crustSelection, setCrust] = useState()
  const [sizeSelection, setSize] = useState()
  const [tableSelection, setTable] = useState()
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState()
  const [orderWasSent, setOrderWasSent] = useState(false)

  const clearSelections = () => {
    setPizza(null)
    setCrust(null)
    setSize(null)
    setTable(null)
  }

  const isMissingSelection = () => {
    return !pizzaSelection || !crustSelection || !sizeSelection || !tableSelection
  }

  const sendOrder = async () => {
    setOrderWasSent(false)
    setError(null)
    
    if (isMissingSelection()) {
      setError('All fields must be selected')
      return
    }

    setIsSending(true)
    
    let err
    await api.createOrder({
      pizza: pizzaSelection,
      crust: crustSelection,
      size: sizeSelection,
      table: tableSelection
    }).catch((e) => err = e)
    if (err) {
      setError(err.message)
      setIsSending(false)
      return
    }
    
    clearSelections()
    setOrderWasSent(true)
    setIsSending(false)
  }

  return (
    <main className="main">
      {/* <h1 className="title">
          Turtle Pizza
      </h1>
      <h4>appears at your table with ninja stealth</h4> */}
      <img 
        className="turtles small" 
        src="/tmnt.png" alt="A group of teenage turtles approving of pizza" />
      <h1>Create Pizza</h1>
      <Option 
        options={pizzas}
        optionSelection={pizzaSelection}
        doSelection={setPizza} 
      ></Option>
      <Option 
        options={crusts}
        optionSelection={crustSelection}
        doSelection={setCrust}
      ></Option>
      <Option 
        options={sizes}
        optionSelection={sizeSelection}
        doSelection={setSize}
      ></Option>
      <Option
        options={tables}
        optionSelection={tableSelection}
        doSelection={setTable}
      ></Option>
      { isSending ? <h1>spinner...</h1> :
         <button onClick={sendOrder}>Send Order</button>
      }
      <button onClick={() => navigate('/orders')}>View Orders</button>
      { error && <h4 style={{color: 'red'}} >{error}</h4> }
      { orderWasSent && <h4 style={{color: 'green'}} >Order Sent!</h4> }
    </main>
  )
}

function Option( { options, optionSelection, doSelection }) { 
  return (
    <div className="pizzas option-group">
    { options.map(option => 
      <h5 
        key={option} 
        className={optionSelection === option ? 'selected' : ''}
        onClick={() => doSelection(option)}
      >
        {option}
      </h5> ) 
    }
    </div>
  )
}  




