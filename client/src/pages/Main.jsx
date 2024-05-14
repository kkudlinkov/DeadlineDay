import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import {CALENDAR_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {useSelector} from "react-redux";

const Main = () => {
    const navigate = useNavigate()
    const isAuth = useSelector(state => state.auth.isAuth);

    return (
        <Container fluid className="min-vh-100 d-flex flex-column justify-content-center">
            <Row className="justify-content-center pt-5 pb-5">
                <Col xs={12} md={8} lg={6}>
                    {/*<Image src="logo.png" alt="BlackboxAI Task Planner" className="mb-4" />*/}
                    <h1 className="text-center mb-4">Добро пожаловать на DeadLineDay!</h1>
                    <Row className="align-items-center pb-5">
                        <Col xs={12} md={5}>
                            <Image
                                src="https://static.tildacdn.com/tild3234-3937-4831-b938-616332623437/skripty-tilda.png"
                                alt="Deadline Day" className="img-fluid"/>
                        </Col>
                        <Col xs={12} md={7}>
                            <p className="fs-5">
                                DeadLineDay это мощный инструмент управления задачами, который поможет вам уложиться в
                                установленные сроки и больше никогда не пропустить ни одной задачи.
                            </p>
                        </Col>
                    </Row>
                    <Row className="align-items-center pb-5">
                        <Col xs={12} md={8}>
                            <p className="fs-5">
                                С помощью нашего приложения вы можете легко создавать свои задачи и управлять ими,
                                устанавливать напоминания и отслеживать прогресс. Наш интуитивно понятный интерфейс
                                позволяет легко упорядочивать ваши задачи по дате, приоритету и категории. Кроме того,
                                наш встроенный календарь дает вам четкое представление о предстоящих сроках выполнения.
                            </p>
                        </Col>
                        <Col xs={12} md={4}>
                            <Image src="https://www.sportiko.ru/wp-content/uploads/2021/04/spisok-2048x1846.jpg"
                                   alt="Deadline Day" className="img-fluid"/>
                        </Col>
                    </Row>
                    <p className="text-center mb-4 fs-3">Присоединяйся к нам сегодня, и начни управлять своей работой
                        более
                        эффективно!</p>
                    <Button onClick={
                        isAuth ? () => navigate(CALENDAR_ROUTE) : () => navigate(LOGIN_ROUTE)

                    } variant="primary" size="lg" className="mx-auto d-block">Начать</Button>

                    <h3 className="text-center pt-5 mb-4">Нас выбирают потому что:</h3>
                    <ul className="fs-5">
                        <li>Мы предоставляем удобный и понятный интерфейс</li>
                        <li>Устанавливай четкие сроки выполнения задач и отслеживай их соблюдение.</li>
                        <li>Приоритезируй задачи и фокусируйся на самых важных.</li>
                        <li>Визуализируй свой прогресс и выявляй области для улучшения.</li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
};

export default Main;