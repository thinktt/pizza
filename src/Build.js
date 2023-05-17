import { useState } from 'react'

export default function Build() {
  const pizzas = ['Peperoni', 'Mushroom', 'Pinapple', 'Cheese']
  const crusts = ['Thin Crust', 'Deep Dish']
  const sizes = ['Small', 'Medium', 'Large', 'Extra Large']
  const tables = ['1', '2', '3', '4', '5', '6', '7', '8']
  
  const [pizzaSelection, setPizza] = useState()
  const [crustSelection, setCrust] = useState()
  const [sizeSelection, setSize] = useState()
  const [tableSelection, setTable] = useState()

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
      <button>Send Order</button>
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




