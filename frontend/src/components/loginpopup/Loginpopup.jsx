import { useState } from "react"
import "./Loginpopup.css"
import axios from "axios"
import { useContext } from "react"
import { assets } from "../../assets/assets"
import { StoreContext } from "../../context/Storecontext"
import { ToastContainer, toast } from 'react-toastify';
const Loginpopup = () => {
    const {setshowlogin,url,settoken,token}=useContext(StoreContext)
    
    
    const [currstate,setcurrstate]=useState("Sign Up")
    const [data,setdata]=useState({name:"",email:"",password:""})
    const onchangehandler=(e)=>{
        const name=e.target.name
        const value=e.target.value;
        setdata(data=>({...data,[name]:value}))
    }
    const onsubmithandler=async(e)=>{
        e.preventDefault();
        console.log(data)
        const response = await axios.post(`${url}/user/${currstate==="Login"?"login":"register"}`,data)
        if(response.data.success){
            localStorage.setItem("token",response.data.token)
            settoken(response.data.token)
            toast.success(response.data.message,{autoclose:200})
            setshowlogin(false)
        }
        else{
            toast.error(response.data.message,{autoclose:200})
        }
    }
  return (
    <div className="loginpopup">
        
        <form onSubmit={(e)=>onsubmithandler(e)} className="logincontainer">
            <div className="logintitle">
                <h2>{currstate}</h2>
                <img onClick={()=>setshowlogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="logininputs">
                {currstate==="Login"?
                 <></>
                :<input type="text" onChange={(e)=>onchangehandler(e)} name="name" value={data.name} placeholder="Your name" required />}
                <input type="text" onChange={(e)=>onchangehandler(e)} name="email" value={data.email} placeholder="Your email" required />
                <input type="text" onChange={(e)=>onchangehandler(e)} name="password" value={data.password} placeholder="Password" required/>
            </div>
            <button type="submit" className="submitbtn">{currstate==="Sign Up"?"Create account":"Login"}</button>
            <div className="logincondition">
                <input type="checkbox" name="condition" required/>
                <p>By continuing, I agree to the terms of use & privacy policy</p>
            </div>
            {currstate==="Login"
                ?<p>Create a new account? <span onClick={()=>setcurrstate("Sign Up")} >Click here</span></p>
                :<p>Already have an account? <span onClick={()=>setcurrstate("Login")}>Login here</span></p>
            }
        
        </form>
    </div>
  )
}

export default Loginpopup
