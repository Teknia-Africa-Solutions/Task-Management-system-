// src/app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/lib/config';

export async function POST(request: NextRequest) {
  console.log('📝 Signup API called');
  
  try {
    const body = await request.json();
    // ✅ Make sure to include 'role' in the destructuring
    const { name, email, password, role } = body;
    
    console.log('📧 Signup attempt for:', email);
    console.log('👤 Selected role:', role);

    // Validate input
    if (!email || !password || !name) {
      console.log('❌ Missing required fields');
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    console.log('🔍 Checking if user exists...');
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      console.log('❌ User already exists:', email);
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    console.log('✅ User does not exist, creating...');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ FIX: Use the role from the form, default to 'user' if not provided
    // Valid roles from your schema: 'admin', 'project_manager', 'user'
    const userRole = role || 'user';
    console.log('👤 Final role to save:', userRole);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash: hashedPassword,
        name: name,
        role: userRole,
        isActive: true,
      },
    });

    console.log('✅ User created:', user.email, 'with role:', user.role);

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('✅ JWT generated');

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    // Set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    console.log('✅ Signup successful for:', email);
    return response;
  } catch (error) {
    console.error('💥 Signup error details:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}