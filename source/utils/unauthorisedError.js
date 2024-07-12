const AppError = require('./appError');

class UnAuthorisedError extends AppError {
    constructor() {
          
             super (`User is not authorised ` , 401);
    }
}


module.exports = UnAuthorisedError;