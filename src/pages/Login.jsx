import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import image from '../assets/login.jpg';
import Button from '../components/ui/button';
import Spinner from '../components/ui/Spinner';
import authService from '../services/auth.service';

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { state, dispatch } = useContext(AuthContext);

    useEffect(() => {
        if (state.user !== null) {
            localStorage.removeItem('loginError');
            navigate('/');
        }
        setError(localStorage.getItem('loginError'));
    }, [state.user]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        localStorage.removeItem('loginError');
        
        if (!user.email || !user.password) {
            setError('Vui lòng điền đầy đủ các mục!');
            setLoading(false);
            return;
        }
    
        try {
            const response = await authService.login(user);
            console.log("here")
            dispatch({ type: 'LOGIN', payload: response.data });
            window.localStorage.setItem("user", JSON.stringify(response.data));
            navigate('/');
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
                localStorage.setItem('loginError', error.response.data.message);
            } else {
                setError('Đã xảy ra lỗi, vui lòng thử lại sau.');
                localStorage.setItem('loginError', 'Đã xảy ra lỗi, vui lòng thử lại sau.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        <Spinner />
    }
    else return (
        <div className="flex flex-row flex-1 items-center justify-evenly ">
            <img src={image} alt="" className='h-[550px] rounded-3xl' />
            <div className='bg-[#FF9A9E] w-[600px] h-[600px] flex flex-col items-center justify-evenly space-y-3 rounded-3xl'>
                <div className="text-black font-bold text-5xl">Đăng nhập</div>
                <div className="flex flex-row w-[400px] space-x-3">
                    <label htmlFor="email">Email</label>
                    <input id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="appearance-none bg-transparent border-b border-black w-full text-black py-1 px-2 leading-tight focus:outline-none placeholder:text-slate-600 text-lg"
                        placeholder="Enter email"
                        aria-label="email"
                        onChange={handleChange} />
                </div>
                <div className="flex flex-row w-[400px] space-x-3">
                    <label htmlFor="password">Mật khẩu</label>
                    <input name='password' className="appearance-none bg-transparent border-b border-black w-full text-black py-1 px-2 leading-tight focus:outline-none placeholder:text-slate-600 text-lg" type="password" placeholder="Enter password" aria-label="password" onChange={handleChange} />
                </div>
                {error && <div className='bg-red-500 rounded-lg py-2 px-4 flex flex-row items-center justify-center text-white text-lg'>{error}</div>}
                <Button text="Đăng nhập" handler={handleLogin} />
            </div>
        </div>
    );
};

export default Login;