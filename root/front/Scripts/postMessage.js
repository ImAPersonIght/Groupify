// The user and message will have to come from elsewhere


const getTimeAndDate = () => {
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

const validateMessage = (message, user) => {
    getTimeAndDate()

    messGex = /^(.){1,300}$/

    if(messGex.test(message)){
        postMessage()
    } else {
        console.log("Message lenght is over 300")
    }
}

const postMessage = ( mess, acToken) => {
    let messageData = {
        mTime : getTime(),
        mDate : getDate(),
        mMessage : mess,
        accountToken : acToken
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