const groupContainer = document.getElementById("groups-container")

async function showGroup(){

    //get user data
    const userToken = await getUserDataForGroup()
    const userData = await getUserByIdForGroup(userToken.user)
    let roomIds = userData.rooms

    for(let i = 1; i < roomIds.length; i ++){
        //for each 
        var currentRoom = roomIds[i];

        //get the rooms info
        const response = await fetch(`http://localhost:2718/room/${currentRoom}`)
        const data = await response.json()
        console.log(data)

        // create a new div element
        const groupDiv = document.createElement("div");
        groupDiv.setAttribute("id", `group-select-${currentRoom}`)
        groupDiv.onclick = async function(){
            //show the group info
            
            const TITLE = document.getElementById("message-title");
            const DESCRIPTION = document.getElementById("description");
            const RULES = document.getElementById("rules")

            TITLE.innerHTML = data.roomname;
            DESCRIPTION.innerHTML = data.description;
            RULES.innerHTML = data.rules;

            loadMessages(currentRoom.roomIds)

            //NOT FINSIHED NEEDS TO SHOW INFO ON THE PAGE BASED ON THE CLCIKED GROUP
        }

        const groupTitle = document.createElement("h1");
        const groupTopic = document.createElement("h3");

        //the users message and info
        var title = document.createTextNode(data.roomname);
        var topic = document.createTextNode(data.topic);

        //add the info to the tags
        groupTitle.appendChild(title);
        groupTopic.appendChild(topic);

        groupDiv.appendChild(groupTitle);
        groupDiv.appendChild(groupTopic);

        // groupContainer.appendChild(groupDiv);

        //adds the elemnt to the file
        document.getElementById('groups-container').appendChild(groupDiv);
    }
}

async function showUsersInGroup(UserJson){

}

async function loadMessages(id){
    const response = await fetch(`http://localhost:2718/message/${id}`)
    const data = await response.json()

    for(i=0; i < data.length; i++){

        var currentMessage = data[i];


        const messageDiv = document.createElement('div')

        const userName = document.createElement("h1")
        const message = document.createElement("p")

        var userData = document.createTextNode(currentMessage.poster_unsername)
        var messageData = document.createTextNode(currentMessage.message_data)

        userName.appendChild(userData);
        message.append(messageData);

        messageDiv.appendChild(userName);
        messageDiv.appendChild(message);
        
        document.getElementById('show-users-in-group').appendChild(messageDiv);
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
        console.log(data)
        return data
    })
    .catch(error => console.error('An error occurred:', error))
}

showGroup();