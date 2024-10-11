import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom";


const Protected = ()=>{
    const authSlice = useSelector((state)=>state.authSlice);
    const {user} = authSlice
   return user ? <Outlet /> : <Navigate to="/login" />

}

export default Protected;