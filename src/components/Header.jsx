import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../main'
import { LogoutUser } from '../../api/Users/getUser'
import { toast } from 'react-hot-toast'


const Header = () => {

    const { isAuthenticated,setIsAuthenticated,setLoading,loading} = useContext(Context)

    const navigate=useNavigate()

    const logouthandler=async(e)=>{
        e.preventDefault()
        setLoading(true)
        try{
            await LogoutUser();
            setIsAuthenticated(false)
            setLoading(false)
            navigate("/login")
        }catch(err){
            toast.error(err.response.data.message)
            setLoading(false)
            setIsAuthenticated(true)
        }
    }

    return (
        <>
            <nav className="header">
                <div>
                    <h2>TodoApp</h2>
                </div>
                <article>
                    <Link to={"/"}>Home</Link>

                    <Link to={"/profile"}>Profile</Link>

                    {
                        isAuthenticated ?
                            <button onClick={logouthandler} className="btn" disabled={loading} >LogOut</button>
                            :
                            <>
                                <Link to={"/login"}>Login</Link>
                                <Link to={"/register"}>Register</Link>
                            </>
                    }





                </article>
            </nav>
        </>
    )
}

export default Header