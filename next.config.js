
// /** @type {import('next').NextConfig} */
// module.exports = {
//   target: 'tatic',
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: '**',
//       },
//     ],
//   },
//   // async redirects() {
//   //   return [

//   //     {
//   //       source: '/weed-deliveries/:details*',
//   //       destination: '/weed-dispensaries/:details*',
//   //       permanent: false,
//   //     },
//   //   ]
//   // },
// };


/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'selnoxmedia.s3.amazonaws.com',
        pathname: '/media/**',
      },
    ],
  },
};