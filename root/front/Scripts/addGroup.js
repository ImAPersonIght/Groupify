
async function searchGroup(){
    const searchInput = document.getElementById("search-input").value

    //get the rooms info
    const response = await fetch(`localhost:2718/room/${}`)
    const data = await response.json()

    if()
}