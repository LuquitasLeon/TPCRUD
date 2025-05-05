import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { HOME, CREAR } from '../routes/routes';
import '../styles/LoginStyle.css';

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [datos, setDatos] = useState([]);

    const GetUsuarios = async () => {
        try {
            const respuesta = await axios.get('http://localhost:3001/usuario');
            setDatos(respuesta.data);
            console.log('Respuesta de la API: ', respuesta.data);
        } catch (error) {
            console.log('Error al obtener los usuarios: ', error);
        }
    };

    useEffect(() => {
        GetUsuarios();
    }, []);

    const Validacion = () => {
        const encontrado = datos.find(
            (element) => user === element.nombre && password === element.contraseña
        );
        if (encontrado) {
            alert('¡Bienvenido!');
            navigate(HOME);
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    };

    const manejarCrearUsuario = () => {
        navigate(CREAR);
    };

    return (
        <Container className="login-container d-flex justify-content-center align-items-center">
            <Card className="login-card shadow">
                <Card.Body>
                    <h2 className="text-center mb-4">Iniciar Sesión</h2>
                    <Form>
                        <Form.Group controlId="formUsuario">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese su usuario"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formContraseña" className="mt-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Ingrese su contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <div className="d-grid gap-2 mt-4">
                            <Button variant="primary" onClick={Validacion}>
                                Iniciar Sesión
                            </Button>
                            <Button variant="secondary" onClick={manejarCrearUsuario}>
                                Crear Cuenta
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;
