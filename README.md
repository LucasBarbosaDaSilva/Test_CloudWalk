# Test_CloudWalk

Este projeto foi desenvolvido em Node.js JavaScript e utiliza MySQL e Docker Compose para a infraestrutura de banco de dados. Também é necessário o Grafana para visualização de gráficos e consultas.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina antes de iniciar:

- Node.js: [https://nodejs.org/](https://nodejs.org/)
- MySQL: [https://dev.mysql.com/downloads/installer/](https://dev.mysql.com/downloads/installer/)
- Docker Compose: [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)
- Grafana: [https://grafana.com/grafana/](https://grafana.com/grafana/)

## Resumo do projeto
Este projeto consiste em duas partes:

Análise de Dados de Vendas (case1.sql): Este caso de uso envolve a análise de dados de vendas de PDV para identificar comportamentos anormais. Utilizamos um conjunto de dados CSV e consultas SQL para realizar essa análise.

Monitoramento em Tempo Real (index.js): Nesta parte, implementamos um sistema de monitoramento em tempo real para transações financeiras. O sistema detecta anomalias com base em regras predefinidas ou modelos de pontuação de anomalia. Ele também emite alertas para transações com falha, revertidas ou negadas, caso estejam acima do normal.

Detalhes Adicionais
O caso1 (análise de dados) está disponível no arquivo case1.sql na pasta src. Este arquivo contém as consultas SQL para análise de dados.

O caso2 (monitoramento em tempo real) está implementado no arquivo index.js, que também contém o endpoint correspondente. Ele inclui condições para acionar alertas com base em critérios específicos, juntamente com a integração ao Grafana para visualização.

Para obter informações detalhadas sobre como configurar, executar consultas e interpretar os resultados, consulte a apresentação detalhada do projeto.

## Como Usar
Após a conclusão, você poderá acessar o Grafana em http://localhost:3000. Certifique-se de configurar um usuário no Grafana antes de prosseguir.
Siga os passos abaixo para configurar e executar o projeto:

1. Clone este repositório para o seu ambiente local:

```bash
git clone https://github.com/seu-usuario/Test_CloudWalk.git
cd Test_CloudWalk.

npm install

docker-compose up -d
