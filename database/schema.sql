DROP DATABASE IF EXISTS roam;
CREATE DATABASE roam;

\c roam;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  password VARCHAR(150) NOT NULL
);

DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  title VARCHAR(30) NOT NULL,
  body VARCHAR(255) NOT NULL
);

ALTER TABLE posts ADD FOREIGN KEY user_id REFERENCES users ("id")
