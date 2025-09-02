import { Pool } from "pg";

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
export async function fetchLandingPageData(templateId: string, id: string) {
  const sql = `
    SELECT * FROM "LandingPage" 
    WHERE "templateId" = $1 AND id = $2
  `;
  
  const rows = await query(sql, [templateId, id]);
  return rows.length > 0 ? rows[0] : null;
}

// Fetch Images by landingPageId
export async function fetchImages(landingPageId: string) {
  const sql = `
    SELECT * FROM "Image" 
    WHERE "landingPageId" = $1
  `;
  
  const rows = await query(sql, [landingPageId]);
  return rows;
}

// Fetch Landing Page with Images
export async function fetchLandingPageWithImages(templateId: string, id: string) {
  const landingPage = await fetchLandingPageData(templateId, id);
  if (!landingPage) return null;
  
  const images = await fetchImages(landingPage.id);
  return {
    ...landingPage,
    images
  };
}
