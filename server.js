const http = require('http');
const { Database } = require('@sqlitecloud/drivers');

const connectionString = "sqlitecloud://cqmydpebnk.g3.sqlite.cloud:8860/chinook.sqlite?apikey=m5CKD915Vg1mmkHY4WttQbyfedJrUegWlvsrDzUfPb8";

const server = http.createServer(async (req, res) => {
  if ((req.method === 'POST' || req.method === 'GET') && req.url === '/albums') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const db = new Database(connectionString);
        const result = await db.sql(`
          SELECT albums.AlbumId as id, albums.Title as title, artists.Name as artist
          FROM albums
          INNER JOIN artists ON artists.ArtistId = albums.ArtistId
          LIMIT 20;
        `);
        db.close();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
    });

  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
