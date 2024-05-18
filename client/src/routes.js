import {CALENDAR_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, USERPROFILE_ROUTE} from "./utils/consts";
import Profile from "./pages/Profile";
import CalendarPage from "./pages/CalendarPage";
import Main from "./pages/Main";
import Auth from "./pages/Auth";

export const authRoutes = [
    {
        path: USERPROFILE_ROUTE,
        Component: Profile
    },
    {
        path: CALENDAR_ROUTE,
        Component: CalendarPage
    },
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]