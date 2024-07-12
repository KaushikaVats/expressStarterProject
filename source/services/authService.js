const {findUser} = require('../repositories/userRepository')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../config/serverConfig');

async function loginUser(authDetails) {
    const email = authDetails.email;
    const plainPassword = authDetails.password;

    const user = await findUser({email});

    if(!user) {
        throw {message:"no user found with given email id" , statusCode :404};
    }

    const isPasswordValidated = await bcrypt.compare(plainPassword , user.password);

     if(!isPasswordValidated){
        throw {message:'Inavalid password ,please try again' , statusCode:401}

     }

     const userRole = user.role ? user.role : "USER";
     
       const token = jwt.sign({email : user.email , id: user._id, role:userRole }, JWT_SECRET ,
         {expiresIn : JWT_EXPIRY

         });

         return {token ,
            userRole, userData: {
                email: user.email,
                firstName: user.firstName,
            }};

}
module.exports ={
    loginUser
}


