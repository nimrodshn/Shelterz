const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/shelterz';

const client = new pg.Client(connectionString);
client.connect();

// initiate db table

const query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, lat INTEGER not null, lon INTEGER not null)');
query.on('end', () => { client.end(); });
