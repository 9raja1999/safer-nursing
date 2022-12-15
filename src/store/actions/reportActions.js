import axios from "axios";

export const generateReportID = () => {
    var chars = 'acdefhiklmnoqrstuvwxyz0123456789'.split('');
    var result = '';
    for (var i = 0; i < 10; i++) {
        var x = Math.floor(Math.random() * chars.length);
        result += chars[x];
    }
    return result;
}


export const getAllQuestions = () => {
    return axios
        .get('/getAllQuestions/')
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            return error
        });
}


export const addReport = (reportId, facilityId, user) => {
    console.log(user)
    let data = JSON.stringify({
        "reportId": reportId,
        "facilityId": facilityId,
        "user": user
    })

    return axios
        .post('/addReport/', data)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            return error
        });
}

export const addAnswersToReport = (reportId, facilityID, reportAnswers) => {
    let data = JSON.stringify({
        "reportId": reportId,
        "facilityId": facilityID,
        "answers": reportAnswers
    })
    return axios
        .post('/addAnswersToReport/', data)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            return error
        });
}

export const getReportsByID = (facilityId) => {
    let data = JSON.stringify({
        "facilityId" : facilityId
    })
    return axios.post('/getHospitalReport/',data)
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch(err => {
            return err
        })
}