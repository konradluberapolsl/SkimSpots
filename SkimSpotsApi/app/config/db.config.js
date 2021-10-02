module.exports = {
    HOST: "mysql-db",
    USER: "root",
    PASSWORD: "root",
    DB: "SkimSpotsDB",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};