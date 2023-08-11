var url = "http://localhost:2718"

document.getElementById('login-button').addEventListener('click', function(event) {
    event.preventDefault()
    const username = document.getElementById('login-email').value
    fetch(`${url}/username/${username}`)
        .then(response => response.json())
        .then(user => {
        const passwordInput = document.getElementById('login-password').value
        if (user.password === passwordInput) {
            console.log('Login successful')
        } else {
            console.error('Login failed: Password is incorrect')
        }
    })
    .catch(error => {
        console.error('Error:', error)
    })
})
