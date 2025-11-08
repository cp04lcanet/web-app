module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    //keys: env.array('APP_KEYS'),
    keys: ['yourSecretKey1', 'yourSecretKey2'],
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  admin: {
    auth: {
      secret: env('JWT_SECRET'), // Ensure this matches your .env key
    },
  },
});
