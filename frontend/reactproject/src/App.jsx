import './assets/css/dataList.css';
import './App.css';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import DataList from './components/dataList.jsx';
import EditProduct from './components/editProduct.jsx';
import ProductDetails from './components/productDetails.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {

  const [product, setProduct] = useState({
    id : "",
    name_product : "",
    description_product : "",
    price : "",
    stock : "",
    available_online : ""
  });

  const selectProduct = (dataReceived) =>{
    setProduct(dataReceived);
  }
  const clearProduct = () =>{
    setProduct({
      id: "",
      name_product : "",
      description_product : "",
      price : "",
      stock : "",
      available_online : ""
    });
  }

  useEffect(() => {
    if(product && product.id){
      console.log("Produto alterado com sucesso", product);
    }
  }, [product]);
    
  //Listagem padrão dos usuários
  return (
    <Router>
      <Header />
      <div className="main">
        <Routes>
          <Route exact path="/" element={<DataList setItemClicked={selectProduct}/>} />
          <Route exact path="/edit" element={<EditProduct product={product} clearProduct={clearProduct} selectProduct={selectProduct}/>}/>
          <Route exact path="/details" element={<ProductDetails product={product}/>}/>
        </Routes>
      </div>
      <Footer />
    </Router>

  );
}

export default App;
