import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/Input/Input';
import ProfilePhotoSelector from '../../components/Input/ProfilePhotoSelector';

const Signup = () => {
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [data, setData] = useState({
        fullName: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);
    // const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // let profileimageurl = '';
        if (!data.fullName || !data.email || !data.password) {
            setError('Please fill all the fields');
            return;
        }
        if (!profilePic) {
            setError('Please select a profile picture');
            return;
        }

        console.log(data, profilePic);
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

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Input
                            value={data.fullName}
                            label={'Full Name'}
                            placeholder="Jhon"
                            onChange={(e) =>
                                setData({ ...data, fullName: e.target.value })
                            }
                            type="text"
                        />
                        <Input
                            value={data.email}
                            label={'Email'}
                            placeholder="jhon@example.com"
                            onChange={(e) =>
                                setData({ ...data, email: e.target.value })
                            }
                            type="email"
                        />
                        <div className="col-span-2">
                            <Input
                                value={data.password}
                                label={'Password'}
                                placeholder="Min 8 Characters"
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
