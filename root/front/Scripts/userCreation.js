const url = "http://localhost:2718/user"
var i = 1
document.getElementById("create-form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    // Get the values from the form fields
    let fName = document.getElementById("create-first-name").value;
    let lName = document.getElementById("create-last-name").value;
    let user = document.getElementById("create-username").value;
    let pass = document.getElementById("create-password").value;
    let email = document.getElementById("create-email").value;

    validateUserData(fName, lName, user, pass, email);
});

// This returns the user as a JSON
const validateUserData = (fName, lName, user, pass, email) => {
    /*
    What the regex is checking for:
        first/last name - must have 1 capital letter at  no spaces or special characters no character limit
        username - must be 3 characters no spaces allow special characters 
        password - 8 characters 1 number allow special characters dont allow spaces
    */
    const nameReg = /^[A-Z]{1}\w*$/
    const userNameReg = /^[^\s]{3,}$/
    const passwordReg = /^(?=.*\d)(?=.*[A-Z])\S{8,}$/
    const emailReg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]{2,})\.([a-zA-Z]{2,5})$/


    userValidated  = true

    if(!nameReg.test(fName)){
        console.log("First name needs a capital letter at the beginning")
        userValidated = false
    }
    if(!nameReg.test(lName)){
        console.log("Last name needs a capital letter at the beginning")
        userValidated = false
    }
    if(!userNameReg.test(user)){
        console.log("Username must have 3  or more with no spaces")
        userValidated = false
    }
    if(!passwordReg.test(pass)){
        console.log("Password must be 8 characters or longer with at least 1 number")
        userValidated = false
    }
    if(!emailReg.test(email)){
        console.log('Must be an valid email')
        userValidated = false
    }

    if(userValidated){
        addUser(fName, lName, user, pass, email)
    }

}

const addUser = async (fName, lName, user, pass, email)=>{
    const id = await getUserId()
    console.log(id)
    let data = {
        "f_name" : fName,
        "l_name" : lName,
        "username" : user,
        "password" : pass,
        "email" : email,
        "account_token" : id,
        "friends": [],
        "rooms": [],
    }
    console.log(data)
    fetch(url, {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(res => res.status)
    .then(res => console.log(res))
    .catch(error => console.error('Error:', error))
}

async function getUserId() {
    let id = 1
    try {
        while (true) {
            const response = await fetch(`http://localhost:2718/user/token/${id}`)
            if (response.status === 404) {
                console.log(id)
                return id
            } else {
                id++
            }
        }   
    } catch (err) {
        console.log(err)
    }
}