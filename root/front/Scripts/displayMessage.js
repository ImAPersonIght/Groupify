let count = 1
const getMaxRetryCount = 10

async function enterMessage() {
    const messageInput = document.getElementById("message-input").value
    await validateMessage(messageInput)

    var jsonInfo = await getUserDataForMessage();

    var userName = await getUserById(jsonInfo.user)

    addElement(userName.username, messageInput)
}   


function addElement(username, message) {
    // create a new elements
    const messageHeader = document.createElement("p");
    // const messageInfo = document.createElement("p")

    //the users message and info
    var header = document.createTextNode(username + ": " + message);
    // var content = document.createTextNode(message);

    //add the text to the tags
    messageHeader.appendChild(header);
    // messageInfo.appendChild(content);

    // add the newly created element and its content into the DOM
    const theMessage = document.getElementById("the-message");
    theMessage.appendChild(messageHeader);
    // theMessage.appendChild(messageInfo);

}


  // The user and message will have to come from elsewhere
const getUserDataForMessage = async ()=>{
    const token = localStorage.getItem('accessToken')
    if (!token) {
        console.error('Access token not found')
    }
    else{
        const userData = await fetch('http://localhost:2718/decode', {
            method:'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return userData.json()
    }
    return null
}

// ------------------------------------


const getDate = () => {
    let date = new Date()

    mDate = date.getDate() + "/"
    + (date.getMonth()+1)  + "/" 
    + date.getFullYear();

    return mDate
}

const getTime = () => {
    let time = new Date()

    mTime = time.getHours() + ":"  
    + time.getMinutes() + ":" 
    + time.getSeconds();

    return mTime
}

const validateMessage = (message) => {
    const messGex = /^(.){1,300}$/

    if(messGex.test(message)){
        postMessage(message)
    } else {
        console.log("Message lenght is over 300")
    }
}

const displayAllMessages = async () =>{
    let response = await fetch(`http://localhost:2718/message${localStorage.getItem('currentRoom')}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        }
    })
    let messages = response.json()
    for(let i = 0; i < messages.length; i ++){
    }
}

const postMessage = async (mess) => {
    let userID = await getUserDataForMessage()
    let userData = await getUserById(userID.user)
    const url = "http://localhost:2718/message"
    let currentRoom = localStorage.getItem("currentRoom")
    let messageData = {
        Time : getTime(),
        Date : getDate(),
        message_data : mess,
        user_token : userData.account_token,
        poster_username : userData.username,
        roomid : parseInt(currentRoom)
    }
    try{
        const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
        })
        const data = await response.json()
        return data
    }
    catch(err){
        console.log(err)
    }
}

const getUserById = async (accountToken) => {
    return await fetch(`http://localhost:2718/user/token/${accountToken}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return data
    })
    .catch(error => console.error('An error occurred:', error))
}