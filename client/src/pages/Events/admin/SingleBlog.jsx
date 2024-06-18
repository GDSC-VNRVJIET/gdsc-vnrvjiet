import React from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
function SingleBlog() {
  let {state} = useLocation();
  return (
    <div>
        <img style={{width:"500px"}} src={state.thumbnail} alt="" />
        <p dangerouslySetInnerHTML={{__html:state.description}}></p>
    </div>
  )
}

export default SingleBlog