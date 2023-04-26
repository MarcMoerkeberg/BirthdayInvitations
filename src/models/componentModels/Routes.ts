export interface RouteDetails {
    Title: string
    Route: string
    IsHiddenRoute: boolean
}


interface IRoute {
    Event: RouteDetails
    Registration: RouteDetails
    Menu: RouteDetails
    Details: RouteDetails
    Admin: RouteDetails
    LandingPage: RouteDetails
    Login: RouteDetails
    getNonHiddenRouteDetails(): Array<RouteDetails>
}

const routes: IRoute = {
    Event: { Title: 'Begivenheder', Route: '/events', IsHiddenRoute: false },
    Registration: { Title: 'Tilmelding', Route: '/registration', IsHiddenRoute: false },
    Menu: { Title: 'Menu', Route: '/menu', IsHiddenRoute: false },
    Details: { Title: 'Detaljer', Route: '/', IsHiddenRoute: false },
    Admin: { Title: 'Admin', Route: '/adminoverview', IsHiddenRoute: true },
    LandingPage: { Title: '', Route: '/', IsHiddenRoute: true },
    Login: { Title: 'Login', Route: '/login', IsHiddenRoute: true },
    getNonHiddenRouteDetails: getNonHiddenRouteDetails
}

const isRouteDetails = (input: string | RouteDetails) => input.valueOf().hasOwnProperty('Route')

function getNonHiddenRouteDetails(): Array<RouteDetails> {
    var allNonHiddenRoutes: Array<RouteDetails> = []
    const routePropsAsArray: Array<Array<string | RouteDetails>> = Object.entries(routes)

    routePropsAsArray.forEach(propertyArray => {
        const routeDetails = propertyArray.find(property => isRouteDetails(property)) as RouteDetails

        if (routeDetails && !routeDetails.IsHiddenRoute) {
            allNonHiddenRoutes.push(routeDetails)
        }
    })

    return allNonHiddenRoutes
}

export default routes