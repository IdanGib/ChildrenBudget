import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { config } from 'dotenv';
import { resolve } from 'path';
import { ChildrenBudget } from '../src/interface/children-budget.interface';
import { childrenBudgetApplication } from '../src/app';

config({ path: resolve(process.cwd(), '.env.test') });
const postgresql = {
  host: process.env.TEST_DB_POSTGRESQL_HOST ?? '', 
  password: process.env.TEST_DB_POSTGRESQL_PASSWORD ?? '',
  port: Number(process.env.TEST_DB_POSTGRESQL_PORT ?? 0), 
  username: process.env.TEST_DB_POSTGRESQL_USERNAME ?? '',
  database: process.env.TEST_DB_POSTGRESQL_DATABASE ?? '',
}
describe('Main tests', () => {
    let app: ChildrenBudget | null = null;
    beforeAll(async () => {
      app = await childrenBudgetApplication({ postgresql });
    });
    test('App defined', () => {
      expect(app).toBeDefined();
    });
    test('App not null', () => {
      expect(app).not.toBeNull();
    });
    afterAll(async () => {
      await app?.close();
    });
});