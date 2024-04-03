import {toast} from 'react-toastify';
import { Formik,  Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link,useNavigate } from 'react-router-dom';
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes';
import img from './video-call-81.png'
import logo from './logo.png'
import './login.css'

function Login() {
  const navigate = useNavigate()
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      // Use AxiosService to make API call for authentication
      if (values.email && values.password) {
        
        const response = await AxiosService.post(ApiRoutes.LOGIN.path, values,{
          authenticate:ApiRoutes.LOGIN.authenticate
        });
        console.log(response)
        console.log(response.status);
        if(response.status===200)
        {
          sessionStorage.setItem('token',response.data.studentToken)
          sessionStorage.setItem('role',response.data.role)
          sessionStorage.setItem('name',response.data.firstName)
          sessionStorage.setItem('userId',response.data.id)
          toast.success(response.data.message)
          if(response.data.role==='admin')
            navigate('/dashboard')
          else
            navigate(`/profile/${response.data.id}`)
        }
      } else {
        toast.error("Input Email and Password")
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
  };

  return <>
  <div className="bg-img">
    <div className="overlay"></div>
    <p className="bg-content"><span className='h1 fw-bolder'>Welcome to our platform!🙌 </span><br />
    <br />
    <span className='h4 fw-bold'>We are dedicated to providing innovative solutions that empower individuals and businesses to thrive in today's digital world.</span>
    <br /><br />
    <span className='h4 fw-bold'>At Zen, we believe in simplifying complex processes and enhancing user experiences. Our cutting-edge technologies and user-centric approach ensure that our clients achieve their goals efficiently and effectively.</span>
    <br /><br />
    <span className='h4 fw-bold'>Join us on this journey towards success. Explore our services, discover our success stories, and let's embark on a transformative journey together.</span>
    </p>
  </div>

    <div className="container-fluid mt-5 mb-3">
        <div className="d-flex align-items-center justify-content-around h6 logo">
        <img src={logo} alt="" className='img-fluid logo-img' />
        <p className='text-muted fw-bolder quote'>Welcome to the Future!🙌</p>
        </div>
    </div>
    <div className="container">
      <div className="row d-flex align-items-center justify-content-between">
        {/* Form column */}
        <div className="col-md-5">
          <div className="login-content mb-4">
            <h2 className='h1 fw-bolder'>Login Here</h2>
            <p className='h6 fw-bold'>
              New here? Don't worry <Link to="/signup">Sign Up here</Link>
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleLogin(values, { setSubmitting });
            }}         
          >
            {({ errors, touched,handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className='h5'>Email address</Form.Label>
                  <Field type="email" name="email" className={`form-control ${errors.email && touched.email && 'is-invalid'}`} />
                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className='h5'>Password</Form.Label>
                  <Field type="password" name="password" className={`form-control ${errors.password && touched.password && 'is-invalid'}`} />
                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
                </Form.Group>
                <div className="mb-4">
                  <Button variant="primary" type="submit" className='btn'>
                    Login 
                  </Button>
                  <Link to="/forgot" className="btn btn-link ms-2">Forgot Password?</Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        {/* Image column */}
        <div className="col-md-6">
              <img src={img} alt="" className='img-fluid'/>
        </div>
      </div>
    </div>
  </>
}

export default Login;
