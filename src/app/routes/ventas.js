const dbConnection = require("../../config/dbConnection");
const { v4: uuidv4 } = require("uuid");

module.exports = (app) => {
    const connection = dbConnection();
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    });
    const n_registros = () => {
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT COUNT(*) AS TOTAL FROM `VENTAS`",
                (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result[0].TOTAL);
                    return;
                }
            );
        });
    };

    app.get("/todos-ventas", async(req, res) => {
        //let desde = req.query.desde || 0;
        //desde = Number(desde);
        total = 0;
        await n_registros()
            .then((data) => {
                total = data;
            })
            .catch((err) => {
                console.error(err);
            });
        connection.query(
            //`SELECT * FROM CLIENTES LIMIT 7 OFFSET ${desde}`,
            `SELECT * FROM VENTAS`,
            (err, result) => {
                if (err)
                    return res.status(400).json({
                        ok: false,
                        err,
                    });
                return res.json({
                    ok: true,
                    result,
                    total,
                });
            }
        );
    });

    const cod = uuidv4();

    app.post("/insertar-venta", (req, res) => {
        const {
            cedula_cliente,
            cedula_usuario,
        } = req.body;
        connection.query(
            "INSERT INTO VENTAS SET?", {
                codigo_venta: uuidv4(),
                cedula_cliente,
                cedula_usuario,
                fecha: new Date()
            },
            (err, result) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err,
                    });
                }
                res.json({
                    ok: true,
                    result
                });
            }
        );
    });



};