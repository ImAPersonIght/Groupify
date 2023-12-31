document.getElementById('gotoLoginButton').addEventListener('click', function(event) {
    event.preventDefault()
    change_window()
})

const change_window = async ()=>{
    try {
        const response = await fetch('http://localhost:2718/userportal')
        if (response.ok) {
            window.location.href = '/userportal'
        } else {
            console.error('Failed to fetch /home route')
        }
    } catch (error) {
        console.error('Error fetching /home route:', error)
    }
}