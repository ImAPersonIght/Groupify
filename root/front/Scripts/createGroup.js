
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

const getDate = () => {
    let date = new Date()

    mDate = date.getDate() + "/"
    + (date.getMonth()+1)  + "/" 
    + date.getFullYear();

    return mDate
}

const addGroup = (name, topic, description, rules) => {
    const url = 'localhost:2718/room'
    let data = {
        roomid : 1,
        roomname : name,
        topic : topic,
        description : description,
        rules : rules,
        creation_date : getDate(),
        admin : 1  //This will need to chnage later and actually make it so that it gets the current user account token
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