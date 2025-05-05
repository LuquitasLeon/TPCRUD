import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CrearUsuario from '../components/CRUD/CrearUsuario'

const CreateUsuarioPage = () => {
  return (
    <div>
      <Header />
      <CrearUsuario />
      <Footer />
    </div>
  )
}

export default CreateUsuarioPage