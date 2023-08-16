    var url = "http://localhost:2718/user"

    console.log("this is connected")

    document.getElementById('login-button').addEventListener('submit', function(event) {
        console.log("button clicked")
        event.preventDefault()
        const email = document.getElementById('login-email').value
        fetch(`${url}/email/${email}`)
            .then(response => response.json())
            .then(data => {
                const passwordInput = document.getElementById('login-password').value
                if (data.password === passwordInput) {
                    console.log('Login successful')
                } else {
                    console.error('Login failed: Password is incorrect')
                }
            })
            .catch(error => {
                console.error('Error:', error)
            })
    })