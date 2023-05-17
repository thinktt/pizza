import './App.css'
import { useState } from 'react'

function App() {
  const pizzas = ['Peperoni', 'Mushroom', 'Pinapple', 'Cheese']
  const crust = ['Thin Crust', 'Deep Dish']
  const size = ['Small', 'Medium', 'Large', 'Extra Large']
  const table = ['1', '2', '3', '4', '5', '6', '7', '8']
  const [pizzaSelection, setPizza] = useState('Peperoni')
  
  return (
    <main className="main">
      <h1 className="title">
          Turtle Pizza
      </h1>
      <h4>appears at your table with ninja stealth</h4>
      <img 
        className="turtles" 
        src="/tmnt.png" alt="A group of teenage turtles approving of pizza" />
      <Option 
        options={pizzas}
        optionSelection={pizzaSelection}
        doSelection={setPizza} 
      >
      </Option>
      <div className="crust option-group">
        { crust.map(crust => <h2 key={crust}> {crust} </h2> ) }
      </div>
      <div key={size} className="size option-group">
        { size.map(size => <h2 key={size}> {size} </h2> ) }
      </div>
      <div className="table option-group">
        { table.map(table => <h2 key={table} >{table} </h2> ) }
      </div>
    </main>
  )
}

function Option( { options, optionSelection, doSelection }) { 
  return (
    <div className="pizzas option-group">
    { options.map(option => 
      <h2 
        key={option} 
        className={optionSelection === option && 'selected'}
        onClick={() => doSelection(option)}
      >
        {option}
      </h2> ) 
    }
    </div>
  )
}  


export default App


