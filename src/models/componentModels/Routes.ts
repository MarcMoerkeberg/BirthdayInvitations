export interface RouteDetails {
    Title: string
    Route: string
    IsHiddenRoute: boolean
}


interface IRoute {
    Event: RouteDetails
    Registration: RouteDetails
    Menu: RouteDetails
    Invitation: RouteDetails
    Admin: RouteDetails
    LandingPage: RouteDetails
    Login: RouteDetails
    getNonHiddenRouteDetails(): Array<RouteDetails>
    getHeroButtonsRouteDetails(): Array<RouteDetails>
}

const routes: IRoute = {
    Event: { Title: 'Begivenheder', Route: '/events', IsHiddenRoute: false },
    Registration: { Title: 'Tilmelding', Route: '/registration', IsHiddenRoute: false },
    Menu: { Title: 'Menu', Route: '/menu', IsHiddenRoute: false },
    Invitation: { Title: 'Invitation', Route: '/invitation', IsHiddenRoute: false },
    Admin: { Title: 'Admin', Route: '/adminoverview', IsHiddenRoute: true },
    LandingPage: { Title: '', Route: '/', IsHiddenRoute: true },
    Login: { Title: 'Login', Route: '/login', IsHiddenRoute: true },
    getNonHiddenRouteDetails: getNonHiddenRouteDetails,
    getHeroButtonsRouteDetails: getHeroButtonsRouteDetails
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

function getHeroButtonsRouteDetails(): Array<RouteDetails> {
    var heroBtnDetails: Array<RouteDetails> = []
    heroBtnDetails.push(routes.Invitation)
    heroBtnDetails.push(routes.Registration)
    heroBtnDetails.push(routes.Menu)

    return heroBtnDetails
}

export default routes