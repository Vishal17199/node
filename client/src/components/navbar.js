import React from 'react';
import { useHistory ,Link} from 'react-router-dom';

function Navbar() {
  const history = useHistory()  

  var jwtcheck = localStorage.getItem("jwt")

  var logout=()=>{
    localStorage.clear()
    history.push('/signin')
  }

  var render=()=>{
    if(jwtcheck){
      return[
        <li><Link to="/private"
        style={{color:"black"}}
        >private chat</Link></li>,
        <li><Link to="/public"
            style={{color:"black"}}
        >public chat</Link></li>,
        <li><Link
            style={{color:"black"}}
        onClick={logout}
            >logout</Link></li>
      ]
    }else{
 return[ <li><Link to="/signup"
 style={{color:"black"}}
>Signup</Link></li>,
<li><Link to="/signin"
 style={{color:"black"}}
>signin</Link></li>]

    }
  }
  
  return (
    <div class="navbar"
  
    >

<nav>
<div class="nav-wrapper">
  <a  class="brand-logo"
  style={{color:"greenyellow"}}
  >&nbsp;&nbsp;&nbsp;Whatsapp</a>
  
  <ul id="nav-mobile" class="right hide-on-med-and-down">
    {render()}
  </ul>


 
</div>
</nav>        
    </div>
  );
}

export default Navbar;

