const pool = require('./bdconnect');

const getProducts = async (req, res) => {
    try {

        const response = await pool.query(`SELECT * FROM producto`);
        const productos = response.rows;

        return res.status(200).json(productos)

    } catch (e) {
        return res.status(500).json({ message: "Ocurrió un error con el servidor" })
    }
}

const createProduct = async (req, res) => {

    try {

        const { descripcion, precio_unidad, id_cotizacion,
            ancho, alto, area, precio_total, cantidad } = req.body;

        await pool.query(`INSERT INTO producto (descripcion, precio_unidad, 
                id_cotizacion, ancho, alto, area, preciototal, cantidad) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8 )`,
            [descripcion, precio_unidad, id_cotizacion,
                ancho, alto, area, precio_total, cantidad]);

        const id_producto = await pool.query(`SELECT last_value FROM producto_id_producto_seq`)
        const id = parseInt(id_producto.rows[0].last_value);

        return res.status(200).json({ id, message: 'Producto insertado correctamente' });

    } catch (e) {
        return res.status(500).json({ message: "Ocurrió un error con el servidor" })
    }
}

const deleteProduct = async (req, res) => {

    try {

        id = req.params.id;

        await pool.query(`DELETE FROM producto WHERE id_producto = $1`);

        return res.status(200).json({ message: "Producto eliminado correctamente" })

    } catch (e) {
        return res.status(500).json({ message: "Ocurrió un error con el servidor" })
    }
}

const modifyProduct = async (req, res) => {

    try {

        const { descripcion, precio_unidad, id_cotizacion,
            ancho, alto, area, precio_total, cantidad, id_producto } = req.body;

        await pool.query(`UPDATE producto SET
                descripcion = $1, 
                precio_unidad = $2, 
                id_cotizacion = $3, 
                ancho = $4, 
                alto = $5,  
                area = $6, 
                preciototal = $7, 
                cantidad = $8 
                WHERE id_producto = $9 )`,
            [descripcion, precio_unidad, id_cotizacion,
                ancho, alto, area, precio_total, cantidad, id_producto]);

        return res.status(200).json({ message: "Producto modificado correctamente" })

    } catch (e) {
        return res.status(500).json({ message: "Ocurrió un error con el servidor" })
    }
}

module.exports = {
    getProducts,
    createProduct,
    deleteProduct,
    modifyProduct
}