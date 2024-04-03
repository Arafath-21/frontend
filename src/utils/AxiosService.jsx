import axios from 'axios'

const AxiosService = axios.create({
    baseURL:"http://localhost:3120/api/v1/student",
    headers:{
        "Content-Type":"application/json"
    }
})

export default AxiosService