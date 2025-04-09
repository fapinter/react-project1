import {db} from "../db.js";


//Function to get all the products from the database
export const getProducts = ( _ , res) => {

    const query = "SELECT * FROM products";
    db.query(query, (err, data)=>{
        if (err) return res.json(err);
        return res.status(200).json(data);
    });
}


export const createProducts = (req, res) => {

    const { name_product , description_product , price , stock , available_online } = req.body;
    console.log("Data sent to the backend",req.body);


    //Verifying data
    if (isNaN(parseFloat(price))){
        return res.status(400).json({message : "invalid value for price ", price});
    }
    if (!Number.isInteger(parseInt(stock))){
        return res.status(400).json({message : "invalid value for stock", stock});
    }
    
    const addProduct = "INSERT INTO products (name_product, description_product, price, stock, available_online)"+
    " VALUES (?, ?, ?, ?, ?)";

    db.query(addProduct, [name_product, description_product, price, stock, available_online], (err, result) => {
        if (err) {
            return res.status(500).json({message : "Error creating user", error: err});
        }

        res.status(201).json({ message : "Product successfuly added"})
    });
}

export const updateProducts = (req, res) => {

    const {id, name_product, description_product, price, stock, available_online } = req.body;
    console.log("Data sent to the backend: ", req.body);

    //Verifying data
    if (isNaN(parseFloat(price))){
        return res.status(400).json({message : "invalid value for price ", price});
    }
    if (!Number.isInteger(parseInt(stock))){
        return res.status(400).json({message : "invalid value for stock", stock});
    }

    const query = "UPDATE products SET name_product= ?, description_product= ?, price= ?,"+
    " stock=?, available_online=? WHERE id= ?";
    db.query(query, [name_product, description_product, price, stock, available_online, id], (err, result) => {
        
        if( err ){
            console.log(err);
            return res.status(500).json({message : " db error", erro : err});
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "product not found" });
        }
        
        res.status(201).json({message : "product successfully updated"});
    });
    
}

export const deleteProducts = (req, res) => {

    const {id, name_product, description_product, price, stock, available_online} = req.body;
    console.log("Dados sent to the backend ", req.body);

    const query = "DELETE FROM products WHERE id = ?";

    db.query(query, [id], (err, result) => {
        if ( err ){
            return res.status(500).json({message : " db error", erro : err});
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({message : " product not found"});
        }

        res.status(201).json({message : " product successfully deleted"});
    });
}