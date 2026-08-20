// This file is for CLIENT COMPONENTS ONLY
// Do not import server-only modules here

export async function getCurrentUserClient() {
  try {
    const response = await fetch('/api/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important: include cookies
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('Error getting current user client:', error);
    return null;
  }
}

// Helper to check if user is authenticated
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check for token in localStorage or cookies
  const token = localStorage.getItem('token');
  return !!token;
}

// Helper to get token from localStorage
export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

// Helper to set token in localStorage
export function setToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('token', token);
}

// Helper to remove token
export function removeToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('token');
}