import pool from "../databaseConnection.js";

const getAll = async (req, res)=>{
    let rows;
    let status;
    try{
        [ rows ] = await pool.query('SELECT numEt, nomEt, prenoms, note_math, note_pc, classe, ROUND((note_math + note_pc) / 2, 2) AS moyenne FROM etudiant')
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
        [ rows ] = await pool.execute('SELECT numEt, nomEt, prenoms, note_math, note_pc FROM etudiant WHERE numEt = ?', [req.params.id])
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
        const [ result ] = await pool.execute('DELETE FROM etudiant WHERE numEt = ?', [req.params.id])
        if(result.affectedRows == 0) {
            status = 404
            response.message = `Aucun etudiant portant le numéro: ${req.params.id}`
        }else {
            status = 200
            response.success = true
            response.message = 'Etudiant supprimé'
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
        const { nomEt, prenoms, note_math, note_pc, classe } = req.body
        const [ result ] = await pool.execute('INSERT INTO etudiant(nomEt, prenoms, note_math, note_pc, classe) VALUES(?, ?, ?, ?, ?)',
        [nomEt, prenoms, note_math, note_pc, classe])

        if(result.affectedRows > 0){
            status= 200
            response.success = true
            response.message = 'Etudiant ajouté avec succès'
        }else{
            status = 500
            response.message = 'Aucun etudiant ajouté'
        }
    } catch (error) {
        status = 500
        response.message = `Erreur lors de l'insertion: ${error.message}`
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
        const { nomEt, prenoms, note_math, note_pc } = req.body
        const [result] = await pool.execute('UPDATE etudiant SET nomEt = ?, prenoms = ?, note_math = ?, note_pc = ? WHERE numEt = ?',
        [nomEt, prenoms, note_math, note_pc, req.params.id])
        if (result.affectedRows > 0) {
            status = 200;
            response.success = true
            response.message = 'Modification bien effectuée'
        } else {
            status = 404;
            response.message = `Aucun étudiant correspond au numéro: ${req.params.id}`
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