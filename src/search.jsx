import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import Header from './header';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { notification } from 'antd';

function Search() {

  
  const [products,setproducts ] = useState([]);
  const {search} = useParams()
   const [loading, setload] = useState(true)
 const [cart,setcart] = useState([])

 
       const [api, contextHolder] = notification.useNotification();
 
   const addproduct = placement => {
 
     api.success({
       message: "Added",
           duration:1.5,
       description:
         'Product added successful',
       placement,
     });
   };
 
   
   const existproduct = placement => {
 
     api.warning({
       message: "Product",
           duration:1.5,
       description:
         'This product already exist in the cart.',
       placement,
     });
   };
 

  function Cart(productToAdd) {
    
    setcart((prevCart) => { 
    
      const existingItem = prevCart.find((item) => item.id === productToAdd.id);

      if(existingItem){
        existproduct("top")
    return prevCart.map((item)=>{
      return {...item}
    })
      
      }
      else{
      let newcart = [...prevCart, { ...productToAdd, quantity: 1 }]
        localStorage.setItem("cartsave",JSON.stringify(newcart))
        addproduct("top")
        return newcart;
      }
  })}


 useEffect(()=>{

 async function API () {
        let save =  localStorage.getItem("cartsave")
  let newsave = JSON.parse(save)
   newsave !== null ? setcart(newsave) : setcart([])

  try{
  const api = await fetch('https://fakestoreapi.com/products')
  .then(res=>res.json())
  .then(json=>setproducts(json))
  } catch (error){
   throw new Error (error)
  }
   setload(false)
 }

API() 
},[])


  const strings = search.toString()
 const filtered = products.filter((items)=>{ 

   let searching = items.title.toLowerCase().match(strings) 

 return searching
   
 
})

  {if(loading){
     return (
      <div style={{height:"100vh"}} className=' d-flex justify-content-center align-items-center  '>
      <Spinner animation="grow" style={{bottom:"10px"}}  className='position-relative'/> 
       <p className='font-monospace'>loading</p>
      </div>
     )
  }}


  return (
    <>

   <Header cart={cart} setcart={setcart}/>
         {contextHolder}
<div className='container '> 
<div className=' row '>
  {filtered.length > 0 ?   
   filtered.map((items)=>{
    
  return (
     <div className=' text-center col-lg-4  col-md-6  ' > 
    <div className="card mt-5 img-fluid " >
      <img src={ items.image} className='  mt-5 images  m-auto' />
     
  <div className="card-body">
  
    <h6 className="card-title">{items.title}</h6>
    <del  className=" text-danger  ms-auto me-auto mt-3 ">  USD$ {Number(items.price *1.2).toFixed(2)}</del>
   
     <button onClick={()=> { return Cart(items)}} style={{backgroundColor:"#313C4E"}} className=" btn text-white   ms-auto me-auto mb-5 " >
      Add  USD$ {items.price}</button>
  </div>
</div>
</div>
   )


  }): <div style={{height:"50vh" , top:"18vh", backgroundColor:"#1B1F30"}} className='position-relative container d-flex justify-content-center align-items-center'> 
  <p style={{fontSize:"40px"}} className='text-white'> Item not found.</p></div >} 
  
  </div>
      </div>
    </>

  )
}

export default Search


