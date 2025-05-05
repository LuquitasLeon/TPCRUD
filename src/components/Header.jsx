import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import '../styles/HeaderStyle.css'

const Header = () => {
  return (
    <Navbar className="custom-header" expand="lg">
      <Container className="justify-content-center">
        <Navbar.Brand className="text-center">🚀 Bienvenido</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;