import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import DetailsPage from '../Pages/DetailsPage'
import SearchResultPage from '../Pages/SearchResultPage'

const AllRoutes = () => {
  return (
    <>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/search/:q" element={<SearchResultPage />} />
            
            <Route path='/:id' element={<DetailsPage/>}/>
        </Routes>
    </>
  )
}

export default AllRoutes