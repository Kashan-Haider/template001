import { Pool } from "pg";
import { LandingPageData, Image } from "@/types/template";

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Generic query function
export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows;
  } finally {
    client.release();
  }
}

// Fetch Landing Page Data by templateId and id
export async function fetchLandingPageData(templateId: string, id: string): Promise<LandingPageData | null> {
  try {
    // First, check if companyDetails column exists
    const columnCheckSql = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'LandingPage' AND column_name = 'companyDetails'
    `;
    const columnExists = await query(columnCheckSql);
    
    // Build SQL based on whether companyDetails column exists
    const sql = columnExists.length > 0 ? `
      SELECT 
        id,
        "templateId",
        "businessName",
        "githubUrl",
        status,
        content,
        "seoData",
        "themeData",
        "businessData",
        "companyDetails",
        "createdAt",
        "updatedAt",
        "publishedAt"
      FROM "LandingPage" 
      WHERE "templateId" = $1 AND id = $2
    ` : `
      SELECT 
        id,
        "templateId",
        "businessName",
        "githubUrl",
        status,
        content,
        "seoData",
        "themeData",
        "businessData",
        "createdAt",
        "updatedAt",
        "publishedAt"
      FROM "LandingPage" 
      WHERE "templateId" = $1 AND id = $2
    `;
    
    const rows = await query(sql, [templateId, id]);
    if (rows.length === 0) return null;
    
    const result = rows[0] as LandingPageData;
    
    // If companyDetails column doesn't exist, try to extract from content
    if (!columnExists.length && result.content && (result.content as any).companyDetails) {
      result.companyDetails = (result.content as any).companyDetails;
    }
    
    return result;
  } catch (error) {
    console.error('Error fetching landing page data:', error);
    return null;
  }
}

// Fetch Images by landingPageId
export async function fetchImages(landingPageId: string): Promise<Image[]> {
  const sql = `
    SELECT 
      id,
      "landingPageId",
      title,
      "altText",
      "imageUrl",
      "slotName",
      category,
      "createdAt"
    FROM "Image" 
    WHERE "landingPageId" = $1
    ORDER BY "createdAt" ASC
  `;
  
  const rows = await query(sql, [landingPageId]);
  return rows as Image[];
}

// Fetch Landing Page with Images
export async function fetchLandingPageWithImages(templateId: string, id: string): Promise<LandingPageData | null> {
  const landingPage = await fetchLandingPageData(templateId, id);
  if (!landingPage) return null;
  
  const images = await fetchImages(landingPage.id);
  return {
    ...landingPage,
    images
  };
}

// Debug function to inspect database content
export async function debugDatabaseContent() {
  try {
    console.log('=== Database Debug Information ===');
    
    // Check if tables exist
    const tablesResult = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
    `);
    console.log('Available tables:', tablesResult.map(row => row.table_name));
    
    // Get LandingPage count
    const countResult = await query('SELECT COUNT(*) as count FROM "LandingPage"');
    console.log('Total LandingPage records:', countResult[0].count);
    
    // Get sample data
    const sampleResult = await query(`
      SELECT id, "templateId", "businessName", status 
      FROM "LandingPage" 
      LIMIT 5
    `);
    console.log('Sample LandingPage records:', sampleResult);
    
    // Get Image count
    const imageCountResult = await query('SELECT COUNT(*) as count FROM "Image"');
    console.log('Total Image records:', imageCountResult[0].count);
    
  } catch (error) {
    console.error('Database debug error:', error);
  }
}
