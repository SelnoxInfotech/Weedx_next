// pages/sitemap.xml.js
export async function getServerSideProps({ res }) {
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
      <loc>https://www.weedx.io/sitemap/products-sitemap.xml</loc>
    </sitemap>
    <sitemap>
      <loc>https://www.weedx.io/sitemap/law-sitemap.xml</loc>
    </sitemap>
    <sitemap>
      <loc>https://www.weedx.io/sitemap/brand-sitemap.xml</loc>
    </sitemap>
    <sitemap>
      <loc>https://www.weedx.io/sitemap/deliveries-location-sitemap.xml</loc>
    </sitemap>
    <sitemap>
      <loc>https://www.weedx.io/sitemap/dispensaries-location-sitemap.xml</loc>
    </sitemap>
    <sitemap>
      <loc>https://www.weedx.io/sitemap/news-sitemap.xml</loc>
    </sitemap>
    <sitemap>
      <loc>https://www.weedx.io/sitemap/delivery-stores-sitemap.xml</loc>
    </sitemap>
    <sitemap>
      <loc>https://www.weedx.io/sitemap/dispensaries-stores-sitemap.xml</loc>
    </sitemap>
    <sitemap>
      <loc>https://www.weedx.io/sitemap/allpages-sitemap.xml</loc>
    </sitemap>
  </sitemapindex>`;

  res.setHeader('Content-Type', 'application/xml');
  res.write(sitemapIndex);
  res.end();

  // Return an empty props object because this page doesn't need to render anything
  return { props: {} };
}

export default function Sitemap() {
  return null; // This component won't actually render anything
}
