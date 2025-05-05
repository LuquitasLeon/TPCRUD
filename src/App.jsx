import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import { HOME, LOGIN, CREAR, EDITAR, MOSTRAR } from './routes/routes'

import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import CrearPage from './pages/CreateClientePage'
import EditarPage from './pages/EditClientePage'
import VerPage from './pages/VerPage'



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={HOME} element={<HomePage />} />
          <Route path={CREAR} element={<CrearPage />} />
          <Route path={EDITAR} element={<EditarPage />} />
          <Route path={MOSTRAR} element={<VerPage />} />
          <Route path={LOGIN} element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
