// The user and message will have to come from elsewhere


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

const validateMessage = (message, acToken) => {
    messGex = /^(.){1,300}$/

    if(messGex.test(message)){
        postMessage(message, acToken)
    } else {
        console.log("Message lenght is over 300")
    }
}

const postMessage = ( mess, acToken) => {
    const url = "http://localhost:2718/user"
    let messageData = {
        messageID : 1,
        mTime : getTime(),
        mDate : getDate(),
        mMessage : mess,
        accountToken : acToken,
        posterUsername : getUserByToken(url, acToken),
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
        console.log(data); // Handle the response data
    })
    .catch(error => {
        console.error('Error:', error); // Handle errors
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