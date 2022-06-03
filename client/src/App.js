import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Routes, Route, NavLink } from 'react-router-dom'

import Home from './components/Home/Home'
import Active from './components/Active/Active'
import Completed from './components/Completed/Completed'

const App = () => {
  return (
    <div className='bg-image'>
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <Container>
          <NavLink to='/' className='navbar-brand mx-auto'>Get-It-Done</NavLink>
        </Container>
      </Navbar>

      <Nav variant="tabs" className='justify-content-center mt-3'>
        <Nav.Item>
          <NavLink className='nav-link' to='/'>Home</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink className='nav-link' to='/active'>Active</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink className='nav-link'to='/completed'>Completed</NavLink>
        </Nav.Item>
      </Nav>
  
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/active' element={<Active />} />
        <Route path='/completed' element={<Completed />} />
      </Routes>

    </div>
  )
}

export default App
