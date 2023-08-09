const url = "http://localhost:2178/user"
// Make sure to change the data to grab it from user creation 
let firstName = "Blake"
let lastName = "Hathcock"
let userName = "CoolGuy21"
let passWord = "Password123!"


//Validate user data

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

    let valFirstName = nameReg.test(fName)
    let valLastName = nameReg.test(lName)
    let valUsername = userNameReg.test(user)
    let valPassword = passwordReg.test(pass)

    if(nameReg.test(fName) == false){

    } else if(valLastName == false){

    } else if(valPassword == false){

    } else if(valUsername == false){

    } else{

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