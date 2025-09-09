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
