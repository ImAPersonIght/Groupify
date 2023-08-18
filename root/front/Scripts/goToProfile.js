document.getElementById('user-profile-btn').addEventListener('click', function(event) {
    event.preventDefault()
    change_window()
    console.log("Button Clicked!")
})

const change_window = async ()=>{
    try {
        const response = await fetch('http://localhost:2718/home/profile')
        if (response.ok) {
            window.location.href = '/home/profile'
        } else {
            console.error('Failed to fetch /home route')
        }
    } catch (error) {
        console.error('Error fetching /home route:', error)
    }
}