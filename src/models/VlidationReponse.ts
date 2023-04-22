interface error {
    id: string
    errorMessages: string[] | undefined
}

interface ValidationReponse {
    valid: boolean,
    errors: error[]
}

export default ValidationReponse