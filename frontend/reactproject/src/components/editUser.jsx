import "../assets/css/userForm.css";
import { useState } from 'react';

function EditUser ({product, clearProduct, selectProduct}) {

    const [message_create, setCreate] = useState("");
    const [message_edit, setEdit] = useState("");

    const [formCreate, setFormCreate] = useState({
        name_product  : "",
        description_product  : "",
        price : "",
        stock : "",
        available_online : ""
    });

    const [formUpdate, setFormUpdate] = useState({
        id : String(product.id),
        name_product  : product.name_product,
        description_product  : product.description_product,
        price : String(product.price),
        stock : String(product.stock),
        available_online : String(product.available_online)
    });

    const handleInputCreate = (e) => {
        setFormCreate((prevFormCreate) => ({
            ...prevFormCreate,
            [e.target.name]: e.target.value
        }));
    };

    const handleInputUpdate = (e) => {
        setFormUpdate((prevFormUpdate) => ({
            ...prevFormUpdate,
            [e.target.name]: e.target.value
        }));
    }

    const createProduct = async (e) =>{
        e.preventDefault();

        for (const key in formCreate) {
            if (!formCreate[key].trim()) {
                setCreate("Please fill all the inputs in the form!");
                return; // Para a execução da função
            }
        }

        //Try used in case the connection with the server is unavailable
        try{
            const response = await fetch("http://localhost:8800/create", {
                method : "POST",
                headers: { "Content-Type": "application/json" },
                body : JSON.stringify(formCreate)
            });

            const data = await response.json();

            if (response.ok){
                setCreate("Product successfully added");
                setFormCreate({ id : "", name_product : "", description_product : "",
                    price : "", stock : "", available_online : ""
                });
            }
            else setCreate("Error adding user" + data.message);
        }
        catch ( error ) {
            setCreate("Error connecting to the server");
        }
    }

    const updateProduct = async (e) =>{
        e.preventDefault();

        for (const key in formUpdate){
            if (!formUpdate[key].trim()) {
                setEdit("Please fill all the inputs in the form!");
                return; // Para a execução da função
            }
        }

        //Try used in case the connection with the server is unavailable
        try{
            const response = await fetch("http://localhost:8800/update", {
                method : "PUT",
                headers: { "Content-Type": "application/json" },
                body : JSON.stringify(formUpdate)
            });

            const data = await response.json();

            if (response.ok){
                setEdit("Product successfully updated");
                selectProduct({
                    id : formUpdate.id,
                    name_product : formUpdate.name_product,
                    description_product : formUpdate.description_product,
                    price : formUpdate.price,
                    stock : formUpdate.stock,
                    available_online : formUpdate.available_online
                });
            }
            else setEdit("Error updating product" + data.message);
        }
        catch ( error ) {
            setEdit("Error connecting to the server");
        }
    }

    const deleteProduct = async () =>{
        try{
            const response = await fetch("http://localhost:8800/delete", {
                method : "DELETE",
                headers: { "Content-Type": "application/json" },
                body : JSON.stringify(product)
            });

            const data = await response.json();

            if ( response.ok ){
                alert("Product Successfully deleted");
            }
            else alert("Error deleting product", data.message);
        }
        catch ( err ){
            alert("Error connecting to the server");
        }
        clearProduct();
    }


    return(
        <div className="container">
            <div className="container-left">
                <div className="container-left-top">

                    <h1 className="title">Create Product</h1>
                    <div className="flex-form-message">
                        <form className="form">
                            <input className="form-input" name="name_product" type="text" placeholder="Name"
                            value={formCreate.name_product} onInput={handleInputCreate}></input>

                            <input className="form-input" name="description_product" type="text" placeholder="Description"
                            value={formCreate.description_product} onInput={handleInputCreate}></input>

                            <input className="form-input" name="price" type="number" placeholder="R$ price"
                            value={formCreate.price} onInput={handleInputCreate}></input>

                            <input className="form-input" name="stock" type="number" placeholder="Number on stock"
                            value={formCreate.stock} onInput={handleInputCreate}></input>

                            <select className="form-input" name="available_online"
                            value={formCreate.available_online === 1 ? "Yes" : "No"} onInput={handleInputCreate}>
                                <option value="">Available Online?</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </form>
                    </div>

                    {message_create && <p className="message">{message_create}</p>}

                    <div className="div-btn-form">
                        <button className="btn-form" onClick={createProduct}>Create Product</button>
                    </div>
                    
                </div>
                <div className="div-btn-del">
                    <button className="btn-del" onClick={deleteProduct}>Delete {product.name_product}</button>
                </div>
                
            </div>

            <div className="container-right">

                <h1 className="title">Edit Product</h1>
                <div className="flex-form-message">
                    <form className="form">
                        <input className="form-input" name="name_product" placeholder={formUpdate.name_product}
                        value={formUpdate.name_product} onInput={handleInputUpdate}></input>

                        <input className="form-input" name="description_product" placeholder={formUpdate.description_product}
                        value={formUpdate.description_product} onInput={handleInputUpdate}></input>

                        <input className="form-input" name="price" placeholder={formUpdate.price}
                        value={formUpdate.price} onInput={handleInputUpdate}></input>

                        <input className="form-input" name="stock" placeholder={formUpdate.stock}
                        value={formUpdate.stock} onInput={handleInputUpdate}></input>

                        <select className="form-input" name="available_online"
                        onInput={handleInputUpdate}>
                            <option value="">Available Online?</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </form>
                </div>
                {message_edit && <p className="message">{message_edit}</p>}
                <div className="div-btn-form">
                    <button className="btn-form" onClick={updateProduct}>Update Product</button>
                </div>
            </div>
        </div>
    )
}

export default EditUser;