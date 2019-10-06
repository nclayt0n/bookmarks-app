require('dotenv').config();
module.exports = {
    API_ENDPOINT: process.env.API_ENDPOINT || "https://immense-tundra-83433.herokuapp.com/api/bookmarks",
    API_KEY: process.env.API_KEY || `$2a$10$ra1z0n2XnSnbMP/ipTMHeOqqrI7i8Rssm/z8MHTxgb7LamV7LpfXu`,
}