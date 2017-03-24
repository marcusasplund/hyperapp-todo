const getTodos = () => 
  JSON.parse(localStorage.getItem('todos'))

const setTodos = (todos) => 
  localStorage.setItem('todos', JSON.stringify(todos))

export {getTodos, setTodos}