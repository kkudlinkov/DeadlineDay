import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, USERPROFILE_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {useSelector} from "react-redux";

const NavBar = () => {
    const isAuth = useSelector(state => state.auth.isAuth);
    return (
        <Navbar bg="primary" data-bs-theme="dark">
            <Container>
                <Link style={{color:'white'}} to={MAIN_ROUTE}>DeadlineDay</Link>
                <Nav className="ml-auto">
                    {!isAuth && <Link
                        to={LOGIN_ROUTE}
                        variant={"outline-light"}
                        className='p-1'
                        style={{color:'white', textDecoration:'none'}}
                    >Авторизация</Link>}
                    {isAuth && (
                        <>
                            <Link to={USERPROFILE_ROUTE} variant={"outline-light"}>Профиль</Link>
                            <Button variant={"outline-light"}>Выйти</Button>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;