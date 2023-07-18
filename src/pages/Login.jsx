
import React, {  useContext, useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useFormik } from "formik"
import { LoginUser } from '../../api/Users/postUser';
import { toast } from "react-hot-toast"
import { Context } from '../main';


const Login = () => {


  const navigate = useNavigate()

  const {  setIsAuthenticated,loading,setLoading } = useContext(Context)
  ////EYE SHOW AND HIDE------
  const [passwordType, setPasswordType] = useState("password");

  const togglepassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    } else {
      setPasswordType("password");
      return;
    }
  }

  const Values = {
    email: "",
    password: ""
  }


  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: Values,
    onSubmit: (values, action) => {
      setLoading(true)
      LoginUser(values).then((res) => {
        toast.success(res.data.message)
        action.resetForm()
        setIsAuthenticated(true)
        setLoading(false)
        navigate("/")
      }).catch((err) => {
        toast.error(err.response.data.message);
        setIsAuthenticated(false)
        setLoading(false)
        navigate("/login");
   
      })
    }
  })

  
  return (
    <>
      <div className="login">
        <section>
        <form  onSubmit={handleSubmit}>

            <input type="email" name="email" placeholder='Enter your email'
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
         
             />

            <div>
              <div className="input-container">
                <input className='input'
                  type={passwordType} name="password" autoComplete='off'
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder='Enter your password'
                />

                {passwordType === "password" ? 
                < VisibilityOffIcon onClick={togglepassword} /> : < VisibilityIcon onClick={togglepassword} />}
              </div>
            </div>


            <input disabled={loading}  type="submit" value="Log In" />
            <h4>Or</h4>
            <Link to="/register">Register Now</Link>
          </form>
        </section>
      </div>
    </>
  )
}

export default Login