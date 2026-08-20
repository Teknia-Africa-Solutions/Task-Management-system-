import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Create the response
    const response = NextResponse.json({ 
      success: true,
      message: 'Logged out successfully'
    });
    
    // ✅ Clear the token cookie
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // This removes the cookie immediately
      path: '/',
    });
    
    // ✅ Return the response (don't try to set status manually)
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}