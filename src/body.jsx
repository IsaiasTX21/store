import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import Header from './header';
import Carousel from 'react-bootstrap/Carousel';
import { notification} from 'antd';
import 'animate.css';


function Body() {
  const [product, setproduct] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  console.log(product)
  const openNotification = (placement) => {
    api.info({
      message: `You bought it.`,
      description:
        'You will recive in your address soon',
      placement,
    });
  };
  async function API() {
    const api = await fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => setproduct(json))

  }
 
  useEffect(() => {
    API()

  }, [])

  return (
    <>
         {contextHolder}
      <Header />
      <div className='container  '>
      <div  className='m-auto '  >
    
      <Carousel  slide={true} indicators={false}  data-bs-theme="dark" >
      <Carousel.Item  interval={2000}>
        
        <img
          className="d-block m-auto  imd"
          src="https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
          alt="First slide"
          height={"480"}/>
        <Carousel.Caption>
        
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={2000}>
        <img
            className="d-block m-auto  imd"
          src="https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg"
          alt="Second slide"
          height={"480"}/>
       
        <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={2000}>
        <img
         className="d-block m-auto  imd "
          src= "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg"
          alt="Third slide"
          height={"480"}/>
          
      
        <Carousel.Caption>
    
        </Carousel.Caption>
      </Carousel.Item>

      
      <Carousel.Item interval={2000}>
        <img
         className="d-block m-auto  imd"
          src="https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg"
          alt="Third slide"
          height={"480"}/>
          
      
        <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>


    </Carousel>
      </div>
        <div className=' row '>
          {product.map((e, i) => {

            return (
             
              <div className=' text-center col-lg-4 col-md-6  ' >
                <div className="card mt-5 img-fluid " >
                  <img src={e.image} className='images m-auto mt-5 ' />
                  <div className="card-body">
                     <h6>{e.title}</h6>
                     <del  className=" text-danger  ms-auto me-auto mt-3 ">  USD$ {Number(e.price *1.2).toFixed(2)}</del>
                    <p  className="  ms-auto me-auto mb-5 " >  USD$ {e.price}</p>
                    
                  </div>
                </div>
              </div>
            )})}
        </div>
      </div>
    </>

  )
}

export default Body


