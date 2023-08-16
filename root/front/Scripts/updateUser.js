const accountToken = 1
url = "http://localhost:2718/user/token/"

const checkPass = (accountToken) => {
    return fetch(`${url}?token=${accountToken}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            return true
        } else {
            console.error('Password check failed')
            return false
        }
    })
    .catch(error => {
        console.error('Error: ', error)
        return false
    });
}

const updateUser = (accountToken, userData) => {
    checkPass(accountToken).then(isValid => {
        if (isValid) {
            const updateUrl = "http://localhost:2178/user/update/"

            fetch(updateUrl, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: accountToken, ...userData })
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error: ', error))
        } else {
            console.error('Password check failed, cannot update user');
        }
    });
}