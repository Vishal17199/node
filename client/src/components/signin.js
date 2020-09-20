import React, { useState } from 'react';
import {Link, useHistory} from "react-router-dom"
import M from 'materialize-css'



function Signin() {

  const history = useHistory()
  const [number,setNumber]=useState()
  const [password,setPassord]=useState()

  var post=()=>{
    if(!number || !password){
        return M.toast({ html: "please fill all the fields", classes: "#c62828 red darken-3" })
    }
     else if(number.toString().length!=10){
        return M.toast({ html: "enter 10 digit number", classes: "#c62828 red darken-3" })
    }else{
      fetch("/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          number,
          password
        })
      }).then(res => res.json())
        .then(data => {
          if (data.error) {
          return  M.toast({ html: data.error, classes: "#c62828 red darken-3" })
          }
          else {
            console.log(data)
       localStorage.setItem("jwt", data.token)
           localStorage.setItem("name", data.name)
   //        localStorage.setItem("pic", data.id)
           localStorage.setItem("number", data.number)
           localStorage.setItem("load",true)          
           localStorage.setItem("load2",true)          
            M.toast({ html: "login success", classes: "#43a047 green darken-1" })            
            history.push('/public')
          }
        }).catch((err) => {
          console.log(err)
        })
    }

}


  return (
    <div>
              <div className="mycard">
        <div className="card auth-card input-field" style={{ boxShadow: "none" }}>
          <h3 style={{ fontFamily: "Helvetica Neue" }}>Login in</h3>
          <input
            type="number" placeholder="number"
            value={number}
            onChange={(e)=>setNumber(e.target.value)}
          />
          <input
            type="password" placeholder="password"
            value={password}
            onChange={(e)=>setPassord(e.target.value)}
          />
          <button className="waves-effect waves-light btn #64b5f6 green lighten-2 s6"
            id="signup-button"
            onClick={post} 
            style={{marginLeft:"30px"}}  
          >signin</button>
          <h5>

          </h5>
        </div>
        <Link to="/signup"><h4 style={{ textAlign: "center" }}>create a new account</h4></Link>
      </div>

    </div>
  );
}

export default Signin;
