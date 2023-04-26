interface RouteDetails {
    Title: string,
    Route: string
}

interface IRoute {
    Event: RouteDetails,
    Registration: RouteDetails,
    Menu: RouteDetails,
    Details: RouteDetails,
    Admin: RouteDetails,
    LandingPage: RouteDetails,
    Login: RouteDetails,
}

const Routes: IRoute = {
    Event: { Title: 'Begivenheder', Route: '/events' },
    Registration: { Title: 'Tilmelding', Route: '/registration' },
    Menu: { Title: 'Menu', Route: '/menu' },
    Details: { Title: 'Detaljer', Route: '/' },
    Admin: { Title: 'Admin', Route: '/adminoverview' },
    LandingPage: { Title: '', Route: '/' },
    Login: { Title: 'Login', Route: '/login' },
}

export default Routes