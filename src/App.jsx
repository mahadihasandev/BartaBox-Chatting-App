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
    <Route path="/" element={<Login />}></Route>
    <Route path='/registration' element={<Registration}></Route>
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