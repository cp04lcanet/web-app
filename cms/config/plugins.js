// module.exports = () => ({
//     jwt: {
//         secret: process.env.JWT_SECRET,
//     },
// });


module.exports = ({ env }) => ({
    'users-permissions': {
        config: {
            jwt: {
                secret: env('JWT_SECRET'),
            },
        },
    },
});
