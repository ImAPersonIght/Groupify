document.getElementById('login-button').addEventListener('click', async function(event) {
    const url = "http://localhost:2718/user"
    event.preventDefault()
    const email = document.getElementById('login-email').value

    if (email.length === 0) {
        console.log("empty")
    } else {
        try {
            const response = await fetch(`${url}/email/${email}`)
            const data = await response.json()
            const passwordInput = document.getElementById('login-password').value

            if (data.password === passwordInput) {
                try {
                    const accessToken = await getAccessToken(data)
                    console.log(accessToken)
                    if (accessToken != null) {
                        console.log(accessToken.value)
                        localStorage.setItem('accessToken', accessToken)
                    }
                    if (true) {
                        change_window();
                    } else {
                        console.log('error creating session token');
                    }
                } catch (err) {
                    console.log(err)
                }
            } else {
                console.error('Login failed: Password is incorrect')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }
})

const change_window = async ()=>{
    try {
        const token = localStorage.getItem('accessToken')
        console.log(token)
        if (!token) {
            console.error('Access token not found')
            return
        }
        const response = await fetch('http://localhost:2718/home/auth', {
            method:'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if(response.ok){
            window.location.href = '/home'
        }
        else{
            console.log("failed to authenticate access token")
        }
    } catch (error) {
        console.error('Error fetching /home route:', error)
    }
}

const getAccessToken = async (data)=>{
    try{
        const response = await fetch("http://localhost:2718/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })
        const accessToken = await response.json()
        console.log(accessToken)
        return accessToken
    }
    catch(err){
        console.log(err)
        return null
    }
}