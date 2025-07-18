import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Header from './header';
import Spinner from 'react-bootstrap/Spinner';
import { notification } from 'antd';

function Men() {

  const [cart, setcart] = useState([]);
  const [products, setproducts] = useState([]);
  const [loading, setload] = useState(true)
  const [api, contextHolder] = notification.useNotification();

  const addproduct = placement => {

    api.success({
      message: "Added",
      duration: 1.5,
      description:
        'Product added successful',
      placement,
    });
  };

  const existproduct = placement => {

    api.warning({
      message: "Product",
      duration: 1.5,
      description:
        'This product already exist in the cart.',
      placement,
    });
  };


  function addToCart(productToAdd) {
    setcart((prevCart) => {

      const existingItem = prevCart.find((item) => item.id === productToAdd.id);

      if (existingItem) {
        existproduct("top")
        return prevCart.map((item) => {
          return { ...item }
        }
        );
      } else {
        let newcart = [...prevCart, { ...productToAdd, quantity: 1 }]
        localStorage.setItem("cartsave", JSON.stringify(newcart))
        addproduct("top")
        return newcart;
      }
    });
  }



  async function API() {
    let save = localStorage.getItem("cartsave")
    let newsave = JSON.parse(save)
    newsave !== null ? setcart(newsave) : setcart([])
    try {
      const api = await fetch(`https://fakestoreapi.com/products/category/men's%20clothing`);
      const json = await api.json();
      setproducts(json);
    } catch (error) {
      console.error("Erro ao buscar produtos de vestuário masculino da API:", error);
    }
    setload(false)
  }


  const organized = [...products].sort((a, b) => a.price - b.price);

  useEffect(() => {
    API();
  }, []);

  {
    if (loading) {
      return (
        <div style={{ height: "100vh" }} className=' d-flex justify-content-center align-items-center  '>
          <Spinner animation="grow" style={{ bottom: "10px" }} className='position-relative' />
          <p className='font-monospace'>loading</p>
        </div>
      )
    }
  }


  return (
    <>
      <Header cart={cart} setcart={setcart} />
      {contextHolder}
      <div className='container'>
        <div className='row'>
          {organized.map((e) => {
            return (
              <div className='text-center col-lg-4 col-md-6' key={e.id}>
                <div className="card mt-5 img-fluid">
                  <img src={e.image} className='mt-5 images m-auto' alt={e.title} />
                  <div className="card-body">
                    <h6 className="card-title">{e.title}</h6>
                    <p className="card-text"></p>
                    <del className="text-danger ms-auto me-auto mt-3">USD$ {Number(e.price * 1.2).toFixed(2)}</del>

                    <button
                      onClick={() => addToCart(e)}
                      style={{ backgroundColor: "#17214fff" }}
                      className="btn text-white ms-auto me-auto mb-5"
                    >
                      Add USD$ {e.price}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Men;