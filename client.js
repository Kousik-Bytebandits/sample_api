const { Database } = require("@sqlitecloud/drivers");

const connectionString = "sqlitecloud://cqmydpebnk.g3.sqlite.cloud:8860/chinook.sqlite?apikey=m5CKD915Vg1mmkHY4WttQbyfedJrUegWlvsrDzUfPb8";

async function runQuery() {
  let db = null;
  try {
    db = new Database(connectionString);

    // Note: SQLite does NOT support "USE DATABASE" syntax
    // Your connection string already specifies the database
    // So just run the SELECT query directly

    const result = await db.sql(`
      SELECT albums.AlbumId as id, albums.Title as title, artists.Name as artist
      FROM albums
      INNER JOIN artists ON artists.ArtistId = albums.ArtistId
      LIMIT 20;
    `);

    console.log(result);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    if (db) db.close();
  }
}

runQuery();
