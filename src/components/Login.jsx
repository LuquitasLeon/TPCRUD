import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { HOME } from '../routes/routes'

const Login = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [datos, setDatos] = useState([])

    const GetUsuarios = async () => {
        try {
            const respuesta = await axios.get("http://localhost:3001/usuario");
            setDatos(respuesta.data);
            console.log("Respuesta de la API: ", respuesta.data);
        } catch (error) {
            console.log("Error al obtener los usuarios: ", error);
        }
    }

    useEffect(() => {
        GetUsuarios()
    }, [])

    const Validacion = () => {
        datos.forEach((element) => {
            if (user === element.nombre && password === element.contraseña) {
                alert("Bienvenido")
                navigate(HOME)
            } 
        })
    }

    return (
        <div>
            <Form>
                <h1>Login Page</h1>
                <Form.Label htmlFor='email' >User: </Form.Label >
                <Form.Control type='text' id='email' placeholder='Enter email' required name='usuario' onChange={(e) => setUser(e.target.value)} />
                <br /> <br />
                <Form.Label htmlFor='password'> Password </Form.Label>
                <Form.Control type='password' id='password' placeholder='Enter password' required name='password' onChange={(e) => setPassword(e.target.value)} />
                <br /> <br />
                <Button onClick={Validacion}> Login </Button>
            </Form>
        </div>
    )
}

export default Login