import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import classNames from 'classnames';
import axios from 'axios';
import Cookies from 'js-cookie';
import Cargo from './Cargo';

function Login() {
  
    let navigate=useNavigate();
    // const[username,setUsername]=useState('');
    // const[password,setPassword]=useState('');


    const formik = useFormik({
        initialValues: {
        username: '',
        password: '',
        },
        validate: (values) => {
        const errors = {};

        if (!values.username) {
            errors.username = 'username is required.';
        }
        if (!values.password) {
            errors.password = 'Password is required.';
        }
        return errors;
        },
        onSubmit: (values) => {
            console.log('happy')
            const { username, password } = values;
            console.log(username);
            axios.post("http://testv6.truckdestino.com/api/Login/KcsDoLogin",{
             UserName:username,
             Password:password,
             Device:'AngularWeb'
     
            })
            .then(response=>{
             const cData={
                 Auth_Token:response.data.Data.Auth_Token,
                 UserName:response.data.Data.UserName,
                 UserId:response.data.Data.UserId,
                 Name:response.data.Data.Name,
                 IsAdmin:response.data.Data.IsAdmin,   
             }
             Cookies.set('name',JSON.stringify(cData))
             console.log(response.data)
             if(response.data.Message==='OK'){
                navigate('/bookings');
             }   
            })
            .catch(error=>{
                if(error.response.status===401){
                    console.error(error.response);
                }
                
            })
        },
    });

    const isFormFieldInvalid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) =>
    isFormFieldInvalid(name) ? (
    <small className="p-error">{formik.errors[name]}</small>
    ) : (
    <small className="p-error">&nbsp;</small>
    );
    const handlePasswordChange = (e) => {
    formik.setFieldValue('password', e.target.value);
     };

    // const login = (e) => {
    //    e.preventDefault();
    //    debugger;
      
     
    //   }
  return (
<div className='container-fluid bg' >
    <div className='row'>
        <Cargo/>
    </div>
    <div className='row mt-5'>
        <form onSubmit={formik.handleSubmit} className="login">
            {/* <h1 style={{ color: 'white', marginTop: '70px' }}>Login</h1> */}
            <span className="p-float-label mt-3">
            <InputText
                 style={{ width:'50vh'}}
                id="username" value={formik.values.username} onChange={formik.handleChange}
                onBlur={formik.handleBlur} className={classNames({ 'p-invalid': isFormFieldInvalid('username') })}/>
                <label htmlFor="username">UserName</label>
            </span>
            {getFormErrorMessage('username')}
        
            <span className="p-float-label mt-3">
            <Password
                
                id="password" value={formik.values.password} onChange={handlePasswordChange}
                onBlur={formik.handleBlur} className={classNames({ 'p-invalid': isFormFieldInvalid('password') })} toggleMask/>
                <label htmlFor="password">Password</label>
            </span>
            {getFormErrorMessage('password')}
        
            <Button label="Login" type="submit" style={{ marginBottom: '70px' ,backgroundColor: 'var(--green-500)',width:'50vh'}}/>
      </form>
            
            

    </div></div>

    
  )
}

export default Login