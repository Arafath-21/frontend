import Login from '../componets/pages/Login/Login';
import Confirm from '../componets/pages/Confirming/Confirm';
import NewUser from '../componets/pages/NewUser/NewUser';
import Dashboard from '../componets/pages/DashBoard/Dashboard';
import Profile from '../componets/pages/Profile/Profile'; 
import ForgotPwd from '../componets/pages/forgotPassword/ForgotPwd';
import ResetPwd from '../componets/pages/resetPwd/ResetPwd';
import { Navigate } from 'react-router-dom';
const AppRoutes = [
    {
        path:'/login',
        element:<Login /> 
    },
    {
        path:'/signup',
        element:<NewUser />
    },
    {
        path:'/confirm/:resetToken',
        element:<Confirm />
    },
    {
        path:'/dashboard',
        element:<Dashboard />
    },
    {
        path:'/profile/:id',
        element:<Profile />
    },
    {
        path:'/forgot',
        element:<ForgotPwd />
    },
    {
        path:'/reset/:resetToken',
        element:<ResetPwd />
    },
    {
        path:'*',
        element: <Navigate to='/login' />
    }
];

export default AppRoutes;