const path = require('path');
const User = require(path.join(__dirname, '..', 'models', 'user.model'));
const Role = require(path.join(__dirname, '..', 'models', 'role.model'));
const {v4} = require('uuid');
require('dotenv').config();

const createInitialAdmin = async () => {
    try {
        const count = await User.estimatedDocumentCount();

        if(count === 0){
            let userRole = '';
            let adminRole = '';

            const roles = await Role.find({name: {$in: ['user', 'admin']}}, {_id: true});

            if(roles.length > 0){
                userRole = roles[0]._id;
                adminRole = roles[1]._id;
            }else{
                console.log('Roles and membership are not created yet, waiting 5 seconds...');
                console.log('If you see this message for more than 5 seconds, please check your database connection.');

                setTimeout(() => {
                   return createInitialAdmin();
                }, 5000);
            }

            const admin = new User({
                firstName: process.env.INITIAL_ADMIN_FIRSTNAME,
                lastName: process.env.INITIAL_ADMIN_LASTNAME,
                username: process.env.INITIAL_ADMIN_USERNAME,
                cellphone: process.env.INITIAL_ADMIN_CELLPHONE,
                email: process.env.INITIAL_ADMIN_EMAIL,
                password: await User.encryptPassword(process.env.INITIAL_ADMIN_PASSWORD),
                roles: [userRole, adminRole],
                userImage: "https://res.cloudinary.com/syphhy/image/upload/v1672428122/vaporwave-background-vector_hhkdr6.webp",
                locations: []
            });

            await admin.save();
            console.log('Initial admin created.');
        }
    
    } catch (error) {
        console.error(error);
    }
};

module.exports = createInitialAdmin;