require('dotenv').config();
const createApp = require('./app');

const PORT = process.env.PORT || 4000;

createApp()
  .then((app) => {
    app.listen(PORT, () => {
      console.log(`🚀 GraphQL API running at http://localhost:${PORT}/graphql`);
    });
  })
  .catch((err) => {
    console.error('Erro ao iniciar o servidor:', err);
  });
