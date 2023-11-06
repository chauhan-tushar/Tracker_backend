import "express-async-errors";

export const errorHandlerMiddleware = (error, req, res, next) => {
    if(error && error?.details) { // Error of Joi
        let err = {};
        error.details.forEach((el) => {
            let key = el.path.join('_');
            err[key] = el.message;
        });

        res.status(400).json({ error: err });
    } else if(error.errors) { // Error of mongoose validator
        let err = {};
        Object.keys(error.errors).forEach(e => {
            err[e] = error.errors[e].message;
        });

        res.status(400).json({ error: err });
    } else if(error.code == 11000 && error.keyValue && Object.keys(error.keyValue).length > 0) {
        // Mongodb Unique Validation
        let err = {};
        Object.keys(error.keyValue).forEach(e => {
            err[e] = e + ' is already exists.';
        });

        res.status(400).json({ error: err });
    } else {
        res.status(error.status || 500).json({ message: error.message });
    }
}