export function errorHandler(code: number): true | Error {
    if (code === 400)
        return new Error("Bad Request - the request could not be understood or was missing required parameters.");

    if (code === 403)
        return new Error("Forbidden - access denied.");

    if (code === 404)
        return new Error("Not Found - resource was not found.");

    return true;
}

export function validHandler(param: number): true | Error {
    return isNaN(param) ? new Error(`"${param}" parameter must be a number`) : true;
}
