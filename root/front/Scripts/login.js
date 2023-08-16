document.getElementById('login-button').addEventListener('click', function(event) {
    const url = "http://localhost:2718/user"
    event.preventDefault()
    const email = document.getElementById('login-email').value
    if(email.length === 0){
        console.log("empty")
    }       
    else{
        fetch(`${url}/email/${email}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const passwordInput = document.getElementById('login-password').value
            if (data.password === passwordInput) {
                change_window()
            } else {
                console.error('Login failed: Password is incorrect')
            }
        })
        .catch(error => {
            console.error('Error:', error)
        })
    }
})

const change_window = async ()=>{
    try {
        const response = await fetch('http://localhost:2718/home')
        if (response.ok) {
            window.location.href = '/home'
        } else {
            console.error('Failed to fetch /home route')
        }
    } catch (error) {
        console.error('Error fetching /home route:', error)
    }
}