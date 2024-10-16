import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { config } from 'dotenv';
import { resolve } from 'path';
import { database } from '../src/database/database';
import { DatabaseActions, DatabaseConfig } from '../src/interface/database.interface';
config({ path: resolve(process.cwd(), '.env.test') });
const INCLUDE_DB_CONNECTION_TESTS = '1';
const dbconfig: DatabaseConfig = { 
  postgresql: {
    host: process.env.TEST_DB_POSTGRESQL_HOST ?? '', 
    password: process.env.TEST_DB_POSTGRESQL_PASSWORD ?? '',
    port: Number(process.env.TEST_DB_POSTGRESQL_PORT ?? 0), 
    username: process.env.TEST_DB_POSTGRESQL_USERNAME ?? '',
    database: process.env.TEST_DB_POSTGRESQL_DATABASE ?? '',
  }
};
describe('Main tests', () => {
    let db: DatabaseActions | null = null;
    beforeAll(async () => {
      db = await database(dbconfig);
    });
    test('1=1', () => {
      expect(1).toBe(1);
    });
    afterAll(async () => {
      await db?.close();
    });
});