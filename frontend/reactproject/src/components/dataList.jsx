import { useEffect, useState} from 'react';
import "../assets/css/dataList.css";
function DataList( {setItemClicked} ){

  //Data received from the backend
  const [data, setData] = useState([]);
  const [currPage, setCurrPage] = useState(1);


  const products_per_page = 5;

  const total_pages = Math.ceil(data.length / products_per_page);
  const last_product = products_per_page * currPage;
  const first_product = last_product - products_per_page;
  //Data shown to the user on the list based on the pages
  const curr_products = data.slice(first_product, last_product);


  //Page and Update button handlings
  const handleNextPage = () => {
    if (currPage < total_pages) setCurrPage(currPage + 1);
    else alert("Current page is the last");
  };

  const handlePreviousPage = () => {
    if (currPage > 1) setCurrPage(currPage - 1);
    else alert("Current page is the first");
  };

  const handleUpdate = () => {
    fetchData();
    setCurrPage(1);
  }
  const handleDetails = (item) => {
    setItemClicked(item);
    console.log(item.name_product);
    alert("Product "+ item.name_product +" moved to Details");
  }

  //Fetch to the backend
  const fetchData = async () => {
    fetch("http://localhost:8800/products")
      .then(response => response.json())
      .then(data => {
        console.log('Data received from the BACKEND', data);
        setData(data);
      })
      .catch( error => console.error("Erro accessing the db: ", error))
  }

  useEffect(() => {
    console.log("Componente montado");
    fetchData();
  }, []);
  
  return(
    <div className="list-container">
        <h1 className="list-name">Users List</h1>
        <ul className="list">
            {curr_products.map((product) => (
            <li key={product.id}className="item-list">
                Name: {product.name_product}<br />
                Price: R$ {product.price}.00<br />
                <button  className="btn-details" onClick={() => handleDetails(product)}>Go to Details</button>
            </li>
            
            ))}
        </ul>
        <div className="dataList-button-div">
          
          <div className="dataList-button-left">
            <button onClick={handleUpdate} className="btn-update" >Update List</button>
          </div>
          <div className="dataList-button-right">
            <button onClick={handlePreviousPage} className="btn-prev">Previous Page</button>
            <button onClick={handleNextPage} className="btn-next">Next Page</button>
          </div>
            
        </div>
    </div>
  )

}

export default DataList;