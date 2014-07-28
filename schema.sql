DROP DATABASE IF EXISTS social_app;

CREATE DATABASE social_app;

\c social_app

CREATE TABLE IF NOT EXISTS people (
  id serial primary key,
  firstname varchar(25),
  lastname varchar(25),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);


\d+ people

INSERT INTO people (firstname, lastname) VALUES ('bob', 'doe');
INSERT INTO people (firstname, lastname) VALUES ('joe', 'dilly');
INSERT INTO people (firstname, lastname) VALUES ('jane', 'cat');
