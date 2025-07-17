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
import RootLayouts from './layouts/RootLayouts';
import Message from './pages/Message';
import Notification from './pages/Notification';
import Settings from './pages/Settings';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    
    <Route path='/' element={<Registration/>}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path='/pages' element={<RootLayouts/>}>
        <Route path='home' element={<Home/>}></Route>
        <Route path='messages' element={<Message/>}></Route>
        <Route path='notification' element={<Notification/>}></Route>
        <Route path='settings' element={<Settings/>}></Route>
    </Route>
    
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