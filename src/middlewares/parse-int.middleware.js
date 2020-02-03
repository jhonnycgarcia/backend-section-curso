module.exports = (req, res, next) => {
    const queryStrings = req.query;
    for (const key in queryStrings) { // Recorrer arreglo
        const length = queryStrings[key].length;
        const isValid = length > 20 ? false : !isNaN(parseInt(queryStrings[key])); // Validar si es int

        if (isValid) { queryStrings[key] = parseInt(queryStrings[key]); }
    }

    req.query = queryStrings;
    next();
}