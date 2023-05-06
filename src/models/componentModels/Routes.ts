export interface RouteDetails {
    Title: string
    Route: string
    IsHiddenRoute: boolean
    Icon: string | undefined
}


interface IRoute {
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
    Registration: { Title: 'Tilmelding', Route: '/registration', IsHiddenRoute: false, Icon: 'mdi-account-plus' },
    Menu: { Title: 'Menu', Route: '/menu', IsHiddenRoute: false, Icon: 'mdi-silverware-fork-knife' },
    Invitation: { Title: 'Invitation', Route: '/invitation', IsHiddenRoute: false, Icon: undefined },
    Admin: { Title: 'Admin', Route: '/adminoverview', IsHiddenRoute: true, Icon: undefined },
    LandingPage: { Title: 'landing-page', Route: '/:familyId?', IsHiddenRoute: true, Icon: undefined },
    Login: { Title: 'Login', Route: '/login', IsHiddenRoute: true, Icon: undefined },
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