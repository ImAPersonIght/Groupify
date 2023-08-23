const groupTitle = document.getElementById("message-title")
const groupRules = document.getElementById("rules")
const groupDescription = document.getElementById("description")


//RUN THIS FUNCTION WHEN THE CLICK ON A GROUP
async function showGroupData(){

    var data = await getUserData();

    //get the info based on the room they clicked on

    //UNFINISHED PLEASE FINISH


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