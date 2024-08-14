import Head from 'next/head';
import Createcontext from '../../hooks/context';
import React from 'react';

function Delivery({ location ,formatted_address }) {
  const { state } = React.useContext(Createcontext);

  // Construct the title string
  const title = `Weed Delivery in ${formatted_address} | weedx.io |`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta
        name="description"
        content={`Find Nearby Weed Delivery in ${formatted_address} for Recreational & Medical Uses. Browse Top Cannabis Products and Place Orders from Trusted weed delivery near you.`}
      />
      <link rel="canonical" href={`https://www.weedx.io${location}`} />
      <meta
        name="robots"
        content="INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1"
      />
      {/* Facebook tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={`Find Nearby Weed Delivery in ${formatted_address} for Recreational & Medical Uses. Browse Top Cannabis Products and Place Orders from Trusted weed delivery near you.`}
      />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name="twitter:creator" content="website" />
      <meta name="twitter:card" content="website Dispensaries & Delivery Near Me" />
      <meta name="twitter:title" content={title} />
      <meta
        name="twitter:description"
        content="In weedx.io, find high quality Recreational and Medical Marijuana Dispensaries & Delivery Near you. Order online and get best deals on your weed near you."
      />
      {/* End Twitter tags */}
    </Head>
  );
}

export { Delivery };
