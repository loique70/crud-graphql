import fs from 'fs/promises'

const readfile = async (path) => JSON.parse(await fs.readFile(path, 'utf-8'))

export default {
    async allTodos(){
        return await readfile('todos.json')
    },

    async oneTodo({id}){
        const todos = await readfile('todos.json')
        const todo = todos.find(todo => todo.id === id)
        return todo 
    },

    async filteredTodo({finished}){
        const todos = await readfile('todos.json')
        const filteredVal = todos.filter(todo => todo.finished == finished)
        return filteredVal
    },

    async createTodo({text}){
        const todos = await readfile('todos.json')
        const newTodo = {id: todos.length + 1, text, finished: false}
        todos.push(newTodo)
        await fs.writeFile("todos.json", JSON.stringify(todos))

        return newTodo
    },

    async updateTodo({id}){
        const todos = await readfile('todos.json')
        const todo = todos.find(todo => todo.id === id)
        todo.finished = !todo.finished
        await fs.writeFile("todos.json", JSON.stringify(todos))

        return "Updated Todo"
    },

    async deleteTodo({id}){
        const todos = await readfile('todos.json')
        const newTodo = todos.filter(todo => todo.id !== id)
        await fs.writeFile("todos.json", JSON.stringify(newTodo))

        return "Deleted Todo"
    }
}
