
async function searchGroup(){
    const searchInput = document.getElementById("search-input").value

    //get the rooms info
    const response = await fetch(`localhost:2718/room/name/${searchInput}`)
    const data = await response.json()

    for(i = 0; i < data.length; i++){
        var currentGroup = data[i];

        const addGroupDiv = document.createElement("div");
        addGroupDiv.setAttribute(`id", "group-add-${currentGroup}`)
        addGroupDiv.onclick = async function(){
            //show a are you sure popup
        }

        const groupHeader = document.createElement("h3");
        const groupTopic = document.createElement("p")

        var header = document.createTextNode(data[i].roomname);
        var topic = document.createTextNode(data[i].topic);

        groupHeader.appendChild(header);
        groupTopic.appendChild(topic);

        addGroupDiv.appendChild(groupHeader)
        addGroupDiv.appendChild(groupTopic)
    }
}