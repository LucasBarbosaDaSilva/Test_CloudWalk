/*Media de vendas de hoje e ontem*/
SELECT
    'Checkout1' AS tabela,
    AVG(today) AS media_today,
    AVG(yesterday) AS media_yesterday
FROM TestCloudWalk.checkout1
UNION ALL
SELECT
    'Checkout2' AS tabela,
    AVG(today) AS media_today,
    AVG(yesterday) AS media_yesterday
FROM TestCloudWalk.checkout2;

/*Media de vendas de hoje e do mesmo dia na semana passada*/
SELECT
    'Checkout1' AS tabela,
    AVG(today) AS media_today,
    AVG(same_day_last_week) AS media_same_day_lastW
FROM TestCloudWalk.checkout1
UNION ALL
SELECT
    'Checkout2' AS tabela,
    AVG(today) AS media_today,
    AVG(same_day_last_week) AS media_same_day_lastW
FROM TestCloudWalk.checkout2;

/*Media de vendas da ultima semana e media de vendas do ultimo mês*/
SELECT
    'Checkout1' AS tabela,
    AVG(avg_last_week) AS media_avg_last_week,
    AVG(avg_last_month) AS media_avg_last_month
FROM TestCloudWalk.checkout1
UNION ALL
SELECT
    'Checkout2' AS tabela,
     AVG(avg_last_week) AS media_avg_last_week,
    AVG(avg_last_month) AS media_avg_last_month
FROM TestCloudWalk.checkout2;