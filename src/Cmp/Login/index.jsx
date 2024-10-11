import { useState,useEffect } from "react";
import axios from "axios";
import { login, logout } from "../../redux/slices/auth.slice";
import {eraseRemember,setRemember} from "../../redux/slices/remember.slice"
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";


// add proxy when use other origen or free api
// when use fech methood send data use body:{},when use axios send data use data :{}
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.authSlice);
    const remember = useSelector((state) => state.rememerSlice);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        email: remember.email,
        password: remember.password
    })

//     username and password dummy
//    const email = 'emilys';
//    const password = 'emilyspass';


useEffect(()=>{
    setTimeout(()=>{
        setError(null)
    },3000)
},[error])


// api request
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios({
                method: "post",
                url: 'https://dummyjson.com/auth/login',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    username: user.email,
                    password: user.password,

                },
            });
            setError(null)
            setLoading(false);
            dispatch(login(data));
            navigate("/profile")

        } catch (error) {
            setError(error.response.data.message)
            setLoading(false);
            // console.log(error.response?.data || error.message); 
            dispatch(logout());
        }


    }

  // remberMe store email and password in localstorage

  const remberMe = (e)=>{
    if(e.target.checked){
        dispatch(setRemember(user))
    }else{
        dispatch(eraseRemember())
    }
}

// form input value 
    const handleInput = (e) => {
        let input = e.target;
        let key = input.name
        setUser({
            ...user,
            [key]: input.value
        })

        /*
         sec  long hand rol update data
        setUser((oldData)=>{
          return{
              ...oldData,
              [key] : input.value
          }
        })
          */

    }
    return auth.user ? <Navigate to="/profile" /> : (
        <>
            <div className="flex justify-center flex-col gap-y-4 items-center min-h-screen bg-red-50">
                {/* message with wrong credencieal */}
                {
                    error &&

                    <div className="w-96 p-4 bg-red-400 rounded border border-white">
                        <h1 className="text-white font-semibold">{error}</h1>
                    </div>
                }
                <div className="flex flex-col gap-y-4 bg-white rounded-lg shadow-lg w-96 px-8 py-6">
                    <h1 className="text-2xl text-slate-600 font-semibold">Login Form</h1>
                    <form
                        onSubmit={onSubmit}
                        className="flex flex-col gap-y-4">
                        <div className="flex flex-col gap-y-2">
                            <label className="text-slate-600 font-semibold" htmlFor="email">User Name</label>
                            <input className="p-2 border border-slate-200 rounded"
                                name="email"
                                value={user.email}
                                onChange={handleInput}
                                type="text"
                                placeholder="User@gmail.com"
                                required
                                id="email" />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label className="text-slate-600 font-semibold" htmlFor="password">Password</label>
                            <input className="p-2 border border-slate-200 rounded"
                                name="password"
                                value={user.password}
                                type="password"
                                placeholder="******"
                                required
                                onChange={handleInput}
                                id="password" />

                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <div className="flex items-center gap-x-2">
                                <input
                                    disabled={!(user.email && user.password)}
                                    checked={remember.checked}
                                    onChange={(e)=>remberMe(e)}
                                    type="checkbox"
                                    name="remberme"
                                    id="remberme"
                                />
                                <label
                                    onClick={(e) => e.preventDefault()}
                                    className="text-slate-600 font-semibold"
                                    htmlFor="remberme"
                                >Rember Me !</label>
                            </div>

                            {

                                loading ?
                                    <button
                                        className="bg-gray-400 px-6 py-2 text-white font-semibold"
                                        type="submit"
                                        disabled
                                    >Loading...</button>
                                    :
                                    <button
                                        className="bg-indigo-500 px-6 py-2 text-white font-semibold"
                                        type="submit"
                                    >Login</button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default Login;