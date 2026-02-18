// const users = [
//     {
//         id: 1,
//         name: 'jack',
//         profile: { age: 20, city: 'london' },
//         isActive: true
//     }
// ]
// const updateUserAge = (users, id, newAge) => {

//     return users.map(u => u.id === id ? ({
//         ...u,
//         profile: { ...u.profile, age: newAge }
//     }) : u)
// }
// const x = updateUserAge(users, 2, 23)
// x.forEach(element => {
//     console.log(element.profile.age = 90)
// });
const product = [
    {

        name: 'Jack',
        quantity: 1
    },
    {
        name: 'Anna',
        quantity: 1

    },
    {
        name: 'Herry',
        quantity: 1


    }
]



const container = document.querySelector('.js-container')
const addBtn = document.querySelector('.js-add-btn')
let productHtml = ''

product.forEach((p) => {

    productHtml += ` 
     <div class="product" >
            <button class="add-btn js-add-btn "data-name="${p.name}"> Add </button>
    </div>`

})
const qu = document.querySelector('.js-q')
container.innerHTML = productHtml
document.querySelectorAll('.js-add-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        let userName = btn.dataset.name
        let match
        cart.forEach((item) => {
            if (item.name === userName) {
                match = item
            }
        })
        if (match) {
            match.quantity++
        } else {

            cart.push({
                name: userName,
                quantity: 1
            })
        }

        let q = 0



        qu.innerHTML = q
    })
})
