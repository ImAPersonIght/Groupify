const url = "http://localhost:2178"

document.getElementById('login-button').addEventListener('click', function(event) {
    event.preventDefault(); 
  
    const username = document.getElementById('login-email').value;
  
    // Make a GET request to fetch user data by username
    fetch(`${url}/username/${username}`)
      .then(response => response.json())
      .then(user => {
        const passwordInput = document.getElementById('login-password').value;
        if (user.password === passwordInput) {
          console.log('Login successful');
          // Redirect or update UI as needed
        } else {
          console.error('Login failed: Password is incorrect');
          
        }
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error
      });
  });
