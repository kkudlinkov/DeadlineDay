import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link, useNavigate} from "react-router-dom";
import {CALENDAR_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, USERPROFILE_ROUTE} from "../utils/consts";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {setIsAuth, setUser} from "../store/authSlice";

const NavBar = () => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)

    const logOut = () => {
        dispatch(setIsAuth(false));
        dispatch(setUser({}));
        localStorage.removeItem('token')
    }

    return (
        <Navbar bg="primary" data-bs-theme="dark">
            <Container>
                <Link style={{color: 'white'}} to={MAIN_ROUTE}>DeadlineDay</Link>
                <Nav className="ml-auto gap-4 align-items-center">
                    {!isAuth && <Link
                        to={LOGIN_ROUTE}
                        variant={"outline-light"}
                        className='p-1'
                        style={{color: 'white', textDecoration: 'none'}}
                    >Авторизация</Link>}
                    {isAuth && (
                        <>
                            <Button
                                to={CALENDAR_ROUTE}
                                variant={'outline-info'}
                                onClick={() => navigate(CALENDAR_ROUTE)}>
                                Календарь
                            </Button>
                            <Button
                                to={USERPROFILE_ROUTE}
                                variant={'light'}
                                onClick={() => navigate(USERPROFILE_ROUTE)}>
                                {user.username}
                            </Button>
                            <Button onClick={logOut} variant={"danger"}>Выйти</Button>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;