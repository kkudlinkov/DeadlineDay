import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {check} from "./http/userAPI";
import {setIsAuth, setUser} from "./store/authSlice";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

function App() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token'); // or however you store your JWT token
        if (token) {
            setTimeout(async () => {
                try {
                    const data = await check();
                    dispatch(setIsAuth(true));
                    dispatch(setUser(data));
                    console.log(data)
                } catch (error) {
                    // Handle error here, e.g. log user out
                    dispatch(setIsAuth(false));
                } finally {
                    setLoading(false);
                }
            }, 1000);
        } else {
            // Handle case when user is not logged in
            dispatch(setIsAuth(false));
            setLoading(false);
        }
    }, [dispatch]);

    if (loading) {
        return <Button
            className="gap-2 d-flex align-items-center"
            variant="primary" disabled>
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            Loading...
        </Button>
    }

    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
