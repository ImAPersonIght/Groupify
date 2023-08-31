var i = 1
document.getElementById('modal-create-group-btn').addEventListener('click', function(event) {
    event.preventDefault()

    let name = document.getElementById('group-name').value
    let topic = document.getElementById('group-name').value
    let description = document.getElementById('group-name').value
    let rules = document.getElementById('group-name').value

    createGroup(name, topic, description, rules)
})

const createGroup = (name, topic, description, rules) => {
    if (name === "") {
        console.log("Please make sure name is filled")
    } else {
        addGroup(name, topic, description, rules)
    }
}

const getCurrentDate = () => {
    let date = new Date()

    mDate = date.getDate() + "/"
    + (date.getMonth()+1)  + "/" 
    + date.getFullYear();

    return mDate
}

const addGroup = async (name, topic, description, rules) => {
    const url = 'http://localhost:2718/room'
    const id = await getGroupId()
    const adminID = await getUserID()
    console.log(id)
    let data = {
        roomid : id,
        roomname : name,
        topic : topic,
        description : description,
        rules : rules,
        creation_date : getDate(),
        admin : 1
    }

    fetch(url, {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(res => res.status)
    .then(res => console.log(res))
    .catch(error => console.error('Error:', error))
}

async function getGroupId() {
    let id = 1
    try {
        while (true) {
            const response = await fetch(`http://localhost:2718/room/${id}`)
            if (response.status === 404) {
                return id
            } else {
                id++
            }
        }   
    } catch (err) {
        console.log(err)
    }
}

const getUserID = async ()=>{
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