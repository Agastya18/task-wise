
import { Outlet , Navigate} from 'react-router-dom'
import {useAuthStore} from '../zustand/authSlice'
const PrivateRoute = () => {


    const {authUser} = useAuthStore()
  //console.log(userInfo)
 return authUser ? <Outlet/> : <Navigate to="/login"/>
}

export default PrivateRoute