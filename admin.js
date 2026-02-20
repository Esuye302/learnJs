const addUserForm = document.querySelector('.js-add-user-form')
const userName = document.getElementById('name')
const email = document.getElementById('email')
const role = document.getElementById('role')
const showUserList = document.querySelector('.js-user-list tbody')
const addUserBtn = document.querySelector('.add-user')
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')

let editingId = null
let id = 1

let userList = JSON.parse(localStorage.getItem('userList')) ?? []

function renderUserList() {
    showUserList.innerHTML = userList.map(user =>
        `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td class="${user.isActive ? 'active' : 'inactive'}">${user.isActive ? 'Active' : 'inactive'}</td>
                 
                </tr>
                 <button class="del-btn" data-userid="${user.id}">Del</button>
                <button class="edit-btn" data-userid="${user.id}">Edit</button>
                <button class="toggle" data-userid="${user.id}">${user.isActive ? 'inactive' : 'Active'}</button>

    
    `
    ).join('')
}
renderUserList()
searchBtn.addEventListener("click", (e) => {
    let searchName = searchInput.value.trim()
  let searchedUser = [] 
  searchedUser.push( userList.find(u=>u.name===searchName))
  userList = searchedUser
  searchInput.value = ''
  renderUserList()
})
addUserBtn.addEventListener('click', addUser)
showUserList.addEventListener('click', (e) => {
    let userId = Number(e.target.dataset.userid);

    if (e.target.className === 'edit-btn') {
        editUser(userId)
    }

    if (e.target.className === 'del-btn') {
        removeUser(userId)
    }
    if (e.target.className === 'toggle') {
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
    if (!userName || !email, !role) return

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
            id: id++
        })
    }


    saveUser()
    renderUserList()
    userName.value = ''
    email.value = ''
    role.value = 'employee'
}

