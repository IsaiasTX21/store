import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Header from './header';
import Spinner from 'react-bootstrap/Spinner';
import { notification } from 'antd';

function Home() {



  const [cart, setcart] = useState([]);
  const [product, setproduct] = useState([]);
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
      const api = await fetch('https://fakestoreapi.com/products');
      const json = await api.json();
      setproduct(json);
    } catch (error) {
      console.error("Erro ao buscar produtos da API:", error);
    }
    setload(false)
  }

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
        <div className='m-auto'>
          <Carousel slide={true} indicators={false} data-bs-theme="dark">
            <Carousel.Item interval={2000}>
              <img
                className="d-block m-auto imd"
                src="https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
                alt="First slide"
                height={"480"} />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item interval={2000}>
              <img
                className="d-block m-auto imd"
                src="https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg"
                alt="Second slide"
                height={"480"} />
            </Carousel.Item>

            <Carousel.Item interval={2000}>
              <img
                className="d-block m-auto imd"
                src="https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg"
                alt="Third slide"
                height={"480"} />
            </Carousel.Item>

            <Carousel.Item interval={2000}>
              <img
                className="d-block m-auto imd"
                src="https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg"
                alt="Third slide"
                height={"480"} />
            </Carousel.Item>
          </Carousel>
        </div>

        <div className='row'>
          {product.map((e, i) => {
            return (
              <div className='text-center col-lg-4 col-md-6' key={e.id}> {/* Use e.id como key */}
                <div className="card mt-5 img-fluid">
                  <img src={e.image} className='images m-auto mt-5' alt={e.title} /> {/* Adicione alt text */}
                  <div className="card-body">
                    <h6>{e.title}</h6>
                    <del className="text-danger ms-auto me-auto mt-3">USD$ {Number(e.price * 1.2).toFixed(2)}</del>
                    {/* Chame a função addToCart com o produto 'e' */}
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

export default Home;