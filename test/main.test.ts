import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { config } from 'dotenv';
import { resolve } from 'path';
import { ChildrenBudget } from '../src/interface/app.interface';
import { DatabaseActions } from '../src/interface/database.interface';
import { childrenBudgetApplication } from '../src/app';
const envFile = '.env.test';
config({ path: resolve(process.cwd(), envFile) });

const postgresql = {
  host: process.env.TEST_DB_POSTGRESQL_HOST ?? '', 
  password: process.env.TEST_DB_POSTGRESQL_PASSWORD ?? '',
  port: Number(process.env.TEST_DB_POSTGRESQL_PORT ?? 0), 
  username: process.env.TEST_DB_POSTGRESQL_USERNAME ?? '',
  database: process.env.TEST_DB_POSTGRESQL_DATABASE ?? '',
}

describe('Main tests', () => {
    if (process.env.TEST_ENV === 'local') {
      let app: (ChildrenBudget & Omit<DatabaseActions, 'close'>) | null = null;
      beforeAll(async () => {
        app = await childrenBudgetApplication({ postgresql });
      });
      test('App defined', () => {
        expect(app).toBeDefined();
      });
      test('App not null', () => {
        expect(app).not.toBeNull();
      });
      // test('App creation methods', async () => {
      //   const parent = await app?.createParent({});
      //   const pid = parent?.id;
      //   expect(pid).toBeDefined();
      //   const child = await app?.createChild({ parentId: pid! });
      //   const cid = child?.id;
      //   expect(cid).toBeDefined();
      //   expect(child?.parentId).toBe(pid);
      //   const budget = await app?.createBudget({ value: 10, childId: cid!, currency: 'nis' });
      //   const bid = budget?.id;
      //   expect(bid).toBeDefined();
      //   const transaction = await app?.createTransaction({ price: 22, budgetId: bid! });
      //   const tid = transaction?.id;
      //   expect(tid).toBeDefined();
      //   expect(transaction?.budgetId).toBe(bid);
      // });
      // test('Test Update', async () => {
      //   const oldName = 'idan';
      //   const newName = 'idanGib';
      //   const parent = await app?.createParent({ name: oldName });
      //   expect(parent?.name).toBe(oldName);
      //   const updated = await app?.updateParent({ where: { id: parent?.id! }, data: { name: newName } });
      //   expect(updated?.name).toBe(newName);
      // });
      afterAll(async () => {
        await app?.shutdown();
      });
    }
    test('Test: 1=1', () => {
      expect(1).toBe(1);
    })
});