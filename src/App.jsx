import { useState, useEffect } from "react"
import Button from "./components/Button"
import NewItem from "./components/NewItem"
import moon from "./assets/images/icon-moon.svg"
import sun from "./assets/images/icon-sun.svg"

import bgDesktopDark from "./assets/images/bg-desktop-dark.jpg"
import bgDesktopLight from "./assets/images/bg-desktop-light.jpg"
import bgMobileDark from "./assets/images/bg-mobile-dark.jpg"
import bgMobileLight from "./assets/images/bg-mobile-light.jpg"

function App() {
  const [list,setList] = useState([]);
  const [item, setItem] = useState('');
  const [filter, setFilter] = useState('all');
  const [isLightMode, setIsLightMode] = useState(false);
  const [draggedIndex,setDraggedIndex] = useState(null);

  // show number of list left
  const length = list.length

  function handlechange(e) {
    setItem(e.target.value);
  }
  // Creat new todo list
  function HanderNewlist(){
    if (item.trim() === '') return;
    const newItem = {
      id : Date.now(),
      name : item.trim(),
      isCompleted : false,
    }
    setList([...list, newItem]);
    setItem('');
  }
  // toggle active & completed task
  function toggleCompleted(id){
    setList(
      list.map(
        item => item.id === id ? {...item,isCompleted : !item.isCompleted}: item
      )
    )
  }

  // delete task
  function deleteItem(id) {
    setList(list.filter(item => item.id !== id))
  }
  function onClear() {
    setList(list.filter(item => !item.isCompleted))
  }
  // fiter completed & not completed tasks
  const filterList = list.filter(item => {
    if (filter === "completed") return item.isCompleted;
    if (filter === "active") return !item.isCompleted;
    return true;
  })

  // Drag and Drop handler
  function DragStartHandler(id){
    setDraggedIndex(id)
  }

  function DragOverHandler(e){
    e.preventDefault();
  }
  function DropHandler(target){
    const fromIndex = list.findIndex(item => item.id === draggedIndex);
    const toIndex = list.findIndex(item => item.id === target);
    const updatedList = [...list];
    const [movedItem] = updatedList.splice(fromIndex, 1);
    updatedList.splice(toIndex, 0, movedItem);
    setList(updatedList);
    setDraggedIndex(null);
  }
  // *************** //

  function ThemeHandler(){
    setIsLightMode(!isLightMode);
    document.body.classList.toggle("lightMode");
  }

  const isDesktop = window.innerWidth >= 960;
  const backgroundImage = isDesktop
    ? (isLightMode ? bgDesktopLight : bgDesktopDark)
    : (isLightMode ? bgMobileLight : bgMobileDark);

  document.body.style.backgroundImage = `url(${backgroundImage})`;

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("List"));
    const savedTheme = JSON.parse(localStorage.getItem("Theme"));
    
    if (savedList) setList(savedList);
    if (savedTheme !== false) {
      setIsLightMode(savedTheme);
      if (savedTheme) document.body.classList.add("lightMode");
    }
  }, []);

  useEffect(() => {
    if (list.length > 0) {
      localStorage.setItem("List", JSON.stringify(list));
    }
  }, [list]);

  useEffect(() => {
    localStorage.setItem("Theme", JSON.stringify(isLightMode))
  }, [isLightMode]);


  return (
    <>
      <main className="container">
        <div className="header">
          <h1 className="title">Todo</h1>
          <figure className="image" onClick={ThemeHandler}>
            <img 
              src={isLightMode ? moon : sun} 
              alt="toggle theme" 
            />
          </figure>
        </div>
        <div className="add-todo">
          <Button onClick={HanderNewlist}/>
          <input 
            type="text" 
            placeholder="Create a new todo..."
            value={item}
            onChange={handlechange}
          />
        </div>
        <section 
          className="list">
          {filterList.map((todo) => (
            <NewItem 
              key={todo.id} 
              ID={todo.id}
              task={todo.name} 
              completed={todo.isCompleted}
              onToggle={()=>{toggleCompleted(todo.id)}}
              onDeleted={()=>{deleteItem(todo.id)}}
              ondragstart={()=> DragStartHandler(todo.id)}
              ondragover={(e)=> DragOverHandler(e)}
              ondrop={()=> DropHandler(todo.id)}
            />
          ))}
          <footer className="list-footer">
            <p >{length} items left</p>
            <div className="filters desktop-only">
              <button type="button" onClick={()=> setFilter('all')} className={filter === "all"? "active" : null}>All</button>
              <button type="button" onClick={()=> setFilter('active')} className={filter === "active"? "active" : null}>Active</button>
              <button type="button" onClick={()=> setFilter('completed')} className={filter === "completed"? "active" : null}>Completed</button>
            </div>
            <button type="button" onClick={onClear}>Clear Completed</button>
          </footer>
        </section>
        <div className="filters mobile-only">
              <button type="button" onClick={()=> setFilter('all')} className={filter === "all" ? "active" : null}>All</button>
              <button type="button" onClick={()=> setFilter('active')} className={filter === "active" ? "active" : null}>Active</button>
              <button type="button" onClick={()=> setFilter('completed')} className={filter === "completed" ? "active" : null}>Completed</button>
            </div>
        <div className="drag-drop">
          <p>Drag and drop to reorder list</p>
        </div>
      </main>
    </>
  )
}

export default App
