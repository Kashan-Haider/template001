import { Pool } from "pg";
import { LandingPageData, Image } from "@/types/template";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function query(text: string, params?: unknown[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows;
  } finally {
    client.release();
  }
}

export async function fetchLandingPageData(templateId: string, id: string): Promise<LandingPageData | null> {
  try {
    const rows = await query(`
      SELECT * FROM "LandingPage" 
      WHERE "templateId" = $1 AND id = $2
    `, [templateId, id]);
    
    if (rows.length === 0) return null;
    
    const result = rows[0] as LandingPageData;
    
    return result;
  } catch (error) {
    console.error('Error fetching landing page data:', error);
    return null;
  }
}

export async function fetchImages(landingPageId: string): Promise<Image[]> {
  const rows = await query(`
    SELECT * FROM "Image" 
    WHERE "landingPageId" = $1
    ORDER BY "createdAt" ASC
  `, [landingPageId]);
  
  return rows as Image[];
}

export async function fetchLandingPageWithImages(templateId: string, id: string): Promise<LandingPageData | null> {
  const landingPage = await fetchLandingPageData(templateId, id);
  if (!landingPage) return null;
  
  const images = await fetchImages(landingPage.id);
  return { ...landingPage, images };
}

export async function debugDatabaseContent() {
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
    
    allPages.forEach((page: { id: string; templateId: string; businessName: string }) => {
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
  }
}
