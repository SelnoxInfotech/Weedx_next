const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const ip = '192.168.1.20';
const axios = require('axios');
function modifystr(str) {
  if (typeof str !== 'string') {
    return ''
  }
  else {
    str = str?.replace(/[^a-zA-Z0-9/ ]/g, "-");
    str = str?.trim().replaceAll(' ', "-");
    let a = 0;
    while (a < 1) {
      if (str?.includes("--")) {
        str = str?.replaceAll("--", "-")
      } else if (str?.includes("//")) {
        str = str?.replaceAll("//", "/")
      } else if (str?.includes("//")) {
        str = str?.replaceAll("-/", "/")
      } else if (str?.includes("//")) {
        str = str?.replaceAll("/-", "/")
      } else if (str?.includes("/")) {
        str = str?.replaceAll("/", "-")
      }

      else {
        a++
      }

    }
    if (str.toLowerCase().slice(-1) === '-') {
      str = str.slice(0, -1); // Remove the trailing hyphen
    }
    return str.toLowerCase()
  }
}


app.prepare().
  then(() => {
    const server = express();
    server.use(cookieParser());

    // Custom route example

    server.get('/custom-route', (req, res) => {
      return app.render(req, res, '/custom-route', req.query);
    });
    server.get("/sitemap/:category", async (req, res) => {
      switch (req.url) {
        case "/sitemap/dispensaries-location-sitemap.xml":

          const response1 = await axios.get(`https://api.cannabaze.com/UserPanel/Get-SitemapbyId/14`);
          console.log(response1)
          if (response1.data[0].Xml) {

            const sitemapXmll = `<?xml version="1.0" encoding="UTF-8"?>
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${response1.data[0].Xml.map((url) => `
              <url>
                <loc>${url}</loc>
                <changefreq>daily</changefreq>
                <priority>0.8</priority>
              </url>
            `).join('')}
          </urlset>`;
            res.setHeader('Content-Type', 'text/xml');
            res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache the feed for 24 hours
            res.write(sitemapXmll);
            res.end();
            //   fs.writeFileSync('./build/Sitemap/weed-dispensaries.xml', sitemapXmll);
          }
          break;
        case "/sitemap/products-sitemap.xml":
          const response4 = await axios.get(`https://api.cannabaze.com/UserPanel/ListProductView/`);
          const responsecategory = await axios.get(`https://api.cannabaze.com/UserPanel/Get-Categories/`);
          const responseSubCategory = await axios.get(`https://api.cannabaze.com/UserPanel/Get-AllSubCategoriesForSitemap/`);
          if (response4) {
            const sitemapXml1 = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${response4.data.map((url) => `
                <url>
                    <loc>https://www.weedx.io/products/${modifystr(url.category_name)}/${modifystr(url.SubcategoryName)}/${modifystr(url.Product_Name)}/${url.id}</loc>
                    <changefreq>daily</changefreq>
                    <priority>0.8</priority>
                </url>
            `).join('')}
            ${responsecategory.data.map((url) => `
            <url>
                <loc>https://www.weedx.io/products/${modifystr(url.name)}/${url.id}</loc>
                <changefreq>daily</changefreq>
                <priority>0.80</priority>
            </url>
        `).join('')}
        ${responseSubCategory.data.map((url) => `
        <url>
        <loc>https://www.weedx.io/products/${modifystr(url.category_name)}/${modifystr(url.name)}/${url.id}</loc>
            <changefreq>daily</changefreq>
            <priority>0.80</priority>
        </url>
    `).join('')}
        </urlset>`;
            res.setHeader('Content-Type', 'text/xml');
            res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache the feed for 24 hours
            res.write(sitemapXml1);
            res.end();
          }
          break
        case "/sitemap/deliveries-location-sitemap.xml":
          const response2 = await axios.get(`https://api.cannabaze.com/UserPanel/Get-SitemapbyId/11`);

          if (response2.data[0].Xml) {

            const sitemapXmll = `<?xml version="1.0" encoding="UTF-8"?>
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${response2.data[0].Xml.map((url) => `
              <url>
                <loc>${url}</loc>
                <changefreq>daily</changefreq>
                <priority>0.8</priority>
              </url>
            `).join('')}
          </urlset>`;
            res.setHeader('Content-Type', 'text/xml');
            res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache the feed for 24 hours
            res.write(sitemapXmll);
            res.end();
            //   fs.writeFileSync('./build/Sitemap/weed-dispensaries.xml', sitemapXmll);
          }
          break;
        case "/sitemap/news-sitemap.xml":
          const response3 = await axios.get(`https://api.cannabaze.com/UserPanel/Get-News/`);
          if (response3) {
            const sitemapXmll = `<?xml version="1.0" encoding="UTF-8"?>
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${response3.data.map((url) => `
              <url>
               <loc>${`${`https://www.weedx.io/${url.CategoryName === "CANNABIS NEWS" ? "cannabis-news" : 'blogs'}`}/${url.Url_slug === ("" || null || undefined) ? modifystr(url.Title) : modifystr(url.Url_slug)}/${url.id}`}</loc>
                <changefreq>daily</changefreq>
                <priority>0.8</priority>
              </url>
            `).join('')}
          </urlset>`;
            res.setHeader('Content-Type', 'text/xml');
            res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache the feed for 24 hours
            res.write(sitemapXmll);
            res.end();
          }
          break
        case "/sitemap/brand-sitemap.xml":
          const responsebrand = await axios.get(`https://api.cannabaze.com/UserPanel/Get-AllBrand/`);
          if (responsebrand) {
            const sitemapXmll = `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
              ${responsebrand.data.map((url) => `
                <url>
                  <loc>${`${"https://www.weedx.io/brands"}/${modifystr(url.name)}/${url.id}`}</loc>
                  <changefreq>daily</changefreq>
                  <priority>0.7</priority>
                </url>
              `).join('')}
            </urlset>`;
            res.setHeader('Content-Type', 'text/xml');
            res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache the feed for 24 hours
            res.write(sitemapXmll);
            res.end();
          }
          break
        case "/sitemap/dispensaries-stores-sitemap.xml":
          const response5 = await axios.get(`https://api.cannabaze.com/UserPanel/Get-Stores/`);

          if (response5 && response5.data) {
            const dispensaryUrls = response5.data.filter(url => url.Store_Type === "dispensary")
              .map(url => `
                <url>
                  <loc>https://www.weedx.io/weed-dispensaries/${modifystr(url.Store_Name)}/${url.id}</loc>
                  <changefreq>daily</changefreq>
                  <priority>0.8</priority>
                </url>`).join('');

            const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${dispensaryUrls}
          </urlset>`;

            res.setHeader('Content-Type', 'text/xml');
            res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache the feed for 24 hours
            res.write(sitemapXml);
            res.end();
          }
          break
        case "/sitemap/delivery-stores-sitemap.xml":
          const response6 = await axios.get(`https://api.cannabaze.com/UserPanel/Get-Stores/`)
          if (response6 && response6.data){
            const dispensaryUrls = response6.data.filter(url => url.Store_Type !== "dispensary")
              .map(url => `
                  <url>
                    <loc>https://www.weedx.io/weed-deliveries/${modifystr(url.Store_Name)}/${url.id}</loc>
                    <changefreq>daily</changefreq>
                    <priority>0.8</priority>
                  </url>`).join('');

            const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
              ${dispensaryUrls}
            </urlset>`;

            res.setHeader('Content-Type', 'text/xml');
            res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache the feed for 24 hours
            res.write(sitemapXml);
            res.end();
          }
          break
        case "/sitemap/allpages-sitemap.xml":

          res.setHeader('Content-Type', 'text/xml');
          res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache the feed for 24 hours
          res.write(`
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          <url>
          <loc>https://www.weedx.io</loc>
          <changefreq>daily</changefreq>
          <priority>1</priority>
          </url>
          <url>
          <loc>https://www.weedx.io/blogs</loc>
          <changefreq>daily</changefreq>
          <priority>0.80</priority>
          </url>
          <url>
          <loc>https://www.weedx.io/brands</loc>
          <changefreq>daily</changefreq>
          <priority>0.80</priority>
          </url>
          <url>
          <loc>https://www.weedx.io/products</loc>
          <changefreq>daily</changefreq>
          <priority>0.80</priority>
          </url>
          <url>
          <loc>https://www.weedx.io/deals</loc>
          <changefreq>daily</changefreq>
          <priority>0.80</priority>
          </url>
          <url>
          <loc>https://www.weedx.io/learn</loc>
          <changefreq>daily</changefreq>
          <priority>0.80</priority>
          </url>
          <url>
          <loc>https://www.weedx.io/aboutus</loc>
          <changefreq>daily</changefreq>
          <priority>0.80</priority>
          </url>
          <url>
          <loc>https://www.weedx.io/faq</loc>
          <changefreq>daily</changefreq>
          <priority>0.80</priority>
          </url>
          <url>
          <loc>https://www.weedx.io/helpcenter</loc>
          <changefreq>daily</changefreq>
          <priority>0.80</priority>
          </url>
          <url>
          <loc>https://www.weedx.io/cannabis-news</loc>
          <changefreq>daily</changefreq>
          <priority>0.80</priority>
          </url>
          <url>
          <loc>https://www.weedx.io/terms-and-conditions</loc>
          <changefreq>daily</changefreq>
          <priority>0.80</priority>
          </url>
          <url>
          <loc>https://www.weedx.io/privacy-policy</loc>
          <changefreq>daily</changefreq>
          <priority>0.80</priority>
          </url>
          <url>
          <loc>https://www.weedx.io/cookies-policy</loc>
          <changefreq>daily</changefreq>
          <priority>0.80</priority>
          </url>
          </urlset>
          `);
          res.end();

          break
        // additional cases as needed
        default:
        // code block executed if expression doesn't match any case
      }
    })

    // server.post('/weed-dispensaries/upload-csv', upload.single('csvFile'), async (req, res) => {
    //   try {
    //     // Check if a file is uploaded
    //     if (!req.file) {
    //       res.status(400).send('No CSV file uploaded');
    //       return;
    //     }

    //     // Parse CSV data into JSON
    //     const jsonData = req.file.buffer
    //       .toString('utf8')
    //       .split('\n')
    //       .map((line, index) => {
    //         // Skip empty lines
    //         if (!line.trim()) return null;

    //         // Split the line into columns
    //         const columns = line.split(',');

    //         // Skip headers (assuming they are in the first row)
    //         if (index === 0) return null;

    //         // Create an object for each row
    //         return {
    //           country: columns[0].trim(),
    //           state: columns[1].trim(),
    //           city: columns[2].trim()
    //         };
    //       })
    //       .filter(row => row !== null); // Remove null entries (headers or empty lines)

    //     // Array to store all HTTP request promises
    //     const requestPromises = [];

    //     // Send HTTP requests for each row of data
    //     for (const data of jsonData) {
    //       try {
    //         const response = await axios.post(`https://api.cannabaze.com/UserPanel/Update-SiteMap/14`, {
    //           j: `https://www.weedx.io/weed-dispensaries/in/${modifystr(data.country)}/${modifystr(data.state)}/${modifystr(data.city)}`
    //         });
    //         // Do something with the response if needed
    //       } catch (error) {
    //         console.error('Error making HTTP request:', error);
    //       }
    //     }

    //     // Send the response after all requests have completed
    //     res.status(200).send('CSV file received and processed successfully');
    //   } catch (error) {
    //     console.error('Error processing CSV file:', error);
    //     res.status(500).send('Internal Server Error');
    //   }
    // });
    // server.post('/weed-deliveries/upload-csv', upload.single('csvFile'), async (req, res) => {
    //   try {
    //     // Check if a file is uploaded
    //     if (!req.file) {
    //       res.status(400).send('No CSV file uploaded');
    //       return;
    //     }

    //     // Parse CSV data into JSON
    //     const jsonData = req.file.buffer
    //       .toString('utf8')
    //       .split('\n')
    //       .map((line, index) => {
    //         // Skip empty lines
    //         if (!line.trim()) return null;

    //         // Split the line into columns
    //         const columns = line.split(',');

    //         // Skip headers (assuming they are in the first row)
    //         if (index === 0) return null;

    //         // Create an object for each row
    //         return {
    //           country: columns[0].trim(),
    //           state: columns[1].trim(),
    //           city: columns[2].trim()
    //         };
    //       })
    //       .filter(row => row !== null); // Remove null entries (headers or empty lines)

    //     // Array to store all HTTP request promises
    //     const requestPromises = [];

    //     // Send HTTP requests for each row of data
    //     for (const data of jsonData) {
    //       try {
    //         const response = await axios.post(`https://api.cannabaze.com/UserPanel/Update-SiteMap/11`, {
    //           j: `https://www.weedx.io/weed-deliveries/in/${modifystr(data.country)}/${modifystr(data.state)}/${modifystr(data.city)}`
    //         });
    //         // Do something with the response if needed
    //       } catch (error) {
    //         console.error('Error making HTTP request:', error);
    //       }
    //     }

    //     // Send the response after all requests have completed
    //     res.status(200).send('CSV file received and processed successfully');
    //   } catch (error) {
    //     console.error('Error processing CSV file:', error);
    //     res.status(500).send('Internal Server Error');
    //   }
    // });

    server.get('/robots.txt', (req, res) => {
      res.type('text/plain');
      res.send(`User-agent: *
   Disallow: /`);
    });

    // Handle all other routes with Next.js
    server.get('*', (req, res) => {

      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> woking on http://localhost:3000');
    });
  });
