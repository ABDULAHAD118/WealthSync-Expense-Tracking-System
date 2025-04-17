import { FormEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/Input/Input';
import ProfilePhotoSelector from '../../components/Input/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import { API_PATH } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';
import { UserContext } from '../../contexts/UserContext';

const Signup = () => {
    const { updateUser } = useContext<any>(UserContext);
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [data, setData] = useState({
        fullName: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!data.fullName || !data.email || !data.password || !profilePic) {
            setError('Please fill all the fields');
            return;
        }
        if (!validateEmail(data.email)) {
            setError('Please enter a valid email address');
            return;
        }
        setError(null);

        try {
            const formData = new FormData();
            formData.append('fullName', data.fullName);
            formData.append('email', data.email);
            formData.append('password', data.password);
            if (profilePic) {
                formData.append('image', profilePic);
            }

            const response = await axiosInstance.post(
                API_PATH.AUTH.REGISTER,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            const { token, user } = response.data;
            if (token) {
                localStorage.setItem('token', token);
                updateUser(user);
                navigate('/dashboard');
            }
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Something went wrong. Please try again later.');
            }
        }
    };
    return (
        <AuthLayout>
            <div className="mt-10 flex h-auto flex-col justify-center md:mt-0 md:h-full lg:w-full">
                <h3 className="text-xl font-semibold text-black">
                    Create an Account
                </h3>
                <p className="mt-[5px] mb-6 text-xs text-slate-700">
                    Join us today by entering your details below.
                </p>
                <form onSubmit={handleSubmit}>
                    <ProfilePhotoSelector
                        image={profilePic}
                        setImage={setProfilePic}
                    />

                    <div className="gap-4 sm:grid md:grid-cols-2">
                        <Input
                            value={data.fullName}
                            label={'Full Name'}
                            placeholder="John"
                            onChange={(e) =>
                                setData({ ...data, fullName: e.target.value })
                            }
                            type="text"
                        />
                        <Input
                            value={data.email}
                            label={'Email'}
                            placeholder="john@example.com"
                            onChange={(e) =>
                                setData({ ...data, email: e.target.value })
                            }
                            type="email"
                        />
                        <div className="col-span-2">
                            <Input
                                value={data.password}
                                label={'Password'}
                                placeholder="Min 6 Characters"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        password: e.target.value,
                                    })
                                }
                                type="password"
                            />
                        </div>
                    </div>
                    {error && (
                        <p className="pb-2.5 text-xs text-red-500">{error}</p>
                    )}
                    <button type="submit" className="btn-primary">
                        Sign Up
                    </button>
                    <p className="mt-3 text-[13px] text-slate-800">
                        Already have an account?
                        <Link
                            to="/login"
                            className="text-primary cursor-pointer font-medium underline"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default Signup;
