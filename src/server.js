require('dotenv').config();

const http = require('http');
const app = require('./app.js');
const dbConnect = require('./db/mongoose.js');

const server = http.createServer(app);
const PORT = 8000;

const startServer = async () => {
    try {
        await dbConnect();

        server.listen(PORT, () => {
            console.log(`Server on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Erreur : ${error.message}`);
        process.exit(1);
    }
};

startServer();