const url = "http://localhost:2178/user"
// Make sure to change the data to grab it from user creation 
let firstName = "Blake"
let lastName = "Hathcock"
let userName = "CoolGuy21"
let passWord = "Password123!"


//Validate user data

// This returns the useer as a JSON
const validateUserData = (fName, lName, user, pass) => {
    /*
    What the regex is checking for:
        first/last name - must have 1 capital letter at  no spaces or special characters no character limit
        username - must be 3 characters no spaces allow special characters 
        password - 8 characters 1 number allow special characters dont allow spaces
    */
    const nameReg = /^[A-Z]{1}\w*$/
    const userNameReg = /^[^\s]{3,}$/
    const passwordReg = /^(?:(?=.\d+)(?=.([A-Z]+))[^\s]{8,})$/


    userValidated  = true

    if(nameReg.test(fName)){
        userData.fName = fName
    } else{
        console.log("First name needs a capital letter at the beginning")
        userValidated = false
    }
    if(nameReg.test(lName)){
        userData.lName = lName
    } else {
        console.log("Last name needs a capital letter at the beginning")
        userValidated = false
    }
    if(userNameReg.test(user)){
        // Will also have to make sure that the username is not taken -----
        userData.useername = user
    } else {
        console.log("Username must have 3  or more with no spaces")
        userValidated = false
    }
    if(passwordReg.test(pass)){
        userData.password = pass
    } else{
        console.log("Password must be 8 characters or longer with at least 1 number")
        userValidated = false
    }

    if(userValidated){
        addUser(fName, lName, user, pass)
    }

}

const addUser = (fName, lNamem, user, pass)=>{
    let userData = {
        fName : fName,
        lName : lNamem,
        useername : user,
        password : pass,
        account_token : null
    }

    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Handle the response data
    })
    .catch(error => {
        console.error('Error:', error); // Handle errors
    });
}