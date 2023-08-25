document.getElementById('search-btn').addEventListener('click', function(event) {
    event.preventDefault()
    searchGroup();
    console.log("Button Clicked!")
})


async function searchGroup(){

    try{
        const searchInput = document.getElementById("search-input").value

        //get the rooms info
        const response = await fetch(`http://localhost:2718/room/name/${searchInput}`)
        const data = await response.json()
        
            for(i = 0; i < data.length; i++){
                console.log("im in the loop")
                var currentGroup = data[i];
        
                const addGroupDiv = document.createElement("div");
                addGroupDiv.setAttribute("id" , `group-add-${currentGroup}`)
                addGroupDiv.style.border = "5px solid #483A5E"
                addGroupDiv.style.margin = "15px"
                addGroupDiv.style.borderRadius = "5%"

                const groupbtn = document.createElement("button")
                groupbtn.setAttribute("id", `group-btn-${currentGroup}`)
                groupbtn.onclick = async function(){
                    await addUserToGroup(currentGroup)
                }
                groupbtn.style.padding = "20px";
                groupbtn.style.margin = "5px"
                groupbtn.style.marginLeft = "40%"
                groupbtn.style.border = "5px solid #483A5E"
                groupbtn.style.borderRadius = "5%"
                groupbtn.style.width = "40%"
                groupbtn.style.height = "15%"
                groupbtn.style.display = "inline"
                groupbtn.textContent = "Join Group";
        
                const groupHeader = document.createElement("h3");
                groupHeader.style.marginLeft = "5px"
                groupHeader.style.display = "inline"

                const groupTopic = document.createElement("p")
                groupTopic.style.marginLeft = "5px"
                groupTopic.style.display = "inline"
        
                var header = document.createTextNode(data[i].roomname);
                var topic = document.createTextNode(data[i].topic);
        
                groupHeader.appendChild(header);
                groupTopic.appendChild(topic);
        
                addGroupDiv.appendChild(groupHeader)
                addGroupDiv.appendChild(groupTopic)
                addGroupDiv.appendChild(groupbtn)
                
                document.getElementById('show-available-groups').appendChild(addGroupDiv);
            }
    }catch(error){
        console.log(error)
    }
    
    
}

const addUserToGroup = async (group) => {
    let userID = await getUserDataForAddingGroup()
    fetch('http://localhost:2718/user/addRoom', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            room: group,
            user_token: userID.user,
        }),
    })
    .then(response => {
        if (response.ok) {
            // Put here whatever happens after you add a group
        } else {
            console.log("Something went wrong! :(")
        }
    })
}

const getUserDataForAddingGroup = async ()=>{
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