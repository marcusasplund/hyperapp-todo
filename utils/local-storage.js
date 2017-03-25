const getTodos = () =>
  JSON.parse(window.localStorage.getItem('todos'))

const setTodos = (todos) =>
  window.localStorage.setItem('todos', JSON.stringify(todos))

export {getTodos, setTodos}
