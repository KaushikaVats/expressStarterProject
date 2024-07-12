 const {findUser , createUser} = require('../repositories/userRepository')
 const {createcart} = require('../repositories/cartRepository')
 
 async  function registerUser(userDetails){
    console.log("Hitting service layer")
        const user = await findUser({
            email: userDetails.email,
            mobileNumber: userDetails.mobileNumber
        });
      
        if(user) {
            throw{reason : 'User with given mobile number and email already exists' ,statusCode:400}
        }
          const newUser = await createUser({
            email: userDetails.email,
            password : userDetails.password,
            firstName: userDetails.firstName,
            lastName : userDetails.lastName,
            mobileNumber: userDetails.mobileNumber
          });
        
          if(!newUser) {
             throw{reason :'Something went wrong cannot create user' , statusCode:500}
          }
          await createcart(newUser._id);
          return newUser;
    }

module.exports =  {
    registerUser
}