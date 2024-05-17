import pool from "../databaseConnection.js";

const getAll = async (req, res)=>{
    let rows;
    let status;
    try{
        [ rows ] = await pool.query('SELECT * FROM classe ORDER BY idClasse')
        status = 200
    }catch(err) {
        rows = []
        status = 500
    }
    res.status(status).json(rows)
}

const getOne = async (req, res)=>{
    let rows;
    let status;
    try{
        [ rows ] = await pool.execute('SELECT * FROM classe WHERE idClasse = ?', [req.params.id])
        status = 200
    }catch(err) {
        rows = []
        status = 500
    }
    res.status(status).json(rows)
}

const deleteOne = async (req, res)=>{
    let response = {
        success : false,
        message : ''
    }
    let status;
    try{
        const [ result ] = await pool.execute('DELETE FROM classe WHERE idClasse = ?', [req.params.id])
        if(result.affectedRows == 0) {
            status = 404
            response.message = `La classe '${req.params.id}' n'existe pas`
        }else {
            status = 200
            response.success = true
            response.message = 'Suppression bien effectuée'
        }
    }catch(err) {
        response.message = `Erreur lors de la suppression: ${err.message}`
        status = 500
    }
    res.status(status).json(response)
} 

const create = async (req, res)=>{
    let response = {
        success: false,
        message: ''
    }
    let status;
    try {
        const { idClasse, niveau } = req.body
        const [ result ] = await pool.execute('INSERT  INTO classe VALUES(?, ?)',
        [idClasse, niveau])

        if(result.affectedRows > 0){
            status= 200
            response.success = true
            response.message = `La classe ${idClasse} est crée avec succès`
        }else{
            status = 500
            response.message = 'Aucun enregistrement effectué'
        }
    } catch (error) {
        status = 500
        response.message = `Erreur lors de la création: ${error.message}`
    }
    res.status(status).json(response)
}

const update = async (req, res)=>{
    let status;
    let response = {
        success: false,
        message: ''
    }

    try {
        const { idClasse, niveau } = req.body
        const [result] = await pool.execute('UPDATE classe SET idClasse = ?, niveau = ? WHERE idClasse = ?',
        [idClasse, niveau, req.params.id])
        if (result.affectedRows > 0) {
            status = 200;
            response.success = true
            response.message = 'Modification bien effectuée'
        } else {
            status = 404;
            response.message = `La classe ${req.params.id} n'est pas presente dans la base de donnée`
        }
    } catch (error) {
        status = 500
        response.message = `Erreur lors de la modification : ${error.message}`
    }
    res.status(status).json(response)
}

export {
    create,
    getAll,
    getOne,
    deleteOne,
    update
}