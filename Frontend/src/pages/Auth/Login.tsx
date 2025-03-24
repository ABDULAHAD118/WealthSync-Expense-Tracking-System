import { ChangeEvent, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null)
  const navigate = useNavigate();
  const handleLogin = (e: any) => {
    e.preventDefault();
    console.log(data);
  }
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">Please enter your detail to login</p>
        <form onSubmit={handleLogin}>
          <Input value={data.email} onChange={(e: ChangeEvent<HTMLInputElement>) => setData({ ...data, email: e.target.value })} type="email" placeholder="john@example.com" label="Email Address" />
          <Input value={data.password} onChange={(e: ChangeEvent<HTMLInputElement>) => setData({ ...data, password: e.target.value })} type="password" placeholder="Min 8 Characters" label="Password" />
          <button type="submit" className="btn-primary mt-4">Login</button>
          <p className="text-xs text-slate-700 mt-4">Don't have an account? <span onClick={() => navigate("/signup")} className="text-primary cursor-pointer">Register</span></p>
        </form>
      </div>
    </AuthLayout>
  )
};

export default Login;
