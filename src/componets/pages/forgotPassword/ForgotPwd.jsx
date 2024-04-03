import React from 'react'
import logo from './logo.png'
import books from './books.jpg'
import { Formik,  Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link,useNavigate } from 'react-router-dom';
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes';
import { toast } from 'react-toastify';

const ForgotPwd = () => {
    const initialValues = {
        email: ''
      };
      const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required')
      });
      const handleForgotPassWord = async (values, { setSubmitting })=>{
        try {
            if (values.email) {
                const response = await AxiosService.patch(ApiRoutes.FORGOT.path,values,{
                    authenticate:ApiRoutes.FORGOT.authenticate
                })
                console.log(response)
                if (response.status===200) {
                    
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }   
            }else{
                toast.error("Input Email")
            }
        } catch (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              toast.error(error.response.data.message);
              console.error('Server Error:', error.response.data);
            } else if (error.request) {
              // The request was made but no response was received
              toast.error('No response received from server.');
              console.error('Request Error:', error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              toast.error('Error:', error.message);
              console.error('General Error:', error.message);
            }
            
        }finally{
            setSubmitting(false)
        }
      }

  return <>
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-7">
                <img src={logo} alt="" className='img-fluid mt-4 p-2 logo-img' />
                <div className="h2 fw-bolder my-5">Forgot Password,Do not Worry we got your Back 🙌</div>
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleForgotPassWord(values, { setSubmitting });
            }}         
          >
            {({ errors, touched,handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className='h5'>Email address</Form.Label>
                  <Field type="email" name="email" className={`form-control ${errors.email && touched.email && 'is-invalid'}`} />
                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
                </Form.Group>
                <div className="mb-4">
                    <div className="d-flex align-items-center">
                        <Button variant="primary" type="submit" className='btn'>
                            Send Mail 
                        </Button>
                        <div className="text-muted mx-3"><sup className='h6'>*</sup>Make Sure you entered correct mail id</div> 
                    </div>
                </div>
              </Form>
            )}
          </Formik>
            </div>
            <div className="col-md-5">
                <img src={books} alt="" className='img-fluid' />
            </div>
        </div>
    </div>
  </>
}

export default ForgotPwd