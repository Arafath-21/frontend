import React, { useState } from 'react'
import logo from './logo.png'
import shadow from './shadow.jpg'
import { Formik,  Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button,Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes';
import { toast } from 'react-toastify';
import useLogout from '../../../hooks/useLogout';
const ResetPwd = () => {
  let {resetToken} = useParams()
  console.log(resetToken);
  let [data,setData] = useState()
  let logout = useLogout()
  let navigate = useNavigate()
  const initialValues = {
    password: '',
    confirmPassword: '',
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });
  const handleReset = async (values, { setSubmitting })=>{
    try {        
      const response = await AxiosService.patch(`${ApiRoutes.RESET.path}/${resetToken}`,values,{
          authenticate:ApiRoutes.RESET.authenticate
      })
      console.log(`res: `,response);
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
      }finally{
        setSubmitting(false)
      }
    }
  return <>
    <div className="container-fluid mt-3 mb-5">
        <div className="d-flex align-items-center justify-content-around h6 logo">
          <img src={logo} alt="" className='img-fluid logo-img' />
        </div>
    </div>
    <div className="container-fluid">
      <div className="row">
        {/* Form column */}
        <div className="col-md-5">
          <div className="login-content mb-4">
            <h2 className='h1 fw-bolder'>Reset PassWord</h2>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleReset(values, { setSubmitting });
            }}         
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="password" className='mb-3'>
                  <Form.Label className='fw-bold'>Password 🙌</Form.Label>
                  <Field type="password" name="password" className="form-control" />
                  <ErrorMessage name="password" component="div" className="text-danger mt-2" />
                </Form.Group>
                <Form.Group controlId="confirmPassword" className='mb-3'>
                  <Form.Label className='fw-bold'>Confirm Password</Form.Label>
                  <Field type="password" name="confirmPassword" className="form-control" />
                  <ErrorMessage name="confirmPassword" component="div" className="text-danger mt-2" />
                </Form.Group>
                <div className="mb-4">
                  <div className="d-flex align-items-center">
                    <Button variant="primary" type="submit" className='btn'>
                      Reset
                    </Button>
                    <div className="text-muted mx-2 h6"><sup>*</sup>Zen Class does not asks for Password</div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col-md-7">
          <img src={shadow} alt="" className='img-fluid'/>
        </div>
      </div>
    </div>  
  </>
}

export default ResetPwd