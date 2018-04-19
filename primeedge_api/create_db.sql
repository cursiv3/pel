DROP DATABASE IF EXISTS primeedge;
CREATE DATABASE primeedge;
\c primeedge;

CREATE TABLE users(
    id SERIAL NOT NULL PRIMARY KEY,
    username TEXT,
    passwd TEXT,
    email TEXT,
    register_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_update TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO users (username, passwd, email) VALUES ('test1', 'password', 'test1@email.com');