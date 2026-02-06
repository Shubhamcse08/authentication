import { useState } from "react"
import api from "../services/api"
import { Link, useNavigate } from "react-router-dom"

const Login =()=>{
    const navigate = useNavigate()

    const [form,setForm]=useState({
        email:"",
        password:"",
    })

    const handleChange=(e)=>{
        setForm(
            {
                ...form,
                [e.target.name]: e.target.value
            }
        )
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try {
            const res= await api.post("/auth/login",form);
            alert("Login successfull")

            //save token
            localStorage.setItem("token",res.data.token)

            // 🔥 Redirect to dashboard
            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Error")
        }

    }
    return(
        <div className="flex justify-center items-center h-screen">
        <form className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

            <p>Email</p>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter your email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            <p>Password</p>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />

            <div className="text-right mt-1 mb-6 text-blue-500 text-sm">
              <Link to="/register" >
                Create an account
              </Link>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
        </form>
        </div>
    )
}

export default Login;