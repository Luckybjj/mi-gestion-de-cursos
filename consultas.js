// Importar dependencias
const { Pool } = require('pg');
const { rows } = require('pg/lib/defaults');

// Nueva instancia declarando el objeto de configuración
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "postgresql",
    database: "cursos",
    port: 5432,
});

// Función asíncrona que reciba como parametro el nombre de un nuevo curso
// el curso se debe agregar a la tabla cursos
const newCurso = async (nombre, nivelTecnico, fechaInicio, duracion) => {
    const SQLconsult = {
        text: `INSERT INTO curso (nombre, nivel, fecha, duracion) values ($1, $2, $3, $4) RETURNING *`,
        values: [nombre, nivelTecnico, fechaInicio, duracion],
    }
    try {
        const result = await pool.query(SQLconsult);
        return result.rows

    } catch (error) {
        console.log(`Error al agregar un nuevo curso ${error}`)
        return error
    }
}

// Función asíncrona "getCanales" que realice una consulta SQL para obetener y retornar todos los registros de la tabla "curso"
const getCurso = async () => {
    const SQLconsult = {
        text: `SELECT * FROM curso`,
    }
    try {
        const result = await pool.query(SQLconsult);
        //console.log(result.rows);
        return result.rows
    } catch (error) {
        console.log(`Error al consultar la tabla curso`);
        return error
    }
}

// Función asíncrona "editCurso" para devolver un registro actualizado luego de emitir una consulta SQL a la tabla "curso"
const editCurso = async (id, nombre, nivelTecnico, fechaInicio, duracion) => {
    const SQLconsult = {
        text: `UPDATE curso SET nombre = $2, nivel = $3, fecha = $4, duracion = $5 WHERE id = $1 RETURNING *`,
        values: [id, nombre, nivelTecnico, fechaInicio, duracion] 
    }
    try {
        const result = await pool.query(SQLconsult);
        console.log(`Curso actualizado correctamente`);
        //console.log("editCurso", result.rows)
        return result.rows
    } catch (error) {
        console.log(`Error al editar el curso ${error}`);
        return error
    }
}

// Función asíncrona "deleteCurso" que ejeute una consulta SQL para eliminar un registro de la tabla "curso"
const deleteCurso = async (id) => {
    //console.log("id", id)
    const SQLconsult = {
        text: `DELETE FROM curso WHERE id=$1 RETURNING *;`,
        values: [id]
    }

    try {
        const result = await pool.query(SQLconsult);
        console.log(`Curso eliminado correctamente`);
        //console.log(result.rowCount)
        return result.rows        
    } catch (error) {
        console.log(`Error al eliminar el curso ${error}`);
        return error
    }

}


// Exportación de un objeto con las funciones asíncronas creadas
module.exports = {
    newCurso,
    getCurso,
    editCurso,
    deleteCurso
};
