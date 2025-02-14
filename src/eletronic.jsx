import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import Header from './header';
import { notification } from 'antd';



function Electronic() {
  const [products,setproducts ] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: `You bought it.`,
      description:
        'You will recive in your address soon',
      placement,
    });
  };

 async function API () {
  const api = await fetch('https://fakestoreapi.com/products/category/electronics')
  .then(res=>res.json())
  .then(json=>setproducts(json))
 }

const organized = products.sort((a,b)=> a.price - b.price )
 useEffect(()=>{
  API()

 },[])

  return (
    <>
    {contextHolder}
<Header/>
<div className='container '> 
<div className=' row '>
  {organized.map((e,i)=>{
    
  return (
     <div className=' text-center col-lg-4  col-md-6  ' > 
    <div className="card mt-5 img-fluid " >
      <img src={ e.image} className='mt-5 images  m-auto' />
     
  <div className="card-body">
  
    <h6 className="card-title">{e.title}</h6>
    <p className="card-text"></p>
    <button  onClick={()=> openNotification("top")}  className="btn btn-dark ms-auto me-auto mb-3 "   > USD$ {e.price}</button>
   
  </div>
</div>

</div>
   )


  })}
  
  </div>
      </div>
    </>

  )
}

export default Electronic


