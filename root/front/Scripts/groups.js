const groupContainer = document.getElementById("groups-container")

async function showGroup(){

    //get user data
    var UserData = await getUserDataForGroup();
    var roomIds = UserData.rooms;

    for(i = 0; i < roomIds.length; i ++){
        //for each 
        var currentRoom = roomIds[i];

        //get the rooms info
        const response = await fetch(`http://localhost:2718/room/${currentRoom}`)
        const data = await response.json()

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

        groupContainer.appendChild(groupDiv);
    }
}

async function showUsersInGroup(UserJson){

}

async function loadMessages(messageJson){

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

showGroup();