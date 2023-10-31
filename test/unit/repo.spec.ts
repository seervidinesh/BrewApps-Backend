import * as chai from 'chai';
import { isRight } from 'fp-ts/lib/Either';
import { getTestEnv } from '../env/testEnvironment';
import { seed } from '../../seeds/seed';

// import repo
import * as UserRepo from '../../src/user/repo';
import * as BookRepo from '../../src/books/repo';

const expect = chai.expect;

describe('User repo', async () => {
  let testEnv;
  let server;
  beforeEach(async () => {
    testEnv = await getTestEnv();
    server = testEnv.server;
    await testEnv.resetDB();
    await seed();
  });
  it('Fetch user by phone number', async () => {
    const result = await UserRepo.getUserByPhone('7014966641');
    expect(result._tag).to.be.eql('Right');
    if(isRight(result)) {
      expect(result.right.name).to.be.eql('Admin 01');
      expect(result.right.roles).to.be.eql(['ADMIN']);
      expect(result.right.phone).to.be.eql('7014966641');
    }
  });
});

describe('Books repo', async () => {
  let testEnv;
  let server;
  beforeEach(async () => {
    testEnv = await getTestEnv();
    server = testEnv.server;
    await testEnv.resetDB();
    await seed();
  });
  it('Fetch all books', async () => {
    const result = await BookRepo.fetchAllBooks();
    expect(result._tag).to.be.eql('Right');
    if(isRight(result)) {
      expect(result.right.length).to.be.eql(2);
      expect(result.right[0].name).to.be.eql('Book 01');
    }
  });
});