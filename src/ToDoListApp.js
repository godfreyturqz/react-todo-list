const useState = React.useState
const useEffect = React.useEffect

function ToDoListApp(){
  const [todoArray, setTodoArray] = useState([])
  useEffect(() => {
    if(localStorage.getItem("data")) {
      setTodoArray(JSON.parse(localStorage.getItem("data")))
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(todoArray))
  }, [todoArray])
  return (
    <>
      <Header/>
      <Footer/>
      <AddListForm setTodoArray={setTodoArray}/>
      {todoArray.map(arr => <List todo={arr.todo} id={arr.id} setTodoArray={setTodoArray}/>)}
    </>
  )
}
function List(props){
  function handleDelete(){
    props.setTodoArray(prev => prev.filter(item => item.id != props.id))
  }
  return <p>>> {props.todo}<button onClick={handleDelete}>Delete</button></p>
}
function Header(){
    return <h1>To-Do List</h1>
}
function AddListForm(props){
  const [inputValue, setInputValue] = useState()
  function handleSubmit(e){
    e.preventDefault()
    if(inputValue){
      props.setTodoArray( prev => prev.concat({todo:inputValue, id:Date.now()}) )
      setInputValue("")
    }
    else{
      alert("Input field is blank.")
    }
  }
  return(
    <form onSubmit={handleSubmit}>
      <input value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="List item"/>
      <button>Add</button>
    </form>
  )
}
function Footer(){
  return <i>Powered by React JS</i>
}
ReactDOM.render(<ToDoListApp/>, document.querySelector("#ToDoList"))