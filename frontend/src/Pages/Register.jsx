import { useState } from "react"
import API from "../api/axios"
import { useNavigate } from "react-router-dom"


export default function Register() {

  const [firstName, setFirstName]= useState("")
  const [lastName, setLastName]= useState("")
  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")

  const navigate=useNavigate()

   const handleRegister=async(e)=>{
       e.preventDefault()
       console.log(firstName,lastName,email,password);

       try{

        const {data}= await API.post("/auth/register",{
            firstName,
            lastName,
            email,
            password
        })
        alert(data.message)
        navigate("/verify-otp")

       }catch(error){
        alert(error.response?.data?.message || "registration failed")
       }

   }

    return (
         <>
         <form action="" onSubmit={handleRegister}>
            
              <div>
            <div>
                <label htmlFor="">firstname</label>
                <input type="text"
                placeholder="firstname"
                value={firstName}
                onChange={(e)=>{setFirstName(e.target.value)}} />
            </div>

            <div>
                <label htmlFor="">lastname</label>
                <input type="text"
                 placeholder="lastname"
                value={lastName}
                onChange={(e)=>{setLastName(e.target.value)}} />
            </div>

            <div>
                <label htmlFor="">email</label>
                <input type="email" 
                 placeholder="email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>

            <div>
                <label htmlFor="">password</label>
                <input type="password"
                 placeholder="password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}} />
            </div>

            <div>
                <button type="submit">Register</button>
            </div>
         </div>


         </form>
        
         </>
    )
}