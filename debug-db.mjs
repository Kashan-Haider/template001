import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Load environment variables
require('dotenv').config();

async function debugDatabaseContent() {
  const { Pool } = await import('pg');
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  async function query(text, params) {
    const client = await pool.connect();
    try {
      const result = await client.query(text, params);
      return result.rows;
    } finally {
      client.release();
    }
  }

  try {
    console.log('🔍 Checking database connection...');
    
    // Test basic connection
    const testQuery = await query('SELECT NOW() as current_time');
    console.log('✅ Database connected successfully at:', testQuery[0]?.current_time);
    
    // Check if LandingPage table exists
    const tableCheck = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'LandingPage'
    `);
    
    if (tableCheck.length === 0) {
      console.log('❌ LandingPage table does not exist');
      return;
    }
    
    console.log('✅ LandingPage table exists');
    
    // Check all landing pages
    const allPages = await query('SELECT id, "templateId", "businessName" FROM "LandingPage"');
    console.log(`📊 Found ${allPages.length} landing pages in database:`);
    
    allPages.forEach((page) => {
      console.log(`  - ID: ${page.id}, Template: ${page.templateId}, Business: ${page.businessName}`);
    });
    
    // Check for specific template
    const specificPage = await query(`
      SELECT * FROM "LandingPage" 
      WHERE "templateId" = $1 AND id = $2
    `, ['premium-corporate-template', 'c0f6f1c7-82d2-4410-92ab-26d6071d5c3c']);
    
    if (specificPage.length > 0) {
      console.log('✅ Found the requested landing page:', specificPage[0].businessName);
    } else {
      console.log('❌ Could not find landing page with templateId: premium-corporate-template and id: c0f6f1c7-82d2-4410-92ab-26d6071d5c3c');
    }
    
  } catch (error) {
    console.error('❌ Database debug failed:', error);
  } finally {
    await pool.end();
  }
}

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
