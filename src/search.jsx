import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import Header from './header';
import { useParams } from 'react-router-dom';
import { notification } from 'antd';

function Search() {
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

  const {search} = useParams()

 async function API () {
  const api = await fetch('https://fakestoreapi.com/products')
  .then(res=>res.json())
  .then(json=>setproducts(json))
 }



 useEffect(()=>{
  API()

 },[])
  const strings = search.toString()
 const filtered = products.filter((e)=>{ 
  return  e.title.toLowerCase().match(strings)}
   )


  return (
    <>
  {contextHolder}
<Header/>
<div className='container '> 
<div className=' row '>
  {filtered.map((e,i)=>{
    
  return (
     <div className=' text-center col-lg-4  col-md-6  ' > 
    <div className="card mt-5 img-fluid " >
      <img src={ e.image} className='  mt-5 images  m-auto' />
     
  <div className="card-body">
  
    <h6 className="card-title">{e.title}</h6>
    <del  className=" text-danger  ms-auto me-auto mt-3 ">  USD$ {Number(e.price *1.2).toFixed(2)}</del>
    <button  className=" btn  ms-auto me-auto mb-5 " onClick={()=> openNotification('top')}  >  USD$ {e.price}</button>
   
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

export default Search


