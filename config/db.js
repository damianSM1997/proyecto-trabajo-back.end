const mongoose = require('mongoose');

require('dotenv').config({path: 'variables.env'});

const conectarDB = async() => {
    let urlDB;
    urlDB = 'mongodb+srv://damian:MI0E1zcZXQP20IwK@cluster0-naamb.mongodb.net/merntasks';
    try {
        //await mongoose.connect(process.env.DB_MONGO, {
        await mongoose.connect(urlDB, {            
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('Database conectada');
    } catch (error) {
        console.log(error);
        process.exit(1) //detener la app
    }
}

module.exports = conectarDB;


//const mongoose = require('mongoose');







    // try {
    //     //await mongoose.connect(process.env.DB_MONGO, {
    //     await mongoose.connect(urlDB, {            
    //         useCreateIndex: true,
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //         useFindAndModify: false
    //     });
    //     console.log('Database conectada');
    // } catch (error) {
    //     console.log(error);
    //     process.exit(1) //detener la app
    // }