import useFamilyStore from "@/stores/family"

export interface RouteDetails {
    Title: string
    Route: string
    Icon: string | undefined
    ShowRoute: () => boolean
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
    Registration: { Title: 'Tilmelding', Route: '/registration', Icon: 'mdi-account-plus', ShowRoute: () => showRoute('Tilmelding') },
    Menu: { Title: 'Menu', Route: '/menu', Icon: 'mdi-silverware-fork-knife', ShowRoute: () => showRoute('Menu') },
    Invitation: { Title: 'Invitation', Route: '/invitation', Icon: undefined, ShowRoute: () => showRoute('Invitation') },
    Admin: { Title: 'Admin', Route: '/adminoverview', Icon: undefined, ShowRoute: () => showRoute('Admin') },
    LandingPage: { Title: 'LandingPage', Route: '/', Icon: undefined, ShowRoute: () => showRoute('LandingPage') },
    Login: { Title: 'Login', Route: '/login', Icon: undefined, ShowRoute: () => showRoute('Login') },
    getNonHiddenRouteDetails: getNonHiddenRouteDetails,
    getHeroButtonsRouteDetails: getHeroButtonsRouteDetails,
}

const isRouteDetails = (input: string | RouteDetails) => input.valueOf().hasOwnProperty('Route')

function getNonHiddenRouteDetails(): Array<RouteDetails> {
    var allNonHiddenRoutes: Array<RouteDetails> = []
    const routePropsAsArray: Array<Array<string | RouteDetails>> = Object.entries(routes)

    routePropsAsArray.forEach(propertyArray => {
        const routeDetails = propertyArray.find(property => isRouteDetails(property)) as RouteDetails

        if (routeDetails && routeDetails.ShowRoute()) {
            allNonHiddenRoutes.push(routeDetails)
        }
    })

    return allNonHiddenRoutes
}

function getHeroButtonsRouteDetails(): Array<RouteDetails> {
    var heroBtnDetails: Array<RouteDetails> = []

    heroBtnDetails.push(routes.Invitation)

    if (routes.Registration.ShowRoute()) {
        heroBtnDetails.push(routes.Registration)
    }
    heroBtnDetails.push(routes.Menu)

    return heroBtnDetails
}

function showRoute(routeTitle: string): boolean {
    const familyStore = useFamilyStore()

    switch (routeTitle) {
        case routes.Admin.Title:
            return false
        case routes.LandingPage.Title:
            return false
        case routes.Login.Title:
            return false
        case routes.Menu.Title:
            return true
        case routes.Invitation.Title:
            return true
        case routes.Registration.Title:
            return familyStore.familyId !== undefined
        default:
            return false;
    }
}

export default routes