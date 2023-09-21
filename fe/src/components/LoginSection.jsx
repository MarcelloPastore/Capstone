import  axios  from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [loginFormData, setLoginFormData] = useState({})
    const navigate = useNavigate();

    const onSubmit = async(e) => {
        e.preventDefault();
        
        await axios
        .post('http://localhost:6969/login', loginFormData)
        .then((res) => {
            localStorage.setItem('userLoggedIn', JSON.stringify(res.data.token));
        })
        .then(res => navigate('/account'));
    };

    const handleLoginWithGithub = () => {
        window.location.href = 'http://localhost:6969/auth/github';
    }
    
    return (
        <div className='flex flex-col justify-center items-center'>
            <form onSubmit={onSubmit} className='flex flex-column justify-center items-center gap-3'>
                <input 
                    className='p-2 bg-zinc-100 text-black rounded'
                    type="email" name='email' 
                    onChange={(e) => setLoginFormData({
                    ...loginFormData, 
                    email: e.target.value
                    })} 
                />
                <input 
                    className='p-2 bg-zinc-100 text-black rounded'
                    type="password" name='password' 
                    onChange={(e) => setLoginFormData({
                    ...loginFormData, 
                    password: e.target.value
                    })}
                />
                <Button type='submit'> Login </Button>
            </form>
            <Button
             type='submit'
             onClick={handleLoginWithGithub}
            > Login con GitHub </Button>
        </div>
        
      );
}

export default Login