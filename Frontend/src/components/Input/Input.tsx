import React, { useState } from 'react'

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
            <label className=''>{label}</label>
            <div className=''>
                <input type={type == "password" ? showPassword ? 'text' : 'password' : type} placeholder={placeholder} className='' value={value} onChange={onChange} />
            </div>
        </div>
    )
}

export default Input