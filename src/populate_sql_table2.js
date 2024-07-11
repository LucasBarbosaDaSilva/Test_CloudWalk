require("dotenv").config();
const Importer = require("mysql-import");
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2");

const csvFilePath = path.join(__dirname, "data2.csv");

const dbConfig = {
  user: "root",
  password: "password",
  host: "localhost",
  port: "3306",
  database: "TestCloudWalk",
};

const importer = new Importer(dbConfig);

importer
  .import("./northwind2.sql")
  .then(() => {
    console.error("Database restore successfully!");

    const connection = mysql.createConnection(dbConfig);
    connection.connect((err) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        process.exit(1);
      }

      console.log("Connected to MySQL database.");

      const csvData = fs.readFileSync(csvFilePath, "utf8");

      const csvRows = csvData.split("\n");

      for (let i = 1; i < csvRows.length; i++) {
        const [time, status, f0_] = csvRows[i].split(",");

        const insertQuery = `INSERT INTO table_csv_2 (time, status, f0_) VALUES (?, ?, ?)`;
        connection.query(insertQuery, [time, status, f0_], (error, results) => {
          if (error) {
            console.error("Error inserting data:", error);
          } else {
            console.log("Inserted row:", time, status, f0_);
          }
        });
      }

      connection.end();
    });
  })
  .catch((err) => {
    console.error("Error restoring database: \n", err);
    process.exit(1);
  })
  .finally(() => {
    importer.disconnect();
  });
