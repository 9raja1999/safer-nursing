import axios from "axios";


function createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}



export const registration = (email, password, nurseId) => {
    // Creating a unique user id
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");

    let data = JSON.stringify({
        "email": email,
        "password": password,
        "nurseid": nurseId,
        "uuid": uuid,
    })
    return axios.post('/registration/', data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err)
            return err
        })
}

export const login = (email, password) => {
    const data = JSON.stringify({
        "email": email,
        "password": password
    })

    return axios.post('/login/', data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err
        })
}


export const addRequest = (nurseId,firstName,lastName,title,phone,email,reference,message) => {
    let data = JSON.stringify({
        "NurseId" : nurseId,
        "FirstName" : firstName,
        "LastName" : lastName,
        "Title" : title,
        "Phone" : phone,
        "Email" : email,
        "Referrence" : reference,
        "Message" : message
    })

    return axios.post('/request/',data)
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(error => {
            console.log('Error', error)
            return error
        })
}