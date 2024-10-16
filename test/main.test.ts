import { describe, test, expect } from '@jest/globals';
import { config } from 'dotenv';
import { resolve } from 'path';
import { database } from '../src/database/database';
import { DatabaseConfig } from '../src/interface/database.interface';
config({ path: resolve(process.cwd(), '.env.test') });
const INCLUDE_DB_CONNECTION_TESTS = '1';

describe('Main tests', () => {
    if (process.env.TEST_INCLUDE_DB_CONNECTION_TESTS === INCLUDE_DB_CONNECTION_TESTS) {
      describe('Test db', () => {
        test('1. Test Postgresql client init: Fail', async () => {
          const config: DatabaseConfig = {
            postgresql: {
              host: '',
              password: '',
              port: 0,
              username: '',
              database: '',
            }
          }
          const db = await database(config);
          expect(db).toBe(null);
          await db?.close();
        });
        test('2. Test Postgresql client init: Success', async () => {
          const config: DatabaseConfig = { 
            postgresql: {
              host: process.env.TEST_DB_POSTGRESQL_HOST ?? '', 
              password: process.env.TEST_DB_POSTGRESQL_PASSWORD ?? '',
              port: Number(process.env.TEST_DB_POSTGRESQL_PORT ?? 0), 
              username: process.env.TEST_DB_POSTGRESQL_USERNAME ?? '',
              database: process.env.TEST_DB_POSTGRESQL_DATABASE ?? '',
            }
          };
          const db = await database(config);
          expect(db).not.toBe(null);
          await db?.close();
        });
      });
    }
    describe('Test utils', () => {
      test('1. Test 1 = 1', () => {
        expect(1).toBe(1);
      });
    });

});