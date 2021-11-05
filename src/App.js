import { useState } from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  // todoInputState and its counterpart, setTodoInputState are used to keep track of the state of our input box.
  // This will allow us to enhance user experience for small features such as clear the text box after a user is done inserting an item.
  // It will also be easier to track what the user wants to add, which will allow us to continue on with more intricate parts of the app.
  const [todoInputState, setTodoInputState] = useState('');

  // todoItems and setTodoItemsState will manage our actual todo list. As todo items are added, they will populate in our todoItems state.
  const [todoItems, setTodoItemsState] = useState([]);

  // addTodoItem is called from both the actual button on our app, and when the user presses enter, while the input box is focused.
  // It updates our component's state and adds our todo item to our todo list. It then clears the todo input's content, for additional input.
  const addTodoItem = () => {
    setTodoItemsState(items => items = [...items, {
      id: items.length,
      content: todoInputState,
      completed: false
    }]);
    setTodoInputState('');
  };
  
  // handleInputKeyDown will allow is to check which keys the user is pressing. We will use this to keep track of when the user presses 'enter',
  // which will be taken as the user has finished inserting their todo item and would like to submit it. This enhances user experience, so that
  // they don't have to press a button to do so, but rather keep their fingers on the keyboard.
  const handleInputKeyDown = ev => {
    // If the 'enter' key is pressed, then the above 'addTodoItem' function is utilized.
    if (ev.key === "Enter") addTodoItem();
  }

  // checkTodoItem spreads our todo items list into 'todoList'. It allows us to modify the current completion status of the given id's item,
  // and set it to the opposite of its present value.
  // We're then able to set the state of our todo items to match our todoList variable, which contains the updated information.
  const checkTodoItem = id => {
    const todoList = [...todoItems];
    todoItems[id].completed = !todoItems[id].completed;
    console.log(todoItems);
    setTodoItemsState(todoList);
  }

  // removeTodoItem removes an item from our todo list. It receives one argument, id, which corresponds to the todo item's id that is passed in 
  // via the 'X' button. A variable, todoList, is declared, and a filter method is applied. This method returns an array that contains every item
  // except the item that needs to be removed. Our state is then changed to match the newly created todoList variable.
  const removeTodoItem = id => {
    const todoList = [...todoItems].filter(item => item.id !== id);
    setTodoItemsState(t => t = [...todoList]);
  }

  return (
    <div className="todo-frame">
      <div className="todo-input">
        <span>
          <input onKeyDown={handleInputKeyDown} className="todo-input-box" type="text" onChange={ev => setTodoInputState(ev.target.value)} placeholder="Insert a todo item" value={todoInputState} />
          <button type="button" className="todo-add-item" onClick={addTodoItem}>Add Item</button>
        </span>
      </div>
      <div className="legend">
        <p className='todo-info'>This color indicates the item needs attention.</p>
        <p className='done-info'>This color indicates the item is finished.</p>
      </div>
      <div className="todo-list-wrapper">
        <ul className="todo-list-inner">
          {
            todoItems.map(item => {
              return (
                <>
                <div className='item-wrapper'>

                  <li onClick={() => checkTodoItem(item.id)} className='todo-item' style={{ backgroundColor: item.completed ? 'rgb(94, 255, 0)' : 'rgb(0, 217, 255)' }}>
                    <div className="content">
                      <p>ID: {item.id}</p>
                      Todo: {item.content}
                    </div>
                  </li>
                  <div className="actions">
                    <button className="remove-item" onClick={() => removeTodoItem(item.id)}>X</button>
                  </div>
                  </div>
                </>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
