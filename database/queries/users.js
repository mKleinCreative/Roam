const pgp = require('pg-promise')()
const connectionString = `pg://${process.env.USER}@localhost:5432/roam`
const db = pgp( connectionString )

exports.queries = {
  find: ( name ) => db.one('SELECT * from users WHERE name = $1', [name]),

  findById: ( id ) => db.one('SELECT * from users WHERE id = $1', [id]),

  create: ( name, password ) => 
    db.one('INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *', [name, password])
}