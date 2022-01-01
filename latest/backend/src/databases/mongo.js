import dotenv from 'dotenv-defaults';
import mongoose from 'mongoose';

dotenv.config();

const dbOptions = "?retryWrites=true&w=majority";

const moneyDataDB = mongoose.createConnection(`${process.env.MONGO_URL}/MoneyData${dbOptions}`);

const playerInventoryDB = mongoose.createConnection(`${process.env.MONGO_URL}/PlayerInventory${dbOptions}`);

export { moneyDataDB, playerInventoryDB };