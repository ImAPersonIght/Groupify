var url = "http://localhost:2718"

document.getElementById('login-button').addEventListener('click', function(event) { // need to connect to the login button
    event.preventDefault()
    const email = document.getElementById('login-email').value // needs to connect to the email text box
    fetch(`${url}/email/${email}`)
        .then(response => response.json())
        .then(data => {
        const passwordInput = document.getElementById('login-password').value // need to connect this to the password text box
        if (data.password === passwordInput) {
            console.log('Login successful') // Put the page right here with the account assigned to the user
        } else {
            console.error('Login failed: Password is incorrect') // have them try again
        }
    })
    .catch(error => {
        console.error('Error:', error)
    })
})
