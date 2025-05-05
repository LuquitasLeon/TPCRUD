import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { HOME, LOGIN, CREAR, EDITAR } from './routes/routes'
import './styles/AppStyle.css'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import CrearPage from './pages/CrearUsuarioPage'
import EditarPage from './pages/EditarPage'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={HOME} element={<HomePage />} />
          <Route path={CREAR} element={<CrearPage />} />
          <Route path={`${EDITAR}/:id`} element={<EditarPage />} />
          <Route path={LOGIN} element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
