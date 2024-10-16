import { PostgreSqlClient } from '../src/database/postgresql.client';
import { describe, test, expect } from '@jest/globals';

describe('Test db', () => {
    test('1. Test Postgresql client init: Fail', async () => {
      const postgresql = new PostgreSqlClient();
      const result = await postgresql.init({ 
        host: '', 
        password: '', 
        port: 2, 
        username: '',
        database: '' 
      });
      expect(result).toBe(false);
    });

    test('2. Test Postgresql client init: Success', async () => {
      const postgresql = new PostgreSqlClient();
      const result = await postgresql.init({ 
        host: process.env.TEST_DB_POSTGRESQL_HOST ?? '', 
        password: process.env.TEST_DB_POSTGRESQL_PASSWORD ?? '',
        port: Number(process.env._TEST_DB_POSTGRESQL_PORT ?? 0), 
        username: process.env.TEST_DB_POSTGRESQL_USERNAME ?? '',
        database: process.env.TEST_DB_POSTGRESQL_DATABASE ?? '',
      });
      expect(result).toBe(true);
    });
});