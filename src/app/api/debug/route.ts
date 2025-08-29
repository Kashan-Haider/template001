import { NextResponse } from "next/server";
import { debugPrintAllLandingPages } from "@/lib/database";

export async function GET() {
  try {
    console.log('=== DEBUG API ENDPOINT CALLED ===');
    
    // Fetch and print all landing pages
    const pages = await debugPrintAllLandingPages();
    
    return NextResponse.json({
      success: true,
      message: `Found ${pages.length} landing page(s)`,
      pages: pages.map(page => ({
        id: page.id,
        templateId: page.templateId,
        businessName: page.businessName,
        status: page.status,
        createdAt: page.createdAt
      })),
      suggestion: pages.length > 0 ? {
        templateId: pages[0].templateId,
        id: pages[0].id
      } : null
    });
  } catch (error: any) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Database connection failed",
        message: error.message || "Unknown database error",
        details: error.toString()
      },
      { status: 500 }
    );
  }
}
