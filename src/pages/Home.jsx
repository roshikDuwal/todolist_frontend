import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { DeleteTask, PostTask, UpdateTask } from '../../api/tasks/postTask'
import { Context } from '../main'
import { toast } from 'react-hot-toast'
import { GetTask } from '../../api/tasks/getTask'
import { FallingLines } from 'react-loader-spinner'
import { Navigate, useNavigate } from 'react-router-dom'
import Todolist from '../components/Todolist'
import axios from 'axios'

const Home = () => {

  const { loading, setLoading, isAuthenticated, setIsAuthenticated } = useContext(Context)

  const [task, setTask] = useState([])
  const [refresh, setRefresh] = useState(false)

  const navigate = useNavigate()



  const Values = {
    title: "",
    description: ""
  }


  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: Values,
    onSubmit: (values, action) => {
      setLoading(true)
      PostTask(values).then((res) => {
        toast.success(res.data.message)
        action.resetForm()
        setRefresh(prev => !prev)
        setLoading(false)
      }).catch((err) => {
        toast.error(err.response.data.message)
        setLoading(false)
        navigate("/")
      })
    }
  })


  const gettask = async (e) => {

    setLoading(true)
    try {
      const data = await GetTask()
      setLoading(false)
      setTask(data.data.task)
      setIsAuthenticated(true)
    } catch (err) {
      toast.error(err.response.data.message)
      setLoading(false)
      setIsAuthenticated(false)
    }
  }

  const updatehandler = async (id) => {
    try {
      const {data}=await UpdateTask(id)
      toast.success(data.message);

      setRefresh(prev => !prev)
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  const deletehandler = async (id) => {
    setLoading(true)
    try {
      const { data } = await DeleteTask(id)
      toast.success(data.message)
      setLoading(false)
      setRefresh(prev => !prev)
    } catch (err) {
      setLoading(false)
      toast.error(err.response.data.message)
    }
  }

  useEffect(() => {
    gettask()

  }, [refresh])


  if (!isAuthenticated) return <Navigate to={"/login"} />

  return (
    <>
      <div className="container">
        <div className="taskform">
          <section>
            <form onSubmit={handleSubmit}>

              <input type="text" name="title" placeholder='Enter your title'
                value={values.title}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              <input type="text" name="description" placeholder='Enter your description'
                value={values.description}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              <input disabled={loading} type="submit" value="Add task" />
            </form>
          </section>

        </div>

        <section className="todosContainer">
          {loading ?
            <>
              <FallingLines
                color="#4fa94d"
                width="100"
                visible={true}
                ariaLabel='falling-lines-loading'
              />
            </> :

            <>
              {task.map((curElem) => (
                <Todolist key={curElem._id} title={curElem.title} description={curElem.description}
                  isCompleted={curElem.isCompleted}
                  id={curElem._id}
                  updatehandler={updatehandler}
                  deletehandler={deletehandler}
                  loading={loading}
                />
              )
              )}
            </>
          }
        </section>
      </div>
    </>
  )
}

export default Home