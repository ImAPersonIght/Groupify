
function enterMessage(){
    const messageInput = document.getElementById("message-input").value
    var jsonInfo = getUserData();

    var userName = jsonInfo.username

    addElement(userName, messageInput)
}


function addElement(username, message) {
    // create a new div element
    const messageHeader = document.createElement("h3");
    const messageInfo = document.createElement("p")

    //the users message and info
    var header = document.createTextNode(username);
    var content = document.createTextNode(message);

    //add the text to the tags
    messageHeader.appendChild(header);
    messageInfo.appendChild(content);
  
    // add the newly created element and its content into the DOM
    const theMessage = document.getElementById("the-message");
    document.body.insertBefore(messageHeader, theMessage)
    document.body.insertBefore(messageInfo, theMessage);
  }

  // The user and message will have to come from elsewhere
const getUserData = async ()=>{
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