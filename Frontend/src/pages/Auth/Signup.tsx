import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/Input/Input';
import ProfilePhotoSelector from '../../components/Input/ProfilePhotoSelector';

const Signup = () => {
    const [profilePic, setProfilePic] = useState<File | ArrayBuffer | null>(
        null
    );
    const [data, setData] = useState({
        fullName: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log(data);
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
                        setImage={(image) =>
                            setProfilePic(image as File | ArrayBuffer | null)
                        }
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
                </form>
            </div>
        </AuthLayout>
    );
};

export default Signup;
