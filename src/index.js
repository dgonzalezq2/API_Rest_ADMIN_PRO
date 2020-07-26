const app = require("./config/server");

require("./app/routes/clientes.js")(app);
require("./app/routes/celulares.js")(app);
require("./app/routes/ventas.js")(app);
require("./app/routes/detalle_venta.js")(app);
require("./app/routes/factura.js")(app);

// Start the server

try {
    app.listen(app.get("port"), () => {
        console.log("server on port", app.get("port"));
    });
} catch (error) {
    console.log("error")
}