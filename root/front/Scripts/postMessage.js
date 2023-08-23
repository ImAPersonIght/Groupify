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

const getDate = () => {
    let date = new Date()

    mDate = date.getDate() + "/"
    + (date.getMonth()+1)  + "/" 
    + date.getFullYear();

    return mDate
}

const getTime = () => {
    let time = new Date()

    mTime = time.getHours() + ":"  
    + time.getMinutes() + ":" 
    + time.getSeconds();

    return mTime
}

const validateMessage = (message) => {
    const messGex = /^(.){1,300}$/

    if(messGex.test(message)){
        postMessage(message)
    } else {
        console.log("Message lenght is over 300")
    }
}

const postMessage = async (mess) => {
    const userData = await getUserData();
    const url = "http://localhost:2718/message"
    let messageData = {
        messageID : id,
        mTime : getTime(),
        mDate : getDate(),
        mMessage : mess,
        accountToken : userData.user,
        posterUsername : getUserByToken(url, userData.user),
        roomID : 1 // Need to find a way to get roomID
    }

    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error('Error:', error)
    });
}

const getUserByToken = (url, acToken) => {
    try{
        fetch(`${url}/token/${acToken}`)
            .then(response => response.json())
            .then(data => {
                return data.username
            })
            .catch(error => {
                console.error('Error:', error)
        })
    } catch(err){
        console.error(err)
    }   
}

const getMessageID = async () => {
    let id = 1
    try{
        const response = await fetch(`http://localhost:2718/message/${id}`)
        if(response.status === 404){
            return id
        }
        else{
            id++
            getMessageId()
        }
    }
    catch(err){
        console.log(err)
    }
}