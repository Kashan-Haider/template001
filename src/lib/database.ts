import { Pool } from "pg";

// Create a connection pool (update with your actual DB credentials)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // or { user, host, db, password, port }
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

  const values = [templateId, id];
  const rows = await query(sql, values);

  // Return single landing page or null
  return rows.length > 0 ? rows[0] : null;
}

// Fetch Landing Page Data with Images
export async function fetchLandingPageWithImages(templateId: string, id: string) {
  const sql = `
    SELECT 
      lp.id,
      lp."templateId",
      lp."businessName",
      lp."githubUrl",
      lp.status,
      lp.content,
      lp."seoData",
      lp."themeData",
      lp."businessData",
      lp."createdAt",
      lp."updatedAt",
      lp."publishedAt",
      COALESCE(
        json_agg(
          json_build_object(
            'id', img.id,
            'slotName', img."slotName",
            'title', img.title,
            'altText', img."altText",
            'imageUrl', img."imageUrl",
            'category', img.category,
            'createdAt', img."createdAt"
          )
        ) FILTER (WHERE img.id IS NOT NULL), 
        '[]'::json
      ) as images
    FROM "LandingPage" lp
    LEFT JOIN "Image" img ON lp.id = img."landingPageId"
    WHERE lp."templateId" = $1 AND lp.id = $2
    GROUP BY lp.id
  `;

  const values = [templateId, id];
  const rows = await query(sql, values);

  // Return single landing page with images or null
  return rows.length > 0 ? rows[0] : null;
}

// Fetch all landing pages from database
export async function fetchAllLandingPages() {
  try {
    const sql = `
      SELECT 
        id,
        "templateId",
        "businessName",
        "githubUrl",
        status,
        "createdAt",
        "updatedAt",
        "publishedAt"
      FROM "LandingPage" 
      ORDER BY "createdAt" DESC
    `;

    const rows = await query(sql);
    return rows;
  } catch (error) {
    console.error('Error fetching all landing pages:', error);
    throw error;
  }
}

// Debug function to print all existing landing pages
export async function debugPrintAllLandingPages() {
  try {
    console.log('=== FETCHING ALL LANDING PAGES ===');
    const pages = await fetchAllLandingPages();
    
    if (pages.length === 0) {
      console.log('❌ No landing pages found in database');
      return [];
    }

    console.log(`✅ Found ${pages.length} landing page(s):`);
    console.log('');
    
    pages.forEach((page, index) => {
      console.log(`--- Landing Page ${index + 1} ---`);
      console.log(`ID: ${page.id}`);
      console.log(`Template ID: ${page.templateId}`);
      console.log(`Business Name: ${page.businessName}`);
      console.log(`Status: ${page.status}`);
      console.log(`GitHub URL: ${page.githubUrl || 'Not set'}`);
      console.log(`Created: ${page.createdAt}`);
      console.log('');
    });
    
    if (pages.length > 0) {
      const firstPage = pages[0];
      console.log('🔧 SUGGESTED ENVIRONMENT VARIABLES:');
      console.log(`TEMPLATE_ID=${firstPage.templateId}`);
      console.log(`LANDING_PAGE_ID=${firstPage.id}`);
      console.log('');
    }
    
    return pages;
  } catch (error) {
    console.error('Error in debugPrintAllLandingPages:', error);
    throw error;
  }
}

// Debug function to print all landing page content
export async function debugPrintLandingPageData(templateId: string, id: string) {
  try {
    const landingPage = await fetchLandingPageWithImages(templateId, id);
    
    if (!landingPage) {
      console.log(`No landing page found with templateId: ${templateId} and id: ${id}`);
      return null;
    }

    console.log('=== LANDING PAGE DATA ===');
    console.log('ID:', landingPage.id);
    console.log('Template ID:', landingPage.templateId);
    console.log('Business Name:', landingPage.businessName);
    console.log('GitHub URL:', landingPage.githubUrl);
    console.log('Status:', landingPage.status);
    console.log('Created At:', landingPage.createdAt);
    console.log('Updated At:', landingPage.updatedAt);
    console.log('Published At:', landingPage.publishedAt);
    
    console.log('\n=== CONTENT DATA ===');
    console.log(JSON.stringify(landingPage.content, null, 2));
    
    console.log('\n=== SEO DATA ===');
    console.log(JSON.stringify(landingPage.seoData, null, 2));
    
    console.log('\n=== THEME DATA ===');
    console.log(JSON.stringify(landingPage.themeData, null, 2));
    
    console.log('\n=== BUSINESS DATA ===');
    console.log(JSON.stringify(landingPage.businessData, null, 2));
    
    console.log('\n=== IMAGES ===');
    console.log(JSON.stringify(landingPage.images, null, 2));
    
    console.log('=== END LANDING PAGE DATA ===');
    
    return landingPage;
  } catch (error) {
    console.error('Error fetching and printing landing page data:', error);
    throw error;
  }
}
