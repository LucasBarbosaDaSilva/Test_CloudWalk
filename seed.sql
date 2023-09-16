DROP SCHEMA IF EXISTS TestCloudWalk;
CREATE SCHEMA TestCloudWalk;

USE TestCloudWalk;

DROP TABLE IF EXISTS checkout1;

-- Criar a tabela checkout1
CREATE TABLE checkout1 (
    time TIME PRIMARY KEY,
    today INT,
    yesterday INT,
    same_day_last_week INT,
    avg_last_week DECIMAL(5, 2),
    avg_last_month DECIMAL(5, 2)
);

INSERT INTO checkout1 (time, today, yesterday, same_day_last_week, avg_last_week, avg_last_month)
VALUES
    ('00:00:00', 9, 12, 11, 6.42, 4.85),
    ('01:00:00', 3, 5, 1, 1.85, 1.92),
    ('02:00:00', 1, 0, 0, 0.28, 0.82),
    ('03:00:00', 1, 0, 0, 0.42, 0.46),
    ('04:00:00', 0, 0, 1, 0.42, 0.21),
    ('05:00:00', 1, 1, 2, 1.28, 0.75),
    ('06:00:00', 1, 1, 5, 2.85, 2.28),
    ('07:00:00', 2, 3, 9, 5.57, 5.21),
    ('08:00:00', 0, 1, 18, 8.71, 10.42),
    ('09:00:00', 2, 9, 30, 20.0, 19.07),
    ('10:00:00', 55, 51, 45, 29.42, 28.35),
    ('11:00:00', 36, 44, 38, 33.71, 28.5),
    ('12:00:00', 51, 39, 39, 27.57, 25.42),
    ('13:00:00', 36, 41, 43, 25.85, 24.21),
    ('14:00:00', 32, 35, 36, 26.14, 25.21),
    ('15:00:00', 51, 35, 49, 28.14, 27.71),
    ('16:00:00', 41, 36, 48, 27.71, 25.64),
    ('17:00:00', 45, 30, 29, 20.42, 22.28),
    ('18:00:00', 32, 25, 25, 21.57, 18.28),
    ('19:00:00', 33, 39, 42, 22.14, 18.67),
    ('20:00:00', 25, 24, 34, 17.42, 18.92),
    ('21:00:00', 30, 35, 34, 18.71, 17.57),
    ('22:00:00', 28, 29, 23, 15.42, 15.64),
    ('23:00:00', 11, 28, 10, 9.57, 8.75);
    
    DROP TABLE IF EXISTS checkout2;

-- Criar a tabela checkout2
CREATE TABLE checkout2 (
    time TIME PRIMARY KEY,
    today INT,
    yesterday INT,
    same_day_last_week INT,
    avg_last_week DECIMAL(5, 2),
    avg_last_month DECIMAL(5, 2)
);


-- Inserir os dados na tabela checkout2
INSERT INTO checkout2 (time, today, yesterday, same_day_last_week, avg_last_week, avg_last_month)
VALUES
    ('00:00:00', 6, 9, 5, 5.0, 4.92),
    ('01:00:00', 3, 3, 2, 2.0, 1.92),
    ('02:00:00', 3, 1, 2, 0.42, 0.75),
    ('03:00:00', 0, 1, 1, 0.42, 0.46),
    ('04:00:00', 0, 0, 0, 0.14, 0.21),
    ('05:00:00', 2, 1, 1, 0.71, 0.71),
    ('06:00:00', 3, 1, 2, 1.42, 2.10),
    ('07:00:00', 10, 2, 9, 3.0, 5.03),
    ('08:00:00', 25, 0, 12, 3.71, 9.82),
    ('09:00:00', 36, 2, 27, 10.14, 17.64),
    ('10:00:00', 43, 55, 42, 26.14, 28.57),
    ('11:00:00', 44, 36, 47, 25.0, 28.28),
    ('12:00:00', 46, 51, 46, 24.0, 25.89),
    ('13:00:00', 45, 36, 31, 20.28, 24.17),
    ('14:00:00', 19, 32, 35, 19.57, 24.89),
    ('15:00:00', 0, 51, 42, 22.427, 27.78),
    ('16:00:00', 0, 41, 36, 21.57, 25.53),
    ('17:00:00', 0, 45, 19, 17.71, 22.67),
    ('18:00:00', 13, 32, 29, 16.85, 18.46),
    ('19:00:00', 32, 33, 29, 18.0, 18.21),
    ('20:00:00', 23, 25, 17, 12.14, 18.53),
    ('21:00:00', 28, 30, 23, 14.85, 17.82),
    ('22:00:00', 29, 28, 17, 12.71, 15.5),
    ('23:00:00', 17, 11, 14, 8.28, 8.75);