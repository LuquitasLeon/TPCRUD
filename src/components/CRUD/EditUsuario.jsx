import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { HOME } from '../../routes/routes'
import axios from 'axios'

const EditUsuario = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState({ nombre: '', contraseña: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const obtenerUsuario = async () => {
    try {
      const respuesta = await axios.get(`http://localhost:3001/usuario/${id}`)
      setUsuario({
        nombre: respuesta.data.nombre,
        contraseña: respuesta.data.contraseña
      })
      setLoading(false)
    } catch (error) {
      console.log("Error al obtener el usuario: ", error)
      setError("No se pudo cargar el usuario")
      setLoading(false)
    }
  }

  useEffect(() => {
    obtenerUsuario()
  }, [id])

  const manejarCambio = (e) => {
    const { name, value } = e.target
    setUsuario((prev) => ({ ...prev, [name]: value }))
  }

  const manejarSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:3001/usuario/${id}`, {
        nombre: usuario.nombre,
        contraseña: usuario.contraseña
      })
      navigate(HOME)
      console.log("Usuario actualizado con éxito")
    } catch (error) {
      console.log("Error al actualizar el usuario: ", error)
      setError("No se pudo actualizar el usuario")
    }
  }

  if (loading) {
    return (
      <Container className="mt-5">
        <Alert variant="info">Cargando...</Alert>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="outline-primary" onClick={() => navigate(HOME)}>
          Volver a la Lista
        </Button>
      </Container>
    )
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Editar Usuario</h2>
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
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formContraseña">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="text"
            name="contraseña"
            value={usuario.contraseña}
            onChange={manejarCambio}
            placeholder="Ingrese la contraseña"
            required
          />
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}

        <Button variant="primary" type="submit" className="me-2">
          Guardar Cambios
        </Button>
        <Button
          variant="outline-secondary"
          onClick={() => navigate(HOME)}
        >
          Cancelar
        </Button>
      </Form>
    </Container>
  )
}

export default EditUsuario