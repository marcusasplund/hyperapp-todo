export const removeTodo = (model, e) => model.todos.filter(t => e.target.id !== t.id)
