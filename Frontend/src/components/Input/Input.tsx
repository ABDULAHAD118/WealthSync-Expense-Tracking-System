import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

interface InputProps {
    value: string;
    onChange: (e: any) => void;
    placeholder: string;
    label: string;
    type: string;
}
const Input = (props: InputProps) => {
    const { value, onChange, placeholder, label, type } = props;
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    }
    return (
        <div>
            <label className='text-[13px] text-slate-800'>{label}</label>
            <div className='input-box'>
                <input type={type == "password" ? showPassword ? 'text' : 'password' : type} placeholder={placeholder} className='w-full bg-transparent outline-none' value={value} onChange={onChange} />
                {type === "password" && (
                    <>
                        {showPassword ? <FaRegEye size={22} onClick={togglePassword} className='text-primary cursor-pointer' /> : <FaRegEyeSlash size={22} onClick={togglePassword} className='text-slate-400 cursor-pointer' />}
                    </>
                )}
            </div>
        </div>
    )
}

export default Input