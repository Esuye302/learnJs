const addUserForm = document.querySelector('.js-add-user-form')
const userName = document.getElementById('name')
const email = document.getElementById('email')
const role = document.getElementById('role')
const showUserList = document.querySelector('.js-user-list tbody')
const addUserBtn = document.querySelector('.add-user')
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')

let editingId = null
let searchTerm = null
let userList = JSON.parse(localStorage.getItem('userList')) ?? []

function renderUserList() {
    let userToRender = userList
    if (searchTerm) {
        userToRender = userToRender.filter(u => u.name === searchTerm)
    }
    showUserList.innerHTML = userToRender.map(user =>
        `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td class="${user.isActive ? 'active' : 'inactive'}">${user.isActive ? 'Active' : 'inactive'}</td>
                 <td>
                 <button class="del-btn" data-userid="${user.id}">Del</button>
                <button class="edit-btn" data-userid="${user.id}">Edit</button>
                <button class="toggle primary" data-userid="${user.id}">${user.isActive ? 'inactive' : 'Active'}</button> 
                 </td>
                </tr>
                

    
    `
    ).join('')
}
renderUserList()
searchBtn.addEventListener("click", (e) => {
    searchTerm = searchInput.value.trim()
    renderUserList()

    searchInput.value = ''
})
addUserBtn.addEventListener('click', addUser)
showUserList.addEventListener('click', (e) => {
    let userId = e.target.dataset.userid

    if (e.target.classList.contains('edit-btn')) {
        editUser(userId)
    }

    if (e.target.classList.contains('del-btn')) {
        removeUser(userId)
    }
    if (e.target.classList.contains('toggle')) {
        //we use this function to active user or inactive
        toggleUser(userId)
    }
})
function saveUser() {
    localStorage.setItem('userList', JSON.stringify(userList))
}

function toggleUser(userid) {
    userList = userList.map(u => {
        if (u.id === userid) {
            return { ...u, isActive: !u.isActive }
        }
        return u
    })
    saveUser()
    renderUserList()
}
function editUser(userid) {
    let user = userList.find(u => u.id === userid)
    userName.value = user.name
    email.value = user.email
    role.value = user.role
    if (user) {
        editingId = user.id
    }

    if (editingId !== null) {
        addUserBtn.innerHTML = 'Edit'
    }
}

function removeUser(userid) {
    userList = userList.filter(u => u.id !== userid)
    saveUser()
    renderUserList()

}
function addUser() {
    if (!userName.value || !email.value, !role.value) return

    const id = crypto.randomUUID()

    if (editingId) {
        userList = userList.map(u => {
            if (editingId === u.id) {
                return { ...u, name: userName.value.trim(), email: email.value.trim(), role: role.value }
            }
            return u
        })
        editingId = null
        addUserBtn.innerHTML = 'Add User'

    } else {

        userList.push({
            name: userName.value,
            email: email.value,
            role: role.value,
            isActive: true,
            id
        })
    }


    saveUser()
    renderUserList()
    userName.value = ''
    email.value = ''
    role.value = 'employee'
}
