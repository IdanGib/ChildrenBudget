import { MySqlClient } from '@/database/mysql.client';

const hello = () => {
    const m = new MySqlClient();
    console.log('hello');
}

hello();