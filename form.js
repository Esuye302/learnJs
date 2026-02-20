const form = document.getElementById('myForm')
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')

const passwordInput = document.getElementById('password')
const submitBtn = document.getElementById('submit-btn')
let passwordError = document.getElementById('password-error')
let emailError = document.getElementById('email-error')
let nameError = document.getElementById('name-error')

const displayUserList = document.querySelector('.user-list')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    handleUser()

})

//it checks on the localstorage if none it assign []
let users = JSON.parse(localStorage.getItem('users')) ?? []
function render() {
    displayUserList.innerHTML = users.map(u => `
        <p class="${u.isActive ? "active" : "inactive"}"> ${u.name} : ${u.email} : ${u.password}|
          <input type="checkbox" data-userid="${u.id}" ${u.isActive ? "checked" : ""}> 
          <button id='del-btn' data-userid="${u.id}">Del</button>
          <button id='edit-btn' data-userid="${u.id}">Edit</button>  </p>  
    `).join('')





}
render()
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users))

}

// we use in here eventdeligation or event bubbling the event goes up from specfic to the documnet  
// for instance  <ul><li><button>click</button></li></ul>  when we click the btn it goes up from button->li->ul->til it get to the documnet

displayUserList.addEventListener('click', (event) => {

    let userId = Number(event.target.dataset.userid)
    let btnId = event.target.id.trim()
    if (btnId === 'del-btn') {
        removeUser(userId)
    }
    if (btnId === 'edit-btn') {
        editUser(userId)
    }
    if (event.target.type === 'checkbox') {
        toggleUser(userId)
    }


})




let editingId = null
function editUser(userid) {
    const user = users.find(u => u.id === userid)
    if (!user) return


    passwordInput.value = user.password
    nameInput.value = user.name
    emailInput.value = user.email


    document.getElementById('password').type = 'text'
    editingId = user.id

}

function toggleUser(userId) {
    const user = users.find(u => u.id === userId)
    if (!user) return

    users = users.map(u => {
        if (u.id === userId) {
            return { ...u, isActive:!u.isActive }

        }
        return u
    })
    saveUsers()
    render()
}

function removeUser(userid) {
    console.log(userid);
    users = users.filter(u => u.id !== userid)
    saveUsers()
    render()
}
let id = 1
function handleUser() {
    const name = nameInput.value.trim()
    const password = passwordInput.value.trim()
    const email = emailInput.value.trim()
    let hasError = false
    const emailPattern = /^[^]+@[^]+\.[a-z]{2,3}$/
    passwordError.innerText = ''
    emailError.innerText = ''
    nameError.innerText = ''
    if (!name) {
        nameError.innerText = 'Name required'
        hasError = true
        return

    }
    if (!email) {
        emailError.innerText = 'email required'
        hasError = true
        return

    }
    if (!emailPattern.test(email)) {
        emailError.innerText = 'invalid Email format'
        hasError = true
        return

    }
    if (!password) {
        passwordError.innerText = 'Password Required'
        hasError = true
        return

    }
    if (password.length < 6) {
        passwordError.innerText = 'Password Must be greater than 6'
        hasError = true
        return

    }
    if (hasError) return

    if (editingId !== null) {
        users = users.map(u => {
            if (u.id === editingId) {
                return { ...u, name, email, password }
            }
            return u
        })
        editingId = null
    } else {
        let user = { name, email, password, id: id++, isActive: true }
        users = JSON.parse(localStorage.getItem('users')) ?? []
        users = [...users, user]
    }
    saveUsers()
    render()

    form.reset()
}