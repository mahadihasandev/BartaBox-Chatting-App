import React, { StrictMode } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Registration from './pages/Registration';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    
    <Route path='/' element={<Registration/>}></Route>
    <Route path="/login" element={<Login />}></Route>
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