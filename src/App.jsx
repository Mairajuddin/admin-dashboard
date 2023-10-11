import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import  AppRoutes from './routes/AppRoutes.jsx'
import './App.css'
function App() {
  const router=createBrowserRouter(AppRoutes());
    return <RouterProvider router={router} />
}

export default App
