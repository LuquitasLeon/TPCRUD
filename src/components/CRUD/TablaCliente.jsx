import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const TablaCliente = () => {
  const [datos, setDatos] = useState([])
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)

  const obtenerUsuarios = async () => {
    try {
      const respuesta = await axios.get("http://localhost:3001/usuario");
      setDatos(respuesta.data);
      console.log("Respuesta de la API: ", respuesta.data);
    } catch (error) {
      console.log("Error al obtener los usuarios: ", error);
    }
  }

  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/usuario/${id}`);
      setDatos(datos.filter((usuario) => usuario.id !== id));
      if (usuarioSeleccionado && usuarioSeleccionado.id === id) {
        setUsuarioSeleccionado(null);
      }
      console.log("Usuario eliminado con éxito");
    } catch (error) {
      console.log("Error al eliminar el usuario: ", error);
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

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Usuarios</h2>
      {usuarioSeleccionado ? (
        <>
          <button
            onClick={manejarVolverLista}
            className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Volver a la Lista
          </button>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Nombre</th>
                <th className="border border-gray-300 px-4 py-2">Contraseña</th>
                <th className="border border-gray-300 px-4 py-2">Acción</th>
                <th className="border border-gray-300 px-4 py-2">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{usuarioSeleccionado.nombre}</td>
                <td className="border border-gray-300 px-4 py-2">{usuarioSeleccionado.contraseña}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => manejarVerUsuario(usuarioSeleccionado)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Ver
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => eliminarUsuario(usuarioSeleccionado.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Nombre</th>
              <th className="border border-gray-300 px-4 py-2">Contraseña</th>
              <th className="border border-gray-300 px-4 py-2">Acción</th>
              <th className="border border-gray-300 px-4 py-2">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((usuario, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{usuario.nombre}</td>
                <td className="border border-gray-300 px-4 py-2">{usuario.contraseña}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => manejarVerUsuario(usuario)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Ver
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => eliminarUsuario(usuario.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default TablaCliente