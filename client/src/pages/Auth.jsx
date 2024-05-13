import React, {useState} from 'react';
import Container from "react-bootstrap/Container";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import Form from "react-bootstrap/Form"
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import {login, registration} from "../http/userAPI";
import {useDispatch} from "react-redux";
import {setIsAuth, setUser} from "../store/authSlice";

const Auth = () => {
    const dispatch = useDispatch();
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const auth = async () =>{
        try {
            let user;
            if (isLogin) {
                user = await login(email, password);
            }else{
                user = await registration(username, email, password)
            }
            dispatch(setIsAuth(true));
            console.log(user)
            dispatch(setUser(user));
            navigate(MAIN_ROUTE)
        } catch (e){
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    {!isLogin &&
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш username..."
                        type="text"
                        value={username}
                        onChange={e=>setUsername(e.target.value)}
                    />
                    }
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        type="mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div
                        className="d-flex justify-content-between mt-3 pl-3 pr-3 align-items-center"
                    >
                        {isLogin ?
                            <div>
                                Нет аккаунта? <Link to={REGISTRATION_ROUTE}>Зарегистрируйся!</Link>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <Link to={LOGIN_ROUTE}>Войдите!</Link>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                        onClick={auth}>
                            {isLogin ?
                                'Войти' : 'Зарегистрироваться'
                            }
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;