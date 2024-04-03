import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Col, Row, Form } from 'react-bootstrap';
import logo from './logo.png';
import AxiosService from '../../../utils/AxiosService';
import ApiRoutes from '../../../utils/ApiRoutes';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function NewUser() {
  const navigate = useNavigate()
  const initialValues={
          firstName: '',
          lastName: '',
          email: '',
          contactNumber: '',
          qualification: '',
          yearOfPassedOut: '',
          yearOfExperience: '',
          noticePeriod: '',
          city: '',
          zip: '',
          password: '',
          confirmPassword: '',
  }
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, 'First Name must be at least 3 characters')
      .required('First Name is required'),
    lastName: Yup.string()
      .required('Last Name is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    contactNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Contact Number must be exactly 10 digits')
      .required('Contact Number is required'),
    qualification: Yup.string()
      .required('Qualification is required'),
    yearOfPassedOut: Yup.string()
      .matches(/^[0-9]{4}$/, 'Year of Passed Out must be exactly 4 digits')
      .required('Year of Passed Out is required'),
    yearOfExperience: Yup.string(),
    noticePeriod: Yup.string(),
    city: Yup.string(),
    zip: Yup.string(),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSignUp = async(values,{setSubmitting}) =>{
    try {
      const response = await AxiosService.post(ApiRoutes.SIGNUP.path,values,{
        authenticate:ApiRoutes.SIGNUP.authenticate
      })
      console.log(response)
      console.log(response.status);
      if (response.status===201)
      {
        toast.success(response.data.message)  
        navigate('.login')
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
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10 my-5 mx-auto text-center">
          <div className="content">
            <div className="h1">Sign Up Here!🙌</div>
            <div className="text-muted h5">Start Your Journey by Signing up, Start your Class in</div>
          </div>
          <div className="logo-img">
            <img src={logo} alt="" className='img-fluid'/>
          </div>
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSignUp(values,{setSubmitting})
          setSubmitting(false) 
        }}
      >
        {({ isSubmitting,handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col xs={12} md={6} className='mb-2'>
                <Form.Group controlId="firstName">
                  <Form.Label className='fw-bold'>First Name</Form.Label>
                  <Field type="text" name="firstName" className="form-control" />
                  <ErrorMessage name="firstName" component="div" className="text-danger mt-2" />
                </Form.Group>
              </Col>
              <Col xs={12} md={6} className='mb-2'>
                <Form.Group controlId="lastName">
                  <Form.Label className='fw-bold'>Last Name</Form.Label>
                  <Field type="text" name="lastName" className="form-control" />
                  <ErrorMessage name="lastName" component="div" className="text-danger mt-2" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} md={6} className='mb-2'>
                <Form.Group controlId="email">
                  <Form.Label className='fw-bold'>Email</Form.Label>
                  <Field type="email" name="email" className="form-control" />
                  <ErrorMessage name="email" component="div" className="text-danger mt-2" />
                </Form.Group>
              </Col>
              <Col xs={12} md={6} className='mb-2'>
                <Form.Group controlId="contactNumber">
                  <Form.Label className='fw-bold'>Contact Number</Form.Label>
                  <Field type="text" name="contactNumber" className="form-control" />
                  <ErrorMessage name="contactNumber" component="div" className="text-danger mt-2" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} md={6} className='mb-2' >
                <Form.Group controlId="qualification">
                  <Form.Label className='fw-bold'>Qualification</Form.Label>
                  <Field as="select" name="qualification" className="form-select">
                    <option value="">Choose...</option>
                    <option value="B.E/B.Tech">B.E/B.Tech</option>
                    <option value="B.Sc">B.Sc</option>
                    <option value="B.A">B.A</option>
                    <option value="M.E/M.Tech">M.E/M.Tech</option>
                    <option value="M.Sc">M.Sc</option>
                    <option value="M.A">M.A</option>
                    <option value="Ph.D">Ph.D</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage name="qualification" component="div" className="text-danger mt-2" />
                </Form.Group>
              </Col>
              <Col xs={12} md={6} className='mb-2'>
                <Form.Group controlId="yearOfPassedOut">
                  <Form.Label className='fw-bold'>Year Of Passed Out</Form.Label>
                  <Field type="text" name="yearOfPassedOut" className="form-control" />
                  <ErrorMessage name="yearOfPassedOut" component="div" className="text-danger mt-2" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} md={6} className='mb-2'>
                <Form.Group controlId="yearOfExperience">
                  <Form.Label className='fw-bold'>Year Of Experience</Form.Label>
                  <Field type="text" name="yearOfExperience" className="form-control" />
                  <ErrorMessage name="yearOfExperience" component="div" className="text-danger mt-2" />
                </Form.Group>
              </Col>
              <Col xs={12} md={6} className='mb-2'>
                <Form.Group controlId="noticePeriod">
                  <Form.Label className='fw-bold'>Notice Period</Form.Label>
                  <Field type="text" name="noticePeriod" className="form-control" />
                  <ErrorMessage name="noticePeriod" component="div" className="text-danger mt-2" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} md={6} className='mb-2'>
                <Form.Group controlId="city">
                  <Form.Label className='fw-bold'>City</Form.Label>
                  <Field type="text" name="city" className="form-control" />
                  <ErrorMessage name="city" component="div" className="text-danger mt-2" />
                </Form.Group>
              </Col>
              <Col xs={12} md={6} className='mb-2'>
                <Form.Group controlId="zip">
                  <Form.Label className='fw-bold'>Zip</Form.Label>
                  <Field type="text" name="zip" className="form-control" />
                  <ErrorMessage name="zip" component="div" className="text-danger mt-2" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} md={6} className='mb-2'>
                <Form.Group controlId="password">
                  <Form.Label className='fw-bold'>Password</Form.Label>
                  <Field type="password" name="password" className="form-control" />
                  <ErrorMessage name="password" component="div" className="text-danger mt-2" />
                </Form.Group>
              </Col>
              <Col xs={12} md={6} className='mb-2'>
                <Form.Group controlId="confirmPassword">
                  <Form.Label className='fw-bold'>Confirm Password</Form.Label>
                  <Field type="password" name="confirmPassword" className="form-control" />
                  <ErrorMessage name="confirmPassword" component="div" className="text-danger mt-2" />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit" disabled={isSubmitting} className='mb-5'>
              {isSubmitting ? 'Signingup' : 'Signup'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default NewUser;
