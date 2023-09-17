require("dotenv").config(); // Carrega variáveis de ambiente do arquivo .env
const Importer = require("mysql-import");
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2");

const csvFilePath = path.join(__dirname, "data2.csv"); // Caminho para o arquivo CSV

// Configuração do banco de dados
const dbConfig = {
  user: "root",
  password: "password",
  host: "localhost",
  port: "3306",
  database: "TestCloudWalk", // Substitua pelo nome do seu banco de dados
};

// Crie uma instância de importação MySQL
const importer = new Importer(dbConfig);

// Importe o arquivo SQL para criar a estrutura da tabela (northwind.sql)
importer
  .import("./northwind2.sql")
  .then(() => {
    console.error("Database restore successfully!");

    // Leia o arquivo CSV e popule a tabela
    const connection = mysql.createConnection(dbConfig);
    connection.connect((err) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        process.exit(1);
      }

      console.log("Connected to MySQL database.");

      // Leitura do arquivo CSV
      const csvData = fs.readFileSync(csvFilePath, "utf8");

      // Separe as linhas do arquivo CSV
      const csvRows = csvData.split("\n");

      // Processamento das linhas do CSV e inserção na tabela
      for (let i = 1; i < csvRows.length; i++) {
        // Comece a partir da segunda linha para ignorar o cabeçalho
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

      // Feche a conexão com o banco de dados
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
