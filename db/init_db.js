// code to build and initialize DB goes here
const {
  client,
  dropTables,
  buildTables,
  // other db methods
  createInitialProducts,
} = require('./index');


async function setTables() {
  try {
    client.connect();
		console.log('STARTING TO DROP TABLES')
		await dropTables();
		console.log('STARTING TO BUILD TABLES');
		await buildTables();
		console.log('TABLES BUILT');
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
    await createInitialProducts();
  } catch (error) {
    throw error;
  }
};


setTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
