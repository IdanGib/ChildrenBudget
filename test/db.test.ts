import { PostgreSqlClient } from '../src/database/postgresql.client';
import { describe, test, expect } from '@jest/globals';
import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '.env.test') });
const INCLUDE_DB_CONNECTION_TESTS = '1';

describe('Tests', () => {
    if (process.env.TEST_INCLUDE_DB_CONNECTION_TESTS === INCLUDE_DB_CONNECTION_TESTS) {
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
          const config = { 
            host: process.env.TEST_DB_POSTGRESQL_HOST ?? '', 
            password: process.env.TEST_DB_POSTGRESQL_PASSWORD ?? '',
            port: Number(process.env.TEST_DB_POSTGRESQL_PORT ?? 0), 
            username: process.env.TEST_DB_POSTGRESQL_USERNAME ?? '',
            database: process.env.TEST_DB_POSTGRESQL_DATABASE ?? '',
          };
          console.log(config);
          const result = await postgresql.init(config);
          expect(result).toBe(true);
        });
      });
    }
    describe('Test utils', () => {
      test('1. Test 1=1', () => {
        expect(1).toBe(1);
      });
    });

});