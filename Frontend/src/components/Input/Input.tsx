import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { InputProps } from '../../Types';

const Input = (props: InputProps) => {
    const { value, onChange, placeholder, label, type } = props;
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div>
            <label className="text-[13px] text-slate-800">{label}</label>
            <div className="input-box">
                <input
                    type={
                        type == 'password'
                            ? showPassword
                                ? 'text'
                                : 'password'
                            : type
                    }
                    placeholder={placeholder}
                    className="w-full bg-transparent outline-none"
                    value={value}
                    onChange={onChange}
                    required
                />
                {type === 'password' && (
                    <>
                        {showPassword ? (
                            <FaRegEye
                                size={22}
                                onClick={togglePassword}
                                className="text-primary cursor-pointer"
                            />
                        ) : (
                            <FaRegEyeSlash
                                size={22}
                                onClick={togglePassword}
                                className="cursor-pointer text-slate-400"
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Input;
