import React, { StrictMode } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Registration from './pages/Registration';
import Home from './pages/Home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    
    <Route path='/' element={<Registration/>}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path='/home' element={<Home/>}></Route>
    </>
  )
);

function App() {
  return (
    <div>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </div>
  )
}

export default App