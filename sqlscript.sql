-- Crear base de datos
CREATE DATABASE cursos;
-- Crear tabla
CREATE TABLE curso (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    nivel INT,
    fecha DATE,
    duracion INT
);

