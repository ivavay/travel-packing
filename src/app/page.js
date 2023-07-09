'use client';
import { useState } from "react";
import "./globals.css"

// intial list items 
const initialItems = [
  { id: 1, description: "passports", quantity: 2, packed: false },
  { id: 2, description: "socks", quantity: 4, packed: true },
  { id: 3, description: "shirts", quantity: 2, packed: false },
  { id: 4, description: "towels", quantity: 4, packed: true },
];

export default function Home() {
  const [items, setItems] = useState([])

  //  takes an item as a parameter and updates the state of items by adding the item to the existing array of item 
  function handleAddItems(item) {
    setItems((items => [...items, item]))
  }
  function handleDeleteItem(id) {
    setItems((item => item.filter((item) => item.id !== id) ))
  }

  // uses tertiary operator instead of if/else to check if the current id is equal to the id argument. 
  // if it is, it toggles the packed value
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div>
      <Form onAddItems={handleAddItems}/>
      <List items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem}/>
      <Stats items={items}/>
    </div>
  )
}

function Form({onAddItems}) {
  // you can open components under dev tools to see if the states are working
  const [quantity, setQuantity] = useState(2)
  const [description, setDescription] = useState("")

  // prevents the page from refreshing upon submit
  function handleSubmit(e) {
    e.preventDefault();
    console.log(e)
    const newItem = { description, quantity, packed: false, id: Date.now() }
    console.log(newItem)
    onAddItems(newItem)
    setDescription("")
    setQuantity(1)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-24">
        <h1 className="py-8">What do you want to pack today?</h1>
        <select type="multiple" className="rounded mx-2" value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))}>
          // the array method generates numbers from 1 to 20 and we use the map method to loop a value and a key for each option 
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input 
          type="text" 
          className="rounded" 
          value={description}
          onChange={(e)=>setDescription(e.target.value)} 
        />
        <button className="p-2 px-4 rounded mx-2">Add</button>
      </div>
    </form>
  )
}

function List({items, onDeleteItem, onToggleItem}) {
  return (
    <ul className="flex flex-wrap px-24">
    {items.map((item) => (
      <Item item={item}  key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem}/>
    ))} 
  </ul>
  )
}


function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    // ternary operator - if item is packed then strikethrough, if not then left blank
    <li className="mx-4 mt-8">
      <input type="checkbox" className="mx-4" onClick={() => onToggleItem(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button className="delete mx-2" onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({items}) {
  // varaiable that updates based on items in array 
  const numItems = items.length
  const numPacked = items.filter((item) => item.packed).length
  const packedPercentage = Math.round(numPacked / numItems * 100)
  // uses template literals with backticks instead of quotes
  const initalMessage = `You have ${numItems} items on your list, and you have already packed ${numPacked} (${packedPercentage}%)`
  const finishedMessage = "You got everything! Ready to go 🏝️"

  // renders message depending on condition of packing status 
  return (
   <div>
       { packedPercentage === 100 ?  <p className="p-24">{finishedMessage} </p>: <p className="p-24">{initalMessage}</p>
      }
  </div>
  )
}
