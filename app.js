let users = JSON.parse(localStorage.getItem('users')) ?? []

let nextId = 4
const inputEle = document.getElementById('new-user-name')

const addBtn = document.getElementById('add-btn')
const container = document.getElementById('user-list')
function render() {
    container.innerHTML = users.map(user => `
<div class = "user ${user.isActive ? 'active' : 'inacive'}">
${user.name} - ${user.isActive ? "Active" : "inActive"}
<button id="toggle-btn" data-id=${user.id}>Toggle</button>
<button id="rmv-btn" data-id=${user.id}>Remove</button>

</div>    

`).join('')
    
}


render()

container.addEventListener('click', (event) => {
    let id = Number(event.target.dataset.id)
    let btnId = event.target.id
    if (btnId === 'rmv-btn') {
        removeUser(id)
    }else{
        toggleHandler(id)
    }

})

function removeUser(id) {
    let updatedUser = users.filter(u => u.id !== id)
    users = updatedUser
    localStorage.setItem('users', JSON.stringify(updatedUser))

    render()
}


function toggleHandler(id) {
    let found = false
    const updated = users.map(user => {
        if (user.id === id) {
            found = true
            return { ...user, isActive: !user.isActive }
        }
        return user
    })
    if (found) {
        users = updated
        localStorage.setItem('users', JSON.stringify(users))
        render()
    }
}
addBtn.addEventListener('click', addUser)

function addUser() {
    let cleanName = inputEle.value.trim()
    if (!cleanName) return
    users = [
        ...users,
        { id: nextId++, name: cleanName, isActive: true }
    ]
    localStorage.setItem('users', JSON.stringify(users))
    inputEle.value = ''
    render()

}
inputEle.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
        addUser()
    }
})
let id = 1
// window.addEventListener('load',()=>{
//     console.log('Hi Mr Esrom',id);
// })