const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connexion à MongoDB réussie');
    } catch (error) {
        console.error('Erreur MongoDB :', error.message);
        throw error;
    }
};

module.exports = dbConnect;