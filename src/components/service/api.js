const axios = require('axios')

const api = axios.create({
    baseURL: "http://18.230.70.230:3001/"
})

module.exports = api;