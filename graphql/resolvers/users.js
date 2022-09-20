const User = require('../../models/User')
const { ApolloError} = require('apollo-server-errors');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    Mutation: { 
        async registerUser(_, {registerInput:{username, email, password}}){
            // See if an old user exists with email attempting to register
            const oldUser = await User.findOne({email});
            
            // Throw error if that user exists
            if (oldUser) {
                throw new ApolloError('A user is already registered with the email' + email, 'USER_EXISTS');
            }

            // Encrypt password
            var encryptedPassword = await bcrypt.hash(password, 10);

            // Build mongoose model
            const newUser = new User({
                username: username, 
                email: email.toLowerCase(),
                password: encryptedPassword
            });

            //  Create Json web token (attached to user model)
            // this token attaches to a user and verifies them for the website
            const token = jwt.sign(
                { user_id: newUser._id, email},
                "UNSAFE_STRING", // this strnig is used to hash, should be stored safely elsewhere
                {
                    expiresIn: "2h"
                }
            );

            newUser.token = token;
            // Save our user in MongoDB
            const res = await newUser.save();

            return{
                id: res.id,
                ...res._doc
            };
        },
        async loginUser(_, {loginInput: {email, password} }){
            // See if a user exists with the email
            const user = await User.findOne({email});
            // Check if the entered password equals the encrypted password
            // bycrpyt does magic to compare given password to hashed
            if(user && (await bcrypt.compare(password, user.password)))
            {
            const token = jwt.sign(
                { user_id: user._id, email},
                "UNSAFE_STRING", 
                {
                    expiresIn: "2h"
                }
            );
            user.token = token;
            
            return { 
                id: user.id,
                ...user._doc
            }
            } else {
                
                throw new ApolloError('Incorrect password', 'INCORRECT_PASS');
            }
            

            // Attach token to user model 

            // error if user doesnt exist
        }
    },
    Query: {
        user: (_, {ID}) => User.findById(ID)
    }
}