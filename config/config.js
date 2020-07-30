// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 4000;


// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============================
//  Vencimiento del Token
// ============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


// ============================
//  SEED de autenticación
// ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ============================
//  Base de datos
// ============================
let urlDB;
//DB_MONGO=mongodb+srv://damian:MI0E1zcZXQP20IwK@cluster0-naamb.mongodb.net/merntasks
if (process.env.NODE_ENV === 'dev') {
   urlDB = 'mongodb+srv://damian:MI0E1zcZXQP20IwK@cluster0-naamb.mongodb.net/merntasks';
} else {
urlDB = 'mongodb+srv://damian:MI0E1zcZXQP20IwK@cluster0-naamb.mongodb.net/merntasks';
}
process.env.URLDB = urlDB;