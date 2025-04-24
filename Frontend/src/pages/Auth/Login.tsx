import { ChangeEvent, useContext, useState } from 'react';
import AuthLayout from '../../components/Layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPath';
import { UserContext } from '../../contexts/UserContext';
import Spinner from '../../components/Spinner/Spinner';
import toast from 'react-hot-toast';

const Login = () => {
    const { updateUser } = useContext<any>(UserContext);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const handleLogin = async (e: any) => {
        e.preventDefault();
        if (!validateEmail(data.email)) {
            toast.error('Please enter a valid email address');
            return;
        }
        if (!data.password) {
            toast.error('Password is required');
            return;
        }
        if (data.password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }

        try {
            setLoading(true);
            const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
                email: data.email,
                password: data.password,
            });
            const { token, user } = response.data;
            if (token) {
                localStorage.setItem('token', token);
                updateUser(user);
                navigate('/dashboard');
                setLoading(false);
                toast.success(response.data.message);
            }
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something went wrong. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <AuthLayout>
            <div className="flex h-3/4 flex-col justify-center md:h-full lg:w-[70%]">
                <h3 className="text-xl font-semibold text-black">
                    Welcome Back
                </h3>
                <p className="mt-[5px] mb-6 text-xs text-slate-700">
                    Please enter your detail to login
                </p>
                <form onSubmit={handleLogin}>
                    <Input
                        value={data.email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setData({ ...data, email: e.target.value })
                        }
                        type="email"
                        placeholder="john@example.com"
                        label="Email Address"
                    />
                    <Input
                        value={data.password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setData({ ...data, password: e.target.value })
                        }
                        type="password"
                        placeholder="Min 6 Characters"
                        label="Password"
                    />
                    <button type="submit" className="btn-primary">
                        {loading ? (
                            <Spinner
                                width={5}
                                height={5}
                                fillColor="fill-white"
                                screenHeight={true}
                            />
                        ) : (
                            'Login'
                        )}
                    </button>
                    <p className="mt-3 text-[13px] text-slate-800">
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            className="text-primary cursor-pointer font-medium underline"
                        >
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default Login;
