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
        <div className="flex flex-col lg:flex-row flex-1 items-center justify-evenly p-4">
            <img 
                src={image} 
                alt="Login Illustration" 
                className="h-[300px] lg:h-[550px] rounded-3xl object-cover mb-4 lg:mb-0" 
            />
            <div className="bg-[#FF9A9E] w-full lg:w-[600px] max-w-full h-auto lg:h-[600px] flex flex-col items-center justify-evenly space-y-4 rounded-3xl p-6">
                <div className="text-black font-bold text-2xl lg:text-5xl">Đăng nhập</div>
                <div className="flex flex-col w-full lg:w-[400px] space-y-3">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm text-black mb-1">Email</label>
                        <input 
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            className="appearance-none bg-transparent border-b border-black w-full text-black py-1 px-2 leading-tight focus:outline-none placeholder:text-slate-600 text-lg"
                            placeholder="Enter email"
                            aria-label="email"
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-sm text-black mb-1">Mật khẩu</label>
                        <input 
                            name="password"
                            type="password"
                            className="appearance-none bg-transparent border-b border-black w-full text-black py-1 px-2 leading-tight focus:outline-none placeholder:text-slate-600 text-lg"
                            placeholder="Enter password"
                            aria-label="password"
                            onChange={handleChange} 
                        />
                    </div>
                </div>
                {error && (
                    <div className="bg-red-500 rounded-lg py-2 px-4 flex flex-row items-center justify-center text-white text-lg">
                        {error}
                    </div>
                )}
                <Button text="Đăng nhập" handler={handleLogin} />
            </div>
        </div>
    );
    
};

export default Login;