import React, { useState } from 'react';
import {Link} from "react-router-dom"
import M from 'materialize-css'


function Signup() {
    const [number,setNumber]=useState()
    const [name,setName]=useState()
    const [password,setPassord]=useState()

    var post=()=>{
        if(!number || !name || !password){
            return M.toast({ html: "please fill all the fields", classes: "#c62828 red darken-3" })
        }
         else if(number.toString().length!=10){
            return M.toast({ html: "enter 10 digit number", classes: "#c62828 red darken-3" })
        }else{
            fetch("/signup", {
                method: "post",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  name,
                  password,
                  number,
                })
              }).then(res => res.json())
                .then(data => {
                  if (data.error) {
                    return M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                  else {
                    return M.toast({ html: "signup successful", classes: "#43a047 green darken-1" })
                    // history.push('/signin')
                  }
                }).catch(error => {
                  console.log(error)
                })
                .catch(error => {
                  console.log(error)
                })
          
        }

    }
    
    return (
    <div>
            <div className="mycard">
        <div className="card auth-card input-field" style={{ boxShadow: "none" }}>
          <h3 style={{ fontFamily: "Helvetica Neue" }}>Join  Twitee today</h3>
          <input
            type="number" placeholder="number"
        value={number}
        onChange={(e)=>setNumber(e.target.value)}
          />
          <input
            type="text" placeholder="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
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
          >signup</button>
          <h5>

          </h5>
        </div>
      </div>
      <Link to="/signin"><h4 style={{ textAlign: "center" }}>Already have an account</h4></Link>


    </div>
  );
}

export default Signup;
