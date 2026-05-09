const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 8080;
const API_KEY = process.env.ANTHROPIC_API_KEY || '';

function findFile(filePath, callback) {
  const publicPath = path.join(__dirname, 'public', filePath);
  const rootPath = path.join(__dirname, filePath);
  fs.readFile(publicPath, (err, content) => {
    if (!err) return callback(null, content, publicPath);
    fs.readFile(rootPath, (err2, content2) => {
      if (!err2) return callback(null, content2, rootPath);
      callback(new Error('Not found'));
    });
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && parsedUrl.pathname === '/api/chat') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      let parsed;
      try { parsed = JSON.parse(body); } catch(e) {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({error: 'Invalid JSON'}));
        return;
      }
      const payload = JSON.stringify(parsed);
      const options = {
        hostname: 'api.anthropic.com',
        path: '/v1/messages',
        method: '
