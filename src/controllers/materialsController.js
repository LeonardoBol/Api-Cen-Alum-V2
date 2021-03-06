const pool = require('./bdconnect');

const getMaterial = async (req,res) => {
    try{

        const response = await pool.query(`SELECT * FROM material`);
        const materials = response.rows;

        return res.status(200).json(materials)

    }catch(e){
        return res.status(500).json({ message: "Ocurrió un error con el servidor" })
    }
}

const createMaterial = async (req, res) => {

    try {

        const { referencia, descripcion, precio } = req.body;

        await pool.query(`INSERT INTO material (referencia, descripcion, 
                precio) VALUES (
                    $1, $2, $3)`,
            [referencia, descripcion, precio]);

        const id_material = await pool.query(`SELECT last_value FROM material_id_material_seq`)
        const id = parseInt(id_material.rows[0].last_value);

        return res.status(200).json({id, message: 'Material insertado correctamente'});

    } catch (e) {
        return res.status(500).json({ message: "Ocurrió un error con el servidor" })
    }
}

const deleteMaterial = async (req, res) => {

    try {

        id = req.params.id;

        await pool.query(`DELETE FROM material WHERE id_material = $1`, [id]);

        return res.status(200).json({ message: "Material eliminado correctamente" })

    } catch (e) {
        return res.status(500).json({ message: "Ocurrió un error con el servidor" })
    }
}

const modifyMaterial= async (req, res) => {

    try {

        const { referencia, descripcion, precio } = req.body;

        const id = req.params.id;

        await pool.query(`UPDATE material SET referencia = $1, descripcion = $2, 
                precio = $3 WHERE id_material = $4`,
            [referencia, descripcion, precio, id]);

        return res.status(200).json({ message: "Material modificado correctamente" })

    } catch (e) {
        return res.status(500).json({ message: "Ocurrió un error con el servidor" })
    }
}


module.exports = {
    getMaterial,
    createMaterial,
    deleteMaterial,
    modifyMaterial
}