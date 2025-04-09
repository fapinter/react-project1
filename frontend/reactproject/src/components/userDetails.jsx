import "../assets/css/userDetails.css";
function UserDetails ({product}) {

    
    return (
        <div className="modal">

            {product.name_product != "" &&(
                <div>
                    <div className="modal-top">
                        <h1 className="title">User Details</h1>
                    </div>
                    <div className="modal-bottom">
                        <div className="modal-data">
                            <ul>
                                <li className="list-item">ID: {product.id}</li>
                                <li className="list-item">Nome: {product.name_product}</li>
                                <li className="list-item">Description: {product.description_product}</li>
                                <li className="list-item">Price: {product.price}</li>
                                <li className="list-item">On Stock: {product.stock}</li>
                                <li className="list-item">Available Online {Number(product.available_online) === 0 ? "No" : "Yes"}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            {product.name_product == "" &&(
                <h1 className="title">No User choosen to see the details</h1>
            )}
        </div>
        
    )
}

export default UserDetails;