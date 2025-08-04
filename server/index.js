const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const app = express();
app.use(cors());
app.use(express.json());

// Utility: Try to extract product info from generic e-commerce pages
function extractProductInfo(html) {
  const $ = cheerio.load(html);
  // These selectors are generic and may need to be improved for specific sites
  const image = $('img').first().attr('src') || '';
  const price = $('[class*=price], [id*=price]').first().text().trim();
  const details = $('[class*=spec], [class*=detail], [id*=spec], [id*=detail]').first().text().trim();
  const description = $('[class*=desc], [id*=desc], meta[name=description]').first().text().trim() || $('meta[name=description]').attr('content') || '';
  let brand = '';
  // Try to find brand in meta or visible text
  brand = $('[class*=brand], [id*=brand]').first().text().trim();
  if (!brand) {
    brand = $("meta[name='brand']").attr('content') || '';
  }
  return { image, price, details, description, brand };
}

app.post('/api/scrape', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'Missing url' });
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch URL');
    const html = await response.text();
    const product = extractProductInfo(html);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 