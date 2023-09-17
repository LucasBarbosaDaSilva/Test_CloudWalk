const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const PORT = process.env.PORT || "3001";

const dbConfig = {
  user: "root",
  password: "password",
  host: "localhost",
  port: "3306",
  database: "TestCloudWalk", // Substitua pelo nome do seu banco de dados
};

// Crie uma instância de importação MySQL
const connection = mysql.createConnection(dbConfig);
const percentDifference =
  Math.abs((avgTransactions - avgErrors) / avgTransactions) * 100;

app.get("/", (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get("/dados", (request, response) => {
  // Consulta SQL para selecionar todos os dados da tabela
  const selectAllQuery = "SELECT * FROM tabela_csv_1";

  // Execute a consulta SQL
  connection.query(selectAllQuery, (error, results) => {
    if (error) {
      console.error("Erro ao recuperar dados:", error);
      return response
        .status(500)
        .json({ message: "Erro interno do servidor." });
    }

    // Retorne os resultados como resposta
    return response.status(HTTP_OK_STATUS).json(results);
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

    // Consulta SQL para calcular a média de transações por minuto
    const avgTransactionsQuery =
      "SELECT AVG(f0_) AS avgTransactions FROM tabela_csv_1";

    // Consultas SQL para calcular a média de transações com cada status
    const avgFailedQuery =
      "SELECT AVG(f0_) AS avgFailed FROM tabela_csv_1 WHERE status = 'failed'";
    const avgDeniedQuery =
      "SELECT AVG(f0_) AS avgDenied FROM tabela_csv_1 WHERE status = 'denied'";
    const avgReversedQuery =
      "SELECT AVG(f0_) AS avgReversed FROM tabela_csv_1 WHERE status = 'reversed'";

    // Execute as consultas SQL e obtenha as médias
    connection.query(avgTransactionsQuery, (error, resultsTransactions) => {
      if (error) {
        console.error(
          "Erro ao calcular a média de transações por minuto:",
          error
        );
        return response
          .status(500)
          .json({ message: "Erro interno do servidor." });
      }

      connection.query(avgFailedQuery, (error, resultsFailed) => {
        if (error) {
          console.error(
            "Erro ao calcular a média de transações 'failed':",
            error
          );
          return response
            .status(500)
            .json({ message: "Erro interno do servidor." });
        }

        connection.query(avgDeniedQuery, (error, resultsDenied) => {
          if (error) {
            console.error(
              "Erro ao calcular a média de transações 'denied':",
              error
            );
            return response
              .status(500)
              .json({ message: "Erro interno do servidor." });
          }

          connection.query(avgReversedQuery, (error, resultsReversed) => {
            if (error) {
              console.error(
                "Erro ao calcular a média de transações 'reversed':",
                error
              );
              return response
                .status(500)
                .json({ message: "Erro interno do servidor." });
            }

            // Obtenha as médias calculadas
            const avgTransactions = resultsTransactions[0].avgTransactions;
            const avgFailed = resultsFailed[0].avgFailed;
            const avgDenied = resultsDenied[0].avgDenied;
            const avgReversed = resultsReversed[0].avgReversed;

            // Calcular as diferenças percentuais individualmente para cada status
            const percentDifferenceFailed =
              Math.abs((avgTransactions - avgFailed) / avgTransactions) * 100;
            const percentDifferenceDenied =
              Math.abs((avgTransactions - avgDenied) / avgTransactions) * 100;
            const percentDifferenceReversed =
              Math.abs((avgTransactions - avgReversed) / avgTransactions) * 100;

            // Verificar se algum dos status está acima do normal (80% ou mais de diferença)
            if (percentDifferenceFailed >= 97) {
              // Disparar o alarme para "failed"
              window.alert(
                "Alarme disparado para 'failed' devido à diferença percentual alta."
              );
            }

            if (percentDifferenceDenied >= 97) {
              // Disparar o alarme para "denied"
              window.alert(
                "Alarme disparado para 'denied' devido à diferença percentual alta."
              );
            }

            if (percentDifferenceReversed >= 97) {
              // Disparar o alarme para "reversed"
              window.alert(
                "Alarme disparado para 'reversed' devido à diferença percentual alta."
              );
            }

            window.alert("Dados inseridos com sucesso!");
            return response
              .status(HTTP_CREATED_STATUS)
              .json({ message: "Dados inseridos com sucesso." });
          });
        });
      });
    });
  });
});

app.listen(PORT, () => {
  console.log("Online");
});
