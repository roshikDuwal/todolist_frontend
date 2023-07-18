import React from 'react'

const Todolist = ({title,description,isCompleted,id,updatehandler,deletehandler,loading}) => {
  return (
    <>
    <div className="todo">
        <div>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
        <div>
            <input onChange={()=>updatehandler(id)} type="checkbox" checked={isCompleted} />
            <button disabled={loading} onClick={()=>deletehandler(id)} className='btn'>Delete</button>
        </div>
    </div>
    </>
  )
}

export default Todolist