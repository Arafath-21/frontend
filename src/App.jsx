import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import AppRoutes from './utils/AppRoutes'

const App = () => {
  
  const router = createBrowserRouter(AppRoutes)
  return <>
    <RouterProvider router={router}/>
  </>
}

export default App