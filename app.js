const express = require("express");
const { randomUUID } = require("crypto");
const { response } = require("express");
const fs = require("fs")

const app = express();
app.use(express.json())

let products = []

fs.readFile("products.json", 'utf-8', (err, data) => {
    if (err) {
        console.log("Deu ruim");
    }
    else {
        products = JSON.parse(data);
    }
});

app.listen(8080, () => console.log("Servidor rodando na 8080"))

/**
 * Body => Sempre que eu quiser enviar dados pra minha aplicação
 * Params => Parâmetros de rota
 * Query => Parâmetros de query
 */

app.post("/insert_product", (request, response) => {
    const { name, price } = request.body;

    const product = { name: name, price: price, id: randomUUID() };

    products.push(product);
    CreateProductFile()

    return response.json(product)


});

app.get("/get_products", (request, response) => {
    return response.json(products)
});

app.get("/products/:id", (request, response) => {
    const { id } = request.params
    const specific_product = products.find(product => product.id === id)
    if (specific_product === undefined) {
        return response.json({ error: "No products found" });
    }
    else {
        return response.json(specific_product);
    }
});

app.put("/products/:id", (request, response) => {
    const { id } = request.params
    const { name, price } = request.body;

    const productIndex = products.findIndex(product => product.id === id)

    products[productIndex] = {
        ...products[productIndex],
        name,
        price,
    }

    CreateProductFile()

    return response.json({ message: "Produto alterado" })

});

app.delete("/products/:id/remove", (request, response) => {
    id = request.params
    productIndex = products.findIndex((product) => product.id === id)

    products.splice(productIndex, 1)

    CreateProductFile()

    return response.json({ message: "Product removed" })


});

function CreateProductFile() {
    fs.writeFile("products.json", JSON.stringify(products), (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Product list updated")
        }
    })

}