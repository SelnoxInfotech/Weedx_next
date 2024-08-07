// import { NextResponse } from 'next/server';

// export function middleware(request) {
//   // Perform operations like logging or authentication
//   console.log('Middleware 1 executed');

//   // Return the response
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/:path*'], // Matches all paths
// };

 
// import { secondMiddleware } from '../middleware/secondMiddleware';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const { cookies } = req;
  let location = cookies.get('fetchlocation');
  const response = NextResponse.next();
  // If location is not found, set a default value
  if (!location) {
    const setLocation = {
      country: 'United States',
      state: 'New York',
      city: 'New York',
      formatted_address: 'New York, NY, USA'
    };
    location = JSON.stringify(setLocation);
    response.cookies.set('fetchlocation', location);
  } else {

  }
  return response;
}

export const config = {
  matcher: ['/:path*'], // Matches all paths
};