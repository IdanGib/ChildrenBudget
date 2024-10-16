
import { config as initEnv } from 'dotenv';
initEnv();
const env = process.env;
class Config {}
export const config = new Config();