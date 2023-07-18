import React, { useContext } from 'react'
import { Context } from '../main'
import { FallingLines } from "react-loader-spinner"


const Profile = () => {

  const { user, loading, isAuthenticated } = useContext(Context)



  return (
    <>
      {
        loading ?
          <div className="profile">
            <FallingLines
              color="#4fa94d"
              width="100"
              visible={true}
              ariaLabel='falling-lines-loading'
            />
          </div>
          :
          <>
            {
              isAuthenticated ?
                <>
                  <div className="profile">
                    <div className="profile-title">
                      <div className='pbody'>
                        <h3>Name</h3>: <p>{user.name}</p>
                      </div>
                      <div className='pbody'>
                        <h3>Email</h3>: <p>{user.email}</p>
                      </div>

                    </div>



                  </div>
                </> :
                <>
                  <div className="profile">
                    <h2>Please Login to get your profile</h2>
                  </div>
                </>
            }
          </>
      }

    </>
  )
}

export default Profile