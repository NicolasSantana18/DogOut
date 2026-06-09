CREATE DATABASE Petshop;

USE Petshop;


CREATE TABLE produto(
id INT auto_increment unique,
foto varchar(200),
nome_produto varchar(50),
descricao_produto varchar(200),
preco DOUBLE,
vendedor varchar(50),
categoria varchar(30),
quantidade INT,
marca varchar(30)
);

SELECT *
FROM produto;

DROP DATABASE petshop;