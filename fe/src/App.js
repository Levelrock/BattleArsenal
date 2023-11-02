import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import ErrorNotFound from './pages/error404/ErrorNotFound';
import ProductDetail from './pages/productDetail/ProductDetail';
import LogIn from './pages/logIn/LogIn';
import ProtectedRoutes from './middleware/protectedRoutes';







const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LogIn />} />
        <Route element={<ProtectedRoutes/>}>
          <Route path='/home' element={<Home />} />
          <Route path='/article/byId/:articleId' element={<ProductDetail />} />
          <Route path='*' element={<ErrorNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

