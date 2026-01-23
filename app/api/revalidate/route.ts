import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    // Optional: Check for secret token in production
    const secret = request.headers.get('x-revalidate-secret') || request.nextUrl.searchParams.get('secret');
    const expectedSecret = process.env.REVALIDATION_SECRET;

    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Invalid secret token' },
        { status: 401 }
      );
    }

    // Revalidate the home page
    revalidatePath('/');
    
    // Also revalidate common paths that might be cached
    revalidatePath('/', 'layout');

    return NextResponse.json(
      { 
        revalidated: true, 
        message: 'Website updated successfully!',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Error revalidating website' },
      { status: 500 }
    );
  }
}
