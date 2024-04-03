import React, { useState } from 'react'
import logo from './logo.png'
import study from './study.jpg'
import { useNavigate, useParams } from 'react-router-dom'
import useLogout from '../../../hooks/useLogout'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import { toast } from 'react-toastify'
import './confirm.css'
const Confirm = () => {
    let {resetToken} = useParams()
    let [data,setData] = useState()
    let logout = useLogout()
    const navigate = useNavigate()
    console.log(resetToken);
    const handleAuthenticate = async ()=>{
        try {
            if (!resetToken) {
                logout()
            }
            let response = await AxiosService.patch(`${ApiRoutes.CONFIRM.path}/${resetToken}`,{
                authenticate:ApiRoutes.CONFIRM.authenticate
            })
            console.log(response);
            if (response.status === 200) {
                setData(response.data)
                navigate('/login')
                toast.success(response.data.message);
            }
        } catch (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              toast.error(error.response.data.message);
              console.error('Server Error:', error.response.data);
              logout()
            } else if (error.request) {
              // The request was made but no response was received
              toast.error('No response received from server.');
              console.error('Request Error:', error.request);
              logout()
            } else {
              // Something happened in setting up the request that triggered an Error
              toast.error('Error:', error.message);
              console.error('General Error:', error.message);
              logout()
            }
          }
    }

  return <>
  <div className="wrapper">
    <div className="container">
        <div className="row">
            <div className="p-0 m-0">
              <img src={logo} alt="" className='img-fluid'/>
            </div>
            <div className="col-md-6 offset-2">
                <div className="card" style={{"width": "35rem"}}>
                    {/* <img src={logo} className="card-img-top img-fluid" alt="...00"/> */}
                    <div className="card-body">
                        <h5 className="card-title">Authenticate User</h5>
                        <p className="card-text">Please Click on the Below for Authentication</p>
                        <div className="btn btn-primary" onClick={handleAuthenticate}>Authenticate</div>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
              <img src={study} alt="" className='img-fluid' />
            </div>
        </div>
    </div>
</div>
  </>
}

export default Confirm