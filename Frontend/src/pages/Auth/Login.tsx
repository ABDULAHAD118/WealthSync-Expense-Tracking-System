import { ChangeEvent, useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link } from 'react-router-dom';
import Input from '../../components/Input/Input';
import { validateEmail } from '../../utils/helper';

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);
    // const navigate = useNavigate();
    const handleLogin = (e: any) => {
        e.preventDefault();
        if (!validateEmail(data.email)) {
            setError('Please enter a valid email address');
            return;
        }
        if (!data.password) {
            setError('Password is required');
            return;
        }
        if (data.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }
        setError(null);
        // Perform login logic here
        console.log(data);
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
                        placeholder="Min 8 Characters"
                        label="Password"
                    />
                    {error && (
                        <p className="pb-2.5 text-xs text-red-500">{error}</p>
                    )}
                    <button type="submit" className="btn-primary">
                        Login
                    </button>
                    <p className="mt-3 text-[13px] text-slate-800">
                        Don't have an account?
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
