let users = [
    { id: 1, name: 'Jack', isActive: true },
    { id: 1, name: 'Anna', isActive: false },
]
const ul = document.getElementById('user-list')
function render() {
    ul.innerHTML = users.map(user => `
        <li>
        ${user.name}
        <button class="toggle-btn" data-id=${user.id}>Toggle</button>
        </li>
        `).join('')
}
// render()
document.querySelectorAll('.toggle-btn')
    .forEach(btn => {
        btn.addEventListener('click', () => {
        })
    })

document.querySelector('.add')
    .addEventListener('click', () => {
        console.log('clicked');
    })