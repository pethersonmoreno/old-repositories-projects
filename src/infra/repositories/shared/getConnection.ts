import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import User from "../entities/User";
import Pokemon from "../entities/Pokemon";

const connectionType: "mongodb" | 'postgres' = process.env.DB_TYPE as any;

let currentConnection: Connection = null;

const getConnection = async(): Promise<Connection>=>{
    if(currentConnection) {
        if(!currentConnection.isConnected){
            await currentConnection.connect()
        }
        return currentConnection;
    }
    const config = {
        type: connectionType,
        host: process.env.DB_HOST as string,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        database: process.env.DB_DATABASE as string,
        entities: [
            User, Pokemon,
        ],
        logging: true,
    };
    currentConnection = await createConnection(config);
    return currentConnection;
}

export default getConnection;