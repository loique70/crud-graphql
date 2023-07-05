const url = 'http://localhost:5000/graphql'

async function getData(){
    const query = `{allTodos {id,text,finished}}`


    const response = await fetch(url, {
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },

        body: JSON.stringify({query: query})
    })

    const data = await response.json()

    const todos = data.data.allTodos

    const table = document.getElementById('result')

    for(const todo of todos){
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = todo.id
        row.appendChild(idCell)

        const textCell = document.createElement('td')
        textCell.textContent = todo.text
        row.appendChild(textCell)

        const finishedCell = document.createElement('td')
        finishedCell.textContent = todo.finished
        row.appendChild(finishedCell)

        table.appendChild(row)
    }

}

async function createData(text){
    const mutation = `mutation{createTodo(text:"${text}") {id, text}}`

    const response = await fetch(url, {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({query:mutation})
    })

    const data = await response.json()
    console.log(data)
}

const form = document.getElementById('form')
form.addEventListener('submit', async(event) =>{
    event.preventDefault()
    const text = document.getElementById('text').value
    await createData(text)
    
    form.reset()
})

//Appel du endpoint de supression
const deleteData = async(id) =>{
    const mutation = `mutation {deleteTodo(id: ${id})}`
    const response = await fetch(url, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({query:mutation})
    })

    const data = await response.json()
    console.log(data)
}

const form2 = document.getElementById('form2')
form2.addEventListener('submit', async (event) =>{
    event.preventDefault()
    const id = parseInt(document.getElementById('idp').value)
    await deleteData(id)
    
    form2.reset()
})

window.onload = getData