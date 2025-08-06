import express, { Request, Response } from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import cheerio from 'cheerio';

const app = express();
app.use(cors());
app.use(express.json());

interface ProductInfo {
  image: string;
  price: string;
  details: string;
  description: string;
  brand: string;
}

function extractProductInfo(html: string): ProductInfo {
  const $ = cheerio.load(html);
  const image = $('img').first().attr('src') || '';
  const price = $('[class*=price], [id*=price]').first().text().trim();
  const details = $('[class*=spec], [class*=detail], [id*=spec], [id*=detail]').first().text().trim();
  const description = $('[class*=desc], [id*=desc], meta[name=description]').first().text().trim() || $('meta[name=description]').attr('content') || '';
  let brand = '';
  brand = $('[class*=brand], [id*=brand]').first().text().trim();
  if (!brand) {
    brand = $("meta[name='brand']").attr('content') || '';
  }
  return { image, price, details, description, brand };
}

app.post('/api/scrape', async (req: Request, res: Response) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'Missing url' });
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch URL');
    const html = await response.text();
    const product = extractProductInfo(html);
    res.json(product);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 