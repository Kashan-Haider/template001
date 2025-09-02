import { debugDatabaseContent } from './src/lib/database.js';

async function main() {
  try {
    console.log('Starting database inspection...');
    await debugDatabaseContent();
  } catch (error) {
    console.error('Debug failed:', error);
  } finally {
    process.exit(0);
  }
}

main();
