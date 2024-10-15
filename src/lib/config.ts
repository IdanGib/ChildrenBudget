
import { MySqlConfig } from '@/interface/mysql-client.interface';
import { config as initEnv } from 'dotenv';
initEnv();
const env = process.env;
class Config {
    myslqConfig: MySqlConfig = {
        username: env.DB_USERNAME ?? '',
        hostname: env.DB_HOST ?? '',
        port: Number(env.DB_PORT ?? 0),
        password: env.DB_PASSWORD ?? ''
    };
}
export const config = new Config();