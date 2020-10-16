const db = require('../database/dbConfig.js');

module.exports = {
    addUser,
    findById
}

async function addUser(user) {
    try {
        const id = await db("users").insert(user);
        return findById(id[0]);
    } catch (error) {
        throw error;
    }
}

function findById(id) {
    return db("users").where({ id }).first();
  }