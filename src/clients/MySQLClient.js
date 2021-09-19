import mysql2 from 'mysql2/promise';

class MySQLClient {
    constructor() {
        this.host = process.env.MYSQL_HOST || 'localhost';
        this.user = process.env.MYSQL_USER || 'hasneet';
        this.password = process.env.MYSQL_PASSWORD || 'hasneet123';
        this.database = process.env.MYSQL_DATABASE || 'branchdb';
        MySQLClient.readPool = null;
        MySQLClient.writePool = null;
    }

    async createPool() {
        try {
            const promises = [this.setupPool(), this.setupPool()];
            const [readPool, writePool] = await Promise.all(promises);
            MySQLClient.readPool = readPool;
            MySQLClient.writePool = writePool;
        }
        catch (err) {
            reject(err.message);
        }
    };

    async setupPool() {
        return new Promise(async (resolve, reject) => {
            const optoins = {
                host: this.host,
                user: this.user,
                password: this.password,
                database: this.database,
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            }
            const readPool = await mysql2.createPool(optoins);
            resolve(readPool);
        })
    }

    static getReadPool() {
        return MySQLClient.readPool;
    }

    static getWritePool() {
        return MySQLClient.writePool;
    }
}
export default MySQLClient;