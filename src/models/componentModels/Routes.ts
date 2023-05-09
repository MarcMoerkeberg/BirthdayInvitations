import useGuestStore from "@/stores/guest"

export interface RouteDetails {
    Title: string
    Route: string
    Icon: string | undefined
    ShowRoute: (isAuthorizedAsAdmin?: boolean) => boolean
}

interface IRoute {
    Registration: RouteDetails
    Menu: RouteDetails
    Invitation: RouteDetails
    Admin: RouteDetails
    LandingPage: RouteDetails
    Login: RouteDetails
    getNonHiddenRouteDetails(isAuthorizedAsAdmin?: boolean): Array<RouteDetails>
    getHeroButtonsRouteDetails(): Array<RouteDetails>
}

const routes: IRoute = {
    Registration: { Title: 'Tilmelding', Route: '/registration', Icon: 'mdi-account-plus', ShowRoute: (isAuthorizedAsAdmin?: boolean) => showRoute('Tilmelding', isAuthorizedAsAdmin) },
    Menu: { Title: 'Menu', Route: '/menu', Icon: 'mdi-silverware-fork-knife', ShowRoute: (isAuthorizedAsAdmin?: boolean) => showRoute('Menu', isAuthorizedAsAdmin) },
    Invitation: { Title: 'Invitation', Route: '/invitation', Icon: undefined, ShowRoute: (isAuthorizedAsAdmin?: boolean) => showRoute('Invitation', isAuthorizedAsAdmin) },
    Admin: { Title: 'Admin', Route: '/adminoverview', Icon: undefined, ShowRoute: (isAuthorizedAsAdmin?: boolean) => showRoute('Admin', isAuthorizedAsAdmin) },
    LandingPage: { Title: 'LandingPage', Route: '/', Icon: undefined, ShowRoute: (isAuthorizedAsAdmin?: boolean) => showRoute('LandingPage', isAuthorizedAsAdmin) },
    Login: { Title: 'Login', Route: '/login', Icon: undefined, ShowRoute: (isAuthorizedAsAdmin?: boolean) => showRoute('Login', isAuthorizedAsAdmin) },
    getNonHiddenRouteDetails: (isAuthorizedAsAdmin?: boolean) => getNonHiddenRouteDetails(isAuthorizedAsAdmin),
    getHeroButtonsRouteDetails: getHeroButtonsRouteDetails,
}


function getNonHiddenRouteDetails(isAuthorizedAsAdmin?: boolean): Array<RouteDetails> {
    var allNonHiddenRoutes: Array<RouteDetails> = []
    const routePropsAsArray: Array<Array<string | RouteDetails>> = Object.entries(routes)

    routePropsAsArray.forEach(propertyArray => {
        const routeDetails = propertyArray.find(property => isRouteDetails(property)) as RouteDetails

        if (routeDetails && routeDetails.ShowRoute(isAuthorizedAsAdmin)) {
            allNonHiddenRoutes.push(routeDetails)
        }
    })

    return allNonHiddenRoutes
}
const isRouteDetails = (input: string | RouteDetails) => input.valueOf().hasOwnProperty('Route')

function getHeroButtonsRouteDetails(): Array<RouteDetails> {
    var heroBtnDetails: Array<RouteDetails> = []

    heroBtnDetails.push(routes.Invitation)

    if (routes.Registration.ShowRoute()) {
        heroBtnDetails.push(routes.Registration)
    }
    heroBtnDetails.push(routes.Menu)

    return heroBtnDetails
}

function showRoute(routeTitle: string, authorizedAdminUser?: boolean): boolean {
    const guestStore = useGuestStore()

    switch (routeTitle) {
        case routes.Admin.Title:
            return !!authorizedAdminUser
        case routes.LandingPage.Title:
            return false
        case routes.Login.Title:
            return false
        case routes.Menu.Title:
            return true
        case routes.Invitation.Title:
            return true
        case routes.Registration.Title:
            return !!guestStore.guestId || !!authorizedAdminUser
        default:
            return false;
    }
}

export default routes