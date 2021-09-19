import express from 'express';
import cors from 'cors';
import MySQLClient from './clients/MySQLClient';
import CONTROLLERS from './controllers';
class Server {
    constructor() {
        // initialising server config
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.init();
    }

    init() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
    }

    async startServer() {
        try {
            // Initialize Controllers
            console.log('startServer :: INITIALISING CONTROLLERS');
            CONTROLLERS.forEach(controller =>  new controller(this.app));
            console.log('startServer :: INITIALISING CONTROLLERS SUCCESSFUL');
            try {
                console.log(`startServer :: SETTING UP DATABASE POOLS`);
                await new MySQLClient().createPool();
                console.log(`startServer ::  DATABASE POOLS SETUP SUCCESSFUL`);
            }
            catch (err) {
                console.log(`ERROR: startServer :: FAILED TO CREATE DATABASE POOLS`);
                throw err;
            }
            this.app.listen(this.port, () => {
                console.log(`Server is running on port ${this.port}`);
            });
        }
        catch (err) {
            console.log(err);
        }
    }
}
export default Server;