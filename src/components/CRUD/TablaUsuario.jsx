import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Table, Button, Alert } from 'react-bootstrap'
import { EDITAR, CREAR } from '../../routes/routes'
import axios from 'axios'

const TablaUsuario = () => {
  const [datos, setDatos] = useState([])
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)
  const navigate = useNavigate()

  const obtenerUsuarios = async () => {
    try {
      const respuesta = await axios.get("http://localhost:3001/usuario")
      setDatos(respuesta.data)
    } catch (error) {
      console.log("Error al obtener los usuarios: ", error)
    }
  }

  const eliminarUsuario = async (id) => {
    if (!id) {
      return
    }
    try {
      await axios.delete(`http://localhost:3001/usuario/${id}`)
      setDatos(datos.filter((usuario) => usuario.id !== id))
      if (usuarioSeleccionado && usuarioSeleccionado.id === id) {
        setUsuarioSeleccionado(null)
      }
      console.log("Usuario eliminado con éxito")
    } catch (error) {
      console.log("Error al eliminar el usuario: ", error)
    }
  }

  useEffect(() => {
    obtenerUsuarios()
  }, [])

  const manejarVerUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario)
  }

  const manejarVolverLista = () => {
    setUsuarioSeleccionado(null)
  }

  const manejarEditarUsuario = (id) => {
    console.log("Intentando editar usuario con ID:", id)
    if (!id) {

      return
    }
    navigate(`${EDITAR}/${id}`)
  }

  const manejarCrearUsuario = () => {
    navigate(CREAR)
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Lista de Usuarios</h2>
      <Button
        variant="primary"
        className="mb-4"
        onClick={manejarCrearUsuario}
      >
        Crear Usuario
      </Button>
      {usuarioSeleccionado ? (
        <>
          <Button
            variant="outline-primary"
            className="mb-4"
            onClick={manejarVolverLista}
          >
            Volver a la Lista
          </Button>
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Contraseña</th>
                <th className="text-center">Acción</th>
                <th className="text-center">Eliminar</th>
                <th className="text-center">Editar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{usuarioSeleccionado.nombre}</td>
                <td>{usuarioSeleccionado.contraseña}</td>
                <td className="text-center">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => manejarVerUsuario(usuarioSeleccionado)}
                  >
                    Ver
                  </Button>
                </td>
                <td className="text-center">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => eliminarUsuario(usuarioSeleccionado.id)}
                  >
                    Eliminar
                  </Button>
                </td>
                <td className="text-center">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => manejarEditarUsuario(usuarioSeleccionado.id)}
                  >
                    Editar
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </>
      ) : (
        <>
          {datos.length === 0 ? (
            <Alert variant="info" className="text-center">
              No hay usuarios disponibles.
            </Alert>
          ) : (
            <Table striped bordered hover responsive className="shadow-sm">
              <thead className="table-dark">
                <tr>
                  <th>Nombre</th>
                  <th>Contraseña</th>
                  <th className="text-center">Acción</th>
                  <th className="text-center">Eliminar</th>
                  <th className="text-center">Editar</th>
                </tr>
              </thead>
              <tbody>
                {datos.map((usuario, index) => (
                  <tr key={index}>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.contraseña}</td>
                    <td className="text-center">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => manejarVerUsuario(usuario)}
                      >
                        Ver
                      </Button>
                    </td>
                    <td className="text-center">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => eliminarUsuario(usuario.id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                    <td className="text-center">
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => manejarEditarUsuario(usuario.id)}
                      >
                        Editar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </Container>
  )
}

export default TablaUsuario