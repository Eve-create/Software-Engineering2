import React, {useState} from 'react'
import '../Styles/LoginRegister.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function LoginRegister() {

    function SwitchContent() {
        const content = document.getElementById('content');
        const registerBtn = document.getElementById('register');
        const loginBtn = document.getElementById('login');

        registerBtn.addEventListener('click', ()  =>{
            content.classList.add("active")
        })
        loginBtn.addEventListener('click', ()  =>{
            content.classList.remove("active")
        })
    }

    const [username,setUsername] = useState([])
    const [email,setEmail] = useState([])
    const [password,setPassword] = useState([])
    const navigate = useNavigate()

    function register(event){
        event.preventDefault()
        axios.post("http://localhost:8081/register",{username,email,password})
        .then(res=>{
            navigate("/home")
        }).catch(err=>console.log(err))
    }

    const [values,setValues] = useState({
        email:'',
        password:''
    })

    function login(event) {
        event.preventDefault();
        axios.post("http://localhost:8081/login",values)
        .then(res=>{
            if(res.data.Status === "Success"){
                navigate("/home")
            }else{
                alert(res.data.Error)
            }
        }).catch(err=>console.log(err))
    }

  return (
    <div className='body-page'>
        <div className='content justify-content-center align-items-center d-flex shadow-lg' id='content'>
            {/* For Registration */}
            <div className='col-md-6 d-flex justify-content-center'>
                <form onSubmit={register}>
                    <div className='header-text mb-4'>
                        <h1>Create Account</h1>
                    </div>
                    <div className='input-group mb-3'>
                        <input 
                            type='text' 
                            placeholder='Name' 
                            className='form-control form-control-lg bg-lignt fs-6' onChange={e =>setUsername(e.target.value)}>
                        </input>
                    </div>
                    <div className='input-group mb-3'>
                        <input 
                            type='email' 
                            placeholder='Email' 
                            className='form-control form-control-lg bg-lignt fs-6' onChange={e =>setEmail(e.target.value)}>
                        </input>
                    </div>
                    <div className='input-group mb-3'>
                        <input 
                            type='password' 
                            placeholder='Password' 
                            className='form-control form-control-lg bg-lignt fs-6' onChange={e =>setPassword(e.target.value)}>
                        </input>
                    </div>
                    <div className='input-group mb-3 justify-content-center'>
                        <button 
                            className='btn border-white text-white w-50 fs-6'>
                                Register
                        </button>
                    </div>
                </form>
            </div>


            {/* For Logging in */}
            <div className='col-md-6 right-box'>
                <form onSubmit={login}>
                    <div className='header-text mb-4'>
                        <h1>Log in</h1>
                    </div>
                    
                    <div className='input-group mb-3'>
                        <input 
                            type='email' 
                            placeholder='Email' 
                            className='form-control form-control-lg bg-lignt fs-6' onChange={e=>setValues({...values,email:e.target.value})}>
                        </input>
                    </div>
                    <div className='input-group mb-3'>
                        <input 
                            type='password' 
                            placeholder='Password' 
                            className='form-control form-control-lg bg-lignt fs-6' onChange={e=>setValues({...values,password:e.target.value})}>
                        </input>
                    </div>
                    <div className='input-group mb-3 justify-content-center'>
                        <button 
                            className='btn border-white text-white w-50 fs-6'>
                                Log in
                        </button>
                    </div>
                </form>
            </div>

            {/* For switching panel */}

            <div className='switch-content'>
                <div className='switch'>
                    <div className='switch-panel switch-left'>
                        <h1>Hello, Again</h1>
                        <p>We are happy to see you back</p>
                        <button className='hidden btn border-white text-white w-50 fs-6' id='login' onClick={SwitchContent}>Log in</button>
                    </div>
                    <div className='switch-panel switch-right'>
                        <h1>Welcome to Lleramart!</h1>
                        <p>A platform that sustains cordilleran weaving traditions.</p>
                        <button className='hidden btn border-white text-white w-50 fs-6' id='register' onClick={SwitchContent}>Register</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default LoginRegister