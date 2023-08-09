require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient } = require('mongodb');
const dns = require('dns');
const urlparser = require('url');

const client = new MongoClient(process.env.DB_URI);

const db = client.db("urlshortener")
const urls = db.collection("urls")

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.post('/api/shorturl', async (req, res) => {
  try {
    console.log(req.body);
    const url = req.body.url;

    const validUrl = /^https?:\/\/\S+$/.test(url);
    if (!validUrl) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }
  
    const dnslookup = await new Promise((resolve) => {
      dns.lookup(urlparser.parse(url).hostname, (err, address) => {
        resolve(address);
      });
    });
  
    if (!dnslookup) {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    const existingUrl = await urls.findOne({ url });
    if (existingUrl) {
      return res.json({ original_url: url, short_url: existingUrl.short_url });
    }
  
    const urlCount = await urls.countDocuments({});
    const urlDoc = {
      url,
      short_url: urlCount
    };

    const result = await urls.insertOne(urlDoc);
  
    console.log(result);
    return res.json({ original_url: url, short_url: urlCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
