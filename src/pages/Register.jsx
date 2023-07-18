import React, {  useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from "formik"
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { RegisterUser } from '../../api/Users/postUser';
import { toast } from "react-hot-toast"
import { Context } from '../main';


const Register = () => {


  const navigate = useNavigate()
  
  const {setLoading,loading}=useContext(Context)


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
    name: "",
    email: "",
    password: ""
  }




  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: Values,
    onSubmit: (values, action) => {
        setLoading(true)
      RegisterUser(values).then((res) => {
        toast.success(res.data.message)
        action.resetForm()
        setLoading(false)
        navigate("/login")
      }).catch((err) => {
        toast.error(err.response.data.message)
        setLoading(false)
        navigate("/register")
      })
    }
  })



  return (
    <>
      <div className="login">
        <section>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder='Enter your name'
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
            />
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

            <input disabled={loading} type="submit" value="Sign up" />
            <h4>Or</h4>
            <Link to="/login">Login</Link>
          </form>
        </section>
      </div>
    </>
  )
}

export default Register