 import React,{useState} from 'react'
import './App.css';
import {useSelector,useDispatch} from "react-redux"
import { addTodo, completeTodo, deleteTodo, updateTodo } from './actions/todoaction';
import {Modal,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  
  const[task, setTask] = useState("")
  const[editTask, setEditTask] = useState("")
  const[filter, setFilter] = useState("all")
  const todos=useSelector(state=>state.todoReducer)
  const dispatch=useDispatch()
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <div className="App">
      
        <input type='text' placeholder='add task...' onChange={(e)=>setTask(e.target.value)}/>
        <button onClick={()=>dispatch(addTodo(task))}>add task</button>
        <button onClick={()=>setFilter("all")}>all</button>
        <button onClick={()=>setFilter("done")}>done</button>
        <button onClick={()=>setFilter("undone")}>undone</button>
       { filter==="all" ?
        todos.map(el=><div>
        <h2>{el.title}</h2>
        
        <Button variant="primary" onClick={handleShow}>
          update
        </Button>
        
        <Modal.Body>
          <input type='text' placeholder='edit task...' onChange={(e)=>setEditTask(e.target.value)}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=> {dispatch(updateTodo(editTask,el.id));handleClose()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      
       </div>) : 
       filter==="done"  ? todos.filter(el=>el.complete===true)
      .map(el=><div>
        <h2>{el.title}</h2>
        <button onClick={()=>dispatch(deleteTodo(el.id))}>delete</button>
        <button onClick={()=>dispatch(updateTodo(el.id))}>update</button>
        <button onClick={()=>dispatch(completeTodo(el.id))}>{el.complete ? "done":"undone"}</button>
       </div>) : todos.filter(el=>el.complete===false)
      .map(el=><div>
        <h2>{el.title}</h2>
        <button onClick={()=>dispatch(deleteTodo(el.id))}>delete</button>
        <button onClick={()=>dispatch(completeTodo(el.id))}>{el.complete ? "done":"undone"}</button>
       </div>)};
       
    </div>
 );
    
     }
export default App;
