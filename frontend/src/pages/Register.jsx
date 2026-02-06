import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
const Register=()=>{
    const navigate =useNavigate();

    const [form,setForm]=useState({
        name:"",
        email:"",
        password:""
    });

    const  handleChange=(e)=>{
        setForm((prev)=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit= async (e) => {
        e.preventDefault();
        try{
            const res = await api.post("/auth/register",form)
            alert(res.data.message);

            // navigate to login
            navigate("/login");
        }
        catch(error){
            alert(error.response?.data?.message || "Error")
        } 
    }
    return(
        <div  className="flex justify-center items-center h-screen">
        <form className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

            <p>Name</p>
            <input
                type="text"
                name="name"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                value={form.name}
                onChange={handleChange}
            />
            <p>Email</p>
            <input
                type="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                value={form.email}
                onChange={handleChange}
            />
            <p>Password</p>
            <input
                type="password"
                name="password"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                value={form.password}
                onChange={handleChange}
            />
            <div className="text-right mt-1 mb-6 text-blue-500 text-sm">
              <Link to="/login">Login to account</Link>
            </div>
            <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            type="submit">Register</button>
        </form>
        </div>
    )
}

export default Register;
