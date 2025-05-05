import React from 'react'
import '../styles/FooterStyle.css';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-names left">
        <span>Lucas Ismael Leon</span>
        <span>Juan Manuel Agostino</span>
        <span>Luciano Llanos</span>
      </div>

      <div className="footer-center">
        <h3> CRUD </h3>
      </div>

      <div className="footer-names right">
        <span>Christian Diaz</span>
        <span>Francisco Palacios</span>
        <span>Nicolas Ferreyra</span>
      </div>
    </footer>
  )
}

export default Footer