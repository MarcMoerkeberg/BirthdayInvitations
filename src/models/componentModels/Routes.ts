export interface RouteDetails {
    Title: string,
    Route: string,
    IsHiddenRoute: boolean
}

export const isRouteDetails = (input: string | RouteDetails) => input.valueOf().hasOwnProperty('Route')

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
    Event: { Title: 'Begivenheder', Route: '/events', IsHiddenRoute: false },
    Registration: { Title: 'Tilmelding', Route: '/registration', IsHiddenRoute: false },
    Menu: { Title: 'Menu', Route: '/menu', IsHiddenRoute: false },
    Details: { Title: 'Detaljer', Route: '/', IsHiddenRoute: false },
    Admin: { Title: 'Admin', Route: '/adminoverview', IsHiddenRoute: true },
    LandingPage: { Title: '', Route: '/', IsHiddenRoute: true },
    Login: { Title: 'Login', Route: '/login', IsHiddenRoute: true },
}

export default Routes