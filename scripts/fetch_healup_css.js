const https = require('https');

https.get('https://healup-wbs.webflow.io/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Look for Webflow's CSS files
    const cssLinks = data.match(/<link[^>]*href="([^"]*\.css[^"]*)"[^>]*>/gi);
    console.log("CSS Links:", cssLinks);
    
    // Also extract inline styles
    const styles = data.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
    if (styles) {
      console.log("Inline styles:", styles.map(s => s.substring(0, 100) + '...'));
    }
  });
}).on('error', err => {
  console.log('Error: ', err.message);
});
