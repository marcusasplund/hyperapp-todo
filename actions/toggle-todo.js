export const toggleTodo = (model, e) => model.todos.map(t => e.target.id === t.id ? Object.assign({}, t, {
  done: !t.done
}) : t)
