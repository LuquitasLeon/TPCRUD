import React from 'react'
import TablaCliente from '../components/CRUD/TablaCliente'
import Header from '../components/Header'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <div>
        
        <Header />
        <TablaCliente />
        <Footer />

    </div>
  )
}

export default HomePage