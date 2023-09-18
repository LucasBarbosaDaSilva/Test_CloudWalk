const express = require("express");
const mysql = require("mysql2");
const csvtojson = require("csvtojson");

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const PORT = process.env.PORT || "3005";

const dbConfig = {
  user: "root",
  password: "password",
  host: "localhost",
  port: "3306",
  database: "TestCloudWalk", // Substitua pelo nome do seu banco de dados
};

// Crie uma instância de importação MySQL
const connection = mysql.createConnection(dbConfig);
// const percentDifference =
//   Math.abs((avgTransactions - avgErrors) / avgTransactions) * 100;

// app.get("/", (_request, response) => {
//   response.status(HTTP_OK_STATUS).send();
// });

app.get("/dados", (_request, response) => {
  // Consulta SQL para selecionar todos os dados da tabela
  const selectAllQuery = "SELECT status, f0_ FROM tabela_csv_1";

  // Execute a consulta SQL
  connection.query(selectAllQuery, (error, results) => {
    if (error) {
      console.error("Erro ao recuperar dados:", error);
      return response
        .status(500)
        .json({ message: "Erro interno do servidor." });
    }

    // Converte os resultados CSV em JSON
    csvtojson()
      .fromString(results)
      .then((jsonArray) => {
        // Define o cabeçalho Content-Type e retorna os resultados como JSON
        response.setHeader("Content-Type", "application/json");
        return response.status(HTTP_OK_STATUS).json(jsonArray);
      })
      .catch((csvError) => {
        console.error("Erro ao converter CSV para JSON:", csvError);
        return response
          .status(500)
          .json({ message: "Erro interno do servidor." });
      });
  });
});
app.post("/adicionar-dados", (request, response) => {
  const { time, status, f0_ } = request.body;

  if (!time || !status || !f0_) {
    return response
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  const insertQuery =
    "INSERT INTO tabela_csv_1 (time, status, f0_) VALUES (?, ?, ?)";
  const values = [time, status, f0_];

  // Execute a inserção no banco de dados
  connection.query(insertQuery, values, (error, results) => {
    if (error) {
      console.error("Erro ao inserir dados:", error);
      return response
        .status(500)
        .json({ message: "Erro interno do servidor." });
    }

    // Consultas SQL para calcular as médias
    const avgQuery =
      "SELECT " +
      "'approved' AS status, AVG(f0_) AS media_approved " +
      "FROM tabela_csv_1 WHERE status = 'approved' " +
      "UNION ALL " +
      "SELECT " +
      "'denied' AS status, AVG(f0_) AS media_denied " +
      "FROM tabela_csv_1 WHERE status = 'denied' " +
      "UNION ALL " +
      "SELECT " +
      "'refunded' AS status, AVG(f0_) AS media_refunded " +
      "FROM tabela_csv_1 WHERE status = 'refunded' " +
      "UNION ALL " +
      "SELECT " +
      "'failed' AS status, AVG(f0_) AS media_failed " +
      "FROM tabela_csv_1 WHERE status = 'failed' ";

    // Execute a consulta SQL para calcular as médias
    connection.query(avgQuery, (error, resultsAvg) => {
      if (error) {
        console.error("Erro ao calcular as médias:", error);
        return response
          .status(500)
          .json({ message: "Erro interno do servidor." });
      }

      // Obtenha as médias calculadas
      const mediaApproved = resultsAvg.find(
        (result) => result.status === "approved"
      ).media_approved;
      const mediaDenied = resultsAvg.find(
        (result) => result.status === "denied"
      ).media_denied;
      const mediaRefunded = resultsAvg.find(
        (result) => result.status === "refunded"
      ).media_refunded;
      const mediaFailed = resultsAvg.find(
        (result) => result.status === "failed"
      ).media_failed;

      // Definir uma variável de anomalia com base nas condições
      let anomalia = "";

      if (mediaDenied > 15) {
        anomalia = "denied";
      } else if (mediaFailed > 3) {
        anomalia = "failed";
      } else if (mediaRefunded > 3) {
        anomalia = "refunded";
      } else if (mediaApproved < 80) {
        anomalia = "approved";
      }

      // Retorne a anomalia como resposta ou faça qualquer outra ação necessária
      if (anomalia !== "") {
        return response
          .status(HTTP_CREATED_STATUS)
          .json({ message: `Anomalia detectada para '${anomalia}'.` });
      } else {
        return response
          .status(HTTP_CREATED_STATUS)
          .json({ message: "Dados inseridos com sucesso." });
      }
    });
  });
});

app.listen(PORT, () => {
  console.log("Online");
});
