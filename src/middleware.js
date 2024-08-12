
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const response = NextResponse.next();
  
  // Access cookies from the request
  const cookies = req.cookies;
  let location = cookies.get('fetchlocation');
  
  // If location is not found, set a default value
  if (!location) {
    const setLocation = {
      country: 'United-States',
      state: 'New-York',
      city: 'New-York',
      formatted_address: 'New York, NY, USA'
    };
    location = JSON.stringify(setLocation);
    
    // Set the cookie in the response
    response.cookies.set('fetchlocation', location);
  }
  
  return response;
}

export const config = {
  matcher: ['/:path*'], // Matches all paths
};
