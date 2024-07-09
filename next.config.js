module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // async redirects() {
  //   return [

  //     {
  //       source: '/weed-deliveries/:details*',
  //       destination: '/weed-dispensaries/:details*',
  //       permanent: false,
  //     },
  //   ]
  // },
};