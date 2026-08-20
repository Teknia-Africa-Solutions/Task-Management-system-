import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { prisma } from './db';
import { JWT_SECRET } from './config';

export async function getCurrentUser() {
  try {
    console.log('🔍 getCurrentUser called');
    const cookieStore = await cookies(); // ✅ MUST HAVE AWAIT
    const token = cookieStore.get('token');
    
    console.log('🍪 Cookie found:', token ? 'Yes' : 'No');
    
    if (!token) {
      console.log('❌ No token cookie found');
      return null;
    }

    console.log('🔐 Verifying token...');
    const decoded = jwt.verify(token.value, JWT_SECRET) as { userId: string };
    console.log('✅ Token verified for userId:', decoded.userId);
    
    if (!decoded.userId) {
      console.log('❌ No userId in token');
      return null;
    }

    console.log('👤 Fetching user from database...');
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
      },
    });

    if (user) {
      console.log('✅ User found:', user.email);
    } else {
      console.log('❌ User not found in database');
    }

    return user;
  } catch (error) {
    console.error('💥 Error getting current user:', error);
    return null;
  }
}

export async function setAuthToken(token: string) {
  const cookieStore = await cookies(); // ✅ MUST HAVE AWAIT
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
}

export async function removeAuthToken() {
  const cookieStore = await cookies(); // ✅ MUST HAVE AWAIT
  cookieStore.delete('token');
}