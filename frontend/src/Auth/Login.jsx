import React,{useState} from "react";

const Login=()=>{

        const [email,setEmail]=useState('')
        const [password,setPassword]=useState('')
        const [message,setMessage]=useState('')

        const handleLogin=async(e)=>{
            e.preventDefault()

            const response = await fetch('http://127.0.0.1:5000/list_user');
            const data=await response.json()
            const{users}=data;

            const user=users.find(u=>u.email === email && u.password === password)
    
            if(user){
              localStorage.setItem('user_id',user.id)
                setMessage("Login Successful")
            }
            else{
                setMessage("Invalid Password")
            }
        }
        return (
            <div>
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                <div>
                  <label>Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Password:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Login</button>
              </form>
              {message && <p>{message}</p>}
            </div>
          );
}

export default Login;