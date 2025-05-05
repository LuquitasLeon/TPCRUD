import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'

const CrearUsuario = () => {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState({ nombre: '', contraseña: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const manejarCambio = (e) => {
    const { name, value } = e.target
    setUsuario((prev) => ({ ...prev, [name]: value }))
  }

  const manejarSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await axios.post("http://localhost:3001/usuario", {
        nombre: usuario.nombre,
        contraseña: usuario.contraseña
      })
      console.log("Usuario creado con éxito")
      navigate(-1)
    } catch (error) {
      console.log("Error al crear el usuario: ", error)
      setError("No se pudo crear el usuario")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Container className="mt-5">
        <h2 className="text-center mb-4">Crear Usuario</h2>
        <Form onSubmit={manejarSubmit}>
          <Form.Group className="mb-3" controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={usuario.nombre}
              onChange={manejarCambio}
              placeholder="Ingrese el nombre"
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContraseña">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="contraseña"
              value={usuario.contraseña}
              onChange={manejarCambio}
              placeholder="Ingrese la contraseña"
              required
              disabled={loading}
            />
          </Form.Group>

          {error && <Alert variant="danger">{error}</Alert>}

          <Button
            variant="primary"
            type="submit"
            className="me-2"
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear"}
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            Cancelar
          </Button>
        </Form>
      </Container>
    </div>
  )
}

export default CrearUsuario