import axios from "axios";

export const getAllHospitals = () => {
    return axios
        .get('/getAllHospitals/')
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })
}

export const getAllGeoLocations = () => {
    return axios
        .get('/getAllGeoLocations')
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })
}

export const getHospitalByID = (facilityID) => {
    var data = JSON.stringify({
        "id": facilityID
    });

    return axios
        .post('/getGeoLocationById/', data)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            return error
        });
}

export const getBurnOutIndex = (facilityID) => {
    let data = JSON.stringify({
        "facilityId": facilityID
    });


    console.log(data)
    return axios
        .post('/getBurnOutIndexHospital/', data)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })
}

export const getUnitScores = (report_id, facility_id) => {
    var data = JSON.stringify({
        "report_id": report_id,
        "facility_id": facility_id
    });

    return axios
        .post('/getUnitScores/', data)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })
}

export const getHospitalSummary = (facility_id) => {
    var data = JSON.stringify({
        "facility_id": facility_id
    })

    return axios
        .post('/getHospitalSummary', data)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })
}