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

                const groupbtn = document.createElement("button")
                groupbtn.setAttribute("id", `group-btn-${currentGroup}`)
                groupbtn.onclick = async function(){
                    //add group to user
                    //NEEDS FUNCTION TO ADD THE ROOM ID TO THE USER LOGGED IN
                }
        
                const groupHeader = document.createElement("h3");
                const groupTopic = document.createElement("p")
        
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