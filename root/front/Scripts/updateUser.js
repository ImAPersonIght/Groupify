const accountToken = 1
url = "http://localhost:2718/user/token/"

document.getElementById('modal-save-UserName-changes').addEventListener('click', function(event) {
    let oldUsername = document.getElementById('currentUserName').value 
    let newUsername = document.getElementById('newUserName').value 

    updateUsername(oldUsername, newUsername)
})

document.getElementById('modal-save-password-changes').addEventListener('click', function(event) {
    let oldPassword = document.getElementById('currentPassword').value 
    let newPassword = document.getElementById('newPassword').value 

    updateUsername(oldPassword, newPassword)
})

document.getElementById('modal-save-email-changes').addEventListener('click', function(event) {
    let oldEmail = document.getElementById('currentEmail').value 
    let newEmail = document.getElementById('newEmail').value 

    updateUsername(oldEmail, newEmail)
})



const checkPassword = (userData, password) => {
    if(userData.password != password){
        return false
    } else {
        return true
    }
}

const updatePassword = (oldPassword, newPassword) => {
    let userData = getUserData()
    if (checkUsername(userData, oldPassword)) {
        const updateUrl = "http://localhost:2178/user/update/"

        fetch(updateUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: accountToken, password : newPassword})
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error: ', error))
    } else {
        console.error('Password check failed, cannot update user');
    }
}

const checkUsername = (userData, username) => {
    if(userData.username != username){
        return false
    } else {
        return true
    }

}

const checkEmail = (userData, email) => {
    if(userData.email != email){
        return false
    } else {
        return true
    }
}

const updateUsername = (oldUsername, newUsername) => {
    let userData = getUserData()
    if (checkUsername(userData, oldUsername)) {
        const updateUrl = "http://localhost:2178/user/update/"

        fetch(updateUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: accountToken, email : newUsername})
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error: ', error))
    } else {
        console.error('Username check failed, cannot update user');
    }
}

const updateEmail = (oldEmail, newEmail) => {
    let userData = getUserData()
    if (checkUsername(userData, oldEmail)) {
        const updateUrl = "http://localhost:2178/user/update/"

        fetch(updateUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: accountToken, email : newEmail})
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error: ', error))
    } else {
        console.error('Email check failed, cannot update user');
    }
}

const getUserData = async ()=>{
    const token = localStorage.getItem('accessToken')
    if (!token) {
        console.error('Access token not found')
    }
    else{
        const userData = await fetch('http://localhost:2718/decode', {
            method:'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return userData.json()
    }
    return null
}