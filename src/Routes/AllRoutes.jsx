import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import DetailsPage from '../Pages/DetailsPage'

const AllRoutes = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/:id' element={<DetailsPage/>}/>
        </Routes>
    </>
  )
}

export default AllRoutes