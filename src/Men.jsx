import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import Header from './header';
import { notification } from 'antd';



function  Men() {
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
    const api = await fetch(`https://fakestoreapi.com/products/category/men's%20clothing`)
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
    <del  className=" text-danger  ms-auto me-auto mt-3 ">  USD$ {Number(e.price *1.2).toFixed(2)}</del>
    <p  className="  ms-auto me-auto mb-5 " >  USD$ {e.price}</p>
   
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

export default Men


