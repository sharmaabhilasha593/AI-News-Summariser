import React, { useState ,useEffect } from 'react'
import { assets } from '../../assets/assets'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/Storecontext'
import './Navbar.css'
import { useContext } from 'react'
const Navbar = () => {
    const [menu,setmenu]=useState("home");
    const [navsearch,setnavsearch]=useState(false);  //to display input for search on clicking on icon
    const [sidebarOpen, setSidebarOpen] = useState(false);
   
  const {carttotal,token,settoken,setshowlogin}=useContext(StoreContext)
   useEffect(()=>{
      setmenu("home");
    },[token])
    const navigate=useNavigate();
    const logout=()=>{
      localStorage.removeItem("token");
      settoken("");
      navigate("/")
    }

     useEffect(() => {
    const path = location.pathname;
    if (path === "/") setmenu("home");
    else if (path.includes("finance")) setmenu("finance");
    else if (path.includes("sports")) setmenu("sports");
    else if (path.includes("entertainment")) setmenu("entertainment");
    else if (path.includes("politics")) setmenu("politics");
    else if (path.includes("tech")) setmenu("technology");
  }, []);
  return (

    <div className='navbar'>
        {/* <img src={assets.logo} className='logo' alt="" /> */}
        <Link to="/"><h1>NewsDesk</h1></Link>
      <div className={`navmenu ${navsearch ?'hide' :''} `}>
        <ul>
            <Link to="/" onClick={()=>{setmenu("home")}} className={menu==="home"?"active":""}>Home</Link>
            <Link to="/finance" onClick={()=>{setmenu("finance")}} className={menu==="finance"?"active":""}>Finance</Link>
            <Link to="/sports" onClick={()=>{setmenu("sports")}} className={menu==="sports"?"active":""}>Sports</Link>
            <Link to="/entertainment" onClick={()=>{setmenu("entertainment")}} className={menu==="entertainment"?"active":""}>Entertainment</Link>
            <Link to="/politics" onClick={()=>{setmenu("politics")}} className={menu==="politics"?"active":""}>Politics</Link>
            <Link to="/tech" onClick={()=>{setmenu("technology")}} className={menu==="technology"?"active":""}>Technology</Link>
        </ul>
      </div>
      <div className="navright">
        <div className='navsearch'>
            <input type="text" name="search" className={`inputsearch ${navsearch ? 'show' : ''}`} placeholder="Search..." />
            <img onClick={()=>setnavsearch((prev)=>!prev)}  src={assets.search_icon} alt="" className='search_icon' />
        </div>

        {/* profile dropdown */}
        {
          !token?<button className='btn signin' onClick={()=>{setshowlogin(true)}} >Sign in</button>
          :  <div className="navprofile">
                <img src={assets.profile_icon} alt="" />
                <ul className='navprofiledropdown'>
                    <li onClick={()=>navigate('/profile')}> <img src={assets.user} alt="" /><p >Profile</p></li>
                    <hr />
                    <li onClick={logout}> <img src={assets.logout} alt="" /><p>Logout</p></li>
                </ul>
            </div>
        }
        {/* Hamburger Icon */}
        <img
          src={assets.menu_icon} // add a hamburger icon image in your assets
          alt="menu"
          className="menu_icon"
          onClick={() => setSidebarOpen(true)}
        />
      </div>
       {/* Sidebar Menu */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          {/* logo on sidebar */}
          {/* <img src={assets.logo} alt="" className="sidebar-logo" /> */}
          <h1>NewsDesk</h1>
          <span className="close-btn" onClick={() => setSidebarOpen(false)}>×</span>
        </div>
        <ul>
          <Link to="/" onClick={() => { setmenu("home"); setSidebarOpen(false); }}>Home</Link>
          <Link to="/finance" onClick={() => { setmenu("finance"); setSidebarOpen(false); }}>Finance</Link>
          <Link to="/sports" onClick={() => { setmenu("sports"); setSidebarOpen(false); }}>Sports</Link>
          <Link to="/entertainment" onClick={() => { setmenu("entertainment"); setSidebarOpen(false); }}>Entertainment</Link>
          <Link to="/politics" onClick={() => { setmenu("politics"); setSidebarOpen(false); }}>Politics</Link>
          <Link to="/tech" onClick={() => { setmenu("technology"); setSidebarOpen(false); }}>Technology</Link>
        </ul>
      </div>

      {/* Overlay (when sidebar is open) */}
      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)}></div>}
    </div>
  )
}

export default Navbar
