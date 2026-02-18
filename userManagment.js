const users = [

    {
        id: 1,
        name: 'jack',
        profile: { age: 20, city: 'london' },
        isActive: false

    }, {
        id: 2,
        name: 'Anna',
        profile: { age: 25, city: 'paris' },
        isActive: true
    }
]
const addUser = (users, newUser) => {

    const exist = users.some(u => u.id === newUser.id)
    if (exist) {
        return users
    }
    return [...users, newUser]
}
const toggleUser = (users, id) => {
    let found = false
    const updatedUser = users.map((user) => {
        if (user.id === id) {
            found = true
            return [...users, !user.isActive]
        }
        return user
    })
    found ? updatedUser : users 
}
// const updated = addUser(users, {
//     id: 3,
//     name: 'Mike',
//     profile: { age: 30, city: 'Berlin' },
//     isActive: true
// })
console.log(toggleUser(users, 1)); 