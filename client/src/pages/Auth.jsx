import React from 'react';
import Container from "react-bootstrap/Container";
import {Button, Card, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {REGISTRATION_ROUTE} from "../utils/consts";

const Auth = () => {
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">Авторизация</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        type="mail"
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        type="password"
                    />
                    <Row
                        className="d-flex justify-content-between mt-3 pl-3 pr-3"
                    >
                        <div>
                            Нет аккаунта? <Link to={REGISTRATION_ROUTE}>Зарегистрируйся!</Link>
                        </div>
                        <Button
                            variant={"outline-success"}>
                            Войти
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;