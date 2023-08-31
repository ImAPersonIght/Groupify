const groupContainer = document.getElementById("groups-container")

function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

async function showGroup(){

    //get user data
    const userToken = await getUserDataForGroup()
    const userData = await getUserByIdForGroup(userToken.user)
    let roomIds = userData.rooms

    for(let i in roomIds){

        //for each 
        var currentRoom = roomIds[i];

        if(isPlainObject(currentRoom)){
        }
        else{
            
        //get the rooms info
        const response = await fetch(`http://localhost:2718/room/${currentRoom}`)
        const data = await response.json()

        // create a new div element
        const groupDiv = document.createElement("div");
        groupDiv.setAttribute("id", `group-select-${currentRoom}`)
        groupDiv.addEventListener("click", async function(event){
            //show the group info
            try{
                const TITLE = document.getElementById("message-title");
                const DESCRIPTION = document.getElementById("description");
                const RULES = document.getElementById("rules")
    
                TITLE.innerHTML = data.roomname;
                DESCRIPTION.innerHTML = data.description;
                RULES.innerHTML = data.rules;
    
                loadMessages(data.roomid)//.roomids
    
                //NOT FINSIHED NEEDS TO SHOW INFO ON THE PAGE BASED ON THE CLCIKED GROUP
            }
            catch(err){
                console.log(err)
            }
        })

        const groupTitle = document.createElement("h1");
        groupTitle.style.marginLeft = "5px"
        groupTitle.style.marginBottom = "3px"

        const groupTopic = document.createElement("p");
        groupTopic.style.marginLeft = "5px"

        //the users message and info
        var title = document.createTextNode(data.roomname);
        var topic = document.createTextNode(data.topic);

        //add the info to the tags
        groupTitle.appendChild(title);
        groupTopic.appendChild(topic);

        groupDiv.appendChild(groupTitle);
        groupDiv.appendChild(groupTopic);


        //adds the elemnt to the file
        document.getElementById('groups-container').appendChild(groupDiv);
        }
    }
}

async function showUsersInGroup(UserJson){

}

async function loadMessages(id){
    console.log('message')
    const response = await fetch(`http://localhost:2718/message/${id}`)
    if(response.status === 500){
        console.log("error")
    }
    const data = await response.json()
    console.log(data)

    for(let i=0; i < data.length; i++){
        
        var currentMessage = data[i];

        const messageDiv = document.createElement('div')

        const userName = document.createElement("h1")
        const message = document.createElement("p")

        var userData = document.createTextNode(currentMessage.poster_username)
        var messageData = document.createTextNode(currentMessage.message_data)

        userName.appendChild(userData);
        message.append(messageData);

        messageDiv.appendChild(userName);
        messageDiv.appendChild(message);
        
        document.getElementById('loaded-messages').appendChild(messageDiv);
    }
    
}

const getUserDataForGroup = async ()=>{
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

const getUserByIdForGroup = async (accountToken) => {
    return await fetch(`http://localhost:2718/user/token/${accountToken}`)
    .then(response => response.json())
    .then(data => {
        return data
    })
    .catch(error => console.error('An error occurred:', error))
}

showGroup();