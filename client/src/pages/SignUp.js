import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Audio } from "react-loader-spinner"
import Loader from '../components/Loader';
import Google from '../components/Google';

const SignUp = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { name, email, password, confirmPassword } = values;
      const {data} = await axios.post('/api/v1/users/signup', { name, email: email.toLowerCase(), password, confirmPassword });
      if (data.status==="success") {
        localStorage.setItem('authtoken', true);
        localStorage.setItem("email", email);
        setTimeout(() => {
          toast.success('Signed up', {
            position: 'top-center',
            hideProgressBar: true,
            autoClose: 2000,
          });
        }, 1);
        // console.log(data);

        navigate('/');
        

      }
      
    } catch (err) {

      console.log(err);
      toast.error('email already in use', {
        position: 'top-center',
        hideProgressBar: true,
        autoClose: 2000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="subcontainer">

        <h1 className='title'>Connect with us !!</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label htmlFor="name">Name</label>
                <Field type="text" id="name" name="name" />
                <ErrorMessage name="name" component="div" className="error" style={{ color: "red" }} />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" style={{ color: "red" }} />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage name="password" component="div" className="error" style={{ color: "red" }} />
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field type="password" id="confirmPassword" name="confirmPassword" />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error"
                  style={{ color: "red" }}
                />
              </div>
              <div className="outer">
                <button type="submit" className="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Loader /> : 'Sign Up'}
                </button>
              </div>
              <div>
                Already registered? <Link to="/login">Login</Link>
              </div>
              <Google style={{marginTop:"5px"}}/>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
