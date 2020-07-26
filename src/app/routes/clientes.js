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
                "SELECT COUNT(*) AS TOTAL FROM `CLIENTES`",
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

    app.get("/todos-clientes", async(req, res) => {
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
            `SELECT * FROM CLIENTES`,
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

    app.get("/todos-clientes", async(req, res) => {
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
            // `SELECT * FROM CELULARES LIMIT 7 OFFSET ${desde}`,
            `SELECT * FROM CLIENTES`,
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



};