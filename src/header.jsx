import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {useNavigate } from 'react-router-dom';
import Cart from "./assets/icons8-carrinho-50.png"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form"
import { notification } from 'antd';
import card from "../src/assets/card.png"
import card2 from "../src/assets/card2.png"




function Header({ cart, setcart }) {
  const { register,handleSubmit,reset,formState: { errors }} = useForm()
  const [api, context] = notification.useNotification();

  const [modalshow, setmodalShow] = useState(false);
  const modalClose = () => setmodalShow(false);
  const modalShow = () => setmodalShow(true);

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const handleCloseMobileMenu = () => setShowMobileMenu(false);
  const handleShowMobileMenu = () => setShowMobileMenu(true);

  const [showCartOffcanvas, setShowCartOffcanvas] = useState(false);
  const handleCloseCartOffcanvas = () => setShowCartOffcanvas(false);
  const handleShowCartOffcanvas = () => setShowCartOffcanvas(true);



  localStorage.setItem("cartsave", JSON.stringify(cart))

  const updateItemQuantity = (itemId, newQuantity) => {

   

    if (newQuantity <= 0) {
      return setcart((prev) => {
        return prev.map((items) => items.id == itemId ? { ...items, quantity: "" } : items)
      })
    }

    setcart(prevCart => prevCart.map(item =>item.id === itemId? { ...item, quantity: parseInt(newQuantity)}:item));};


  const trash = (id) => {
    setcart((prev) => prev.filter((item) => item.id !== id));
  };

  const exclude = () => {
    setcart((prev) => prev.filter((item) => item.id * item.quantity > 0) )}

    const payment = (data)=>{
      console.log((data))
      modalClose()
     setcart((prev)=>{ 
      return prev.filter((item)=> item !== item)
     }) 
     reset()
      sucessul()
      handleCloseCartOffcanvas()
      }

 const sucessul = (placement = "top")=>{
     api.success({
      message: "sucessul",
      duration: 5,
      description:
        'Thank you for buying with us.',
      placement,
    });
     
 }


  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const cartElements = cart.map((item, index) => {

    const itemTotalPrice = item.price * item.quantity;
    return (
      <div id='cartelement' key={index} style={{ height: "120px" }} className='d-flex justify-content-evenly align-items-center mt-2'>
        <img className='cartimg' width="100px" height="100px" src={item.image} alt={item.title || "Product Image"} />
        <input

          onChange={(event) => updateItemQuantity(item.id, event.target.value)}
          style={{ height: "40px",width:"100px"}}
          className='form-control'
          type="number"
          min={1}
          value={item.quantity}
        />
        <span>USD${itemTotalPrice.toFixed(2)}</span>
        <button onClick={() => trash(item.id)} style={{ height: "40px", backgroundColor: "#2F3A4C" }} className='btn text-white'>delete</button>
      </div>
    );
  });


  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim() === "") {
      return;
    }
    navigate(`/search/${search.toLowerCase()}`);
  };

  return (
    <>
        {context}
      <header className='sticky-top'>
        <nav style={{ height: "70px", backgroundColor: "#1B1F30" }} className='d-md-none d-flex align-items-center'>
      
          <Modal show={modalshow} onHide={modalClose}>
            <Modal.Header closeButton>
              <Modal.Title > <h1 id="break">Payment USD$ {totalPrice.toFixed(2)}</h1></Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Form onSubmit={handleSubmit(payment)}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Full name</Form.Label>
                  <Form.Control
                  placeholder='Your name'
                  

                     {...register("text",{required:true})}
                    autoFocus

                  />
                   {errors.text && <span className='text-danger' >Write your full name</span>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    {...register("email", {required:true, pattern:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi })}/>
                      {errors.email && <span className='text-danger' >Email invalid</span>}
                </Form.Group>

                <Form.Group
                  className="mb-3">
                  <Form.Label>Card <img width={40} src={card} alt="credit card" /> <img width={35} src={card2} alt="credit card2" /></Form.Label>
                  <Form.Control placeholder='12345678' {...register("number",{required:true, minLength:8, maxLength:12})}  type='number' rows={3} />
                      {errors.number && <span className='text-danger' >It's need to have at least 8 numbers and max 12 numbers</span>}
                </Form.Group>

                <Modal.Footer className='d-flex justify-content-center'>
                    <button type='submit' style={{width:"50%", backgroundColor:"#1233c4ff"}} className='  btn text-white  '>Finish</button>
                   <button type='button' style={{width:"50%"}} className='  btn text-white  bg-danger' onClick={modalClose}>cancel</button>
                </Modal.Footer>
              </Form>

            </Modal.Body>
          </Modal>

          <Offcanvas show={showMobileMenu} style={{ width: "50vw" }} onHide={handleCloseMobileMenu}>
            <Offcanvas.Header className='w-100 p-0 ' style={{ backgroundColor: "#1B1F30", height: "70px" }} >
              <Offcanvas.Title  className='d-flex justify-content-center text-white m-auto w-100  p-0 '> <h1 >menu</h1></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className='d-flex justify-content-center align-items-md-center row'>
                <ul className='m-auto text-center'>
                  <li><a className="nav-link m-3 font-monospace" onClick={() => { navigate("/"); handleCloseMobileMenu(); }}>Home</a> </li>
                  <li> <a className="nav-link m-3  font-monospace" onClick={() => { navigate(`/electronic`); handleCloseMobileMenu(); }}>Eletronics </a></li>
                  <li><a className="nav-link m-3 font-monospace" onClick={() => { navigate("/jewelery"); handleCloseMobileMenu(); }}>Jewelery</a></li>
                  <li><a className="nav-link m-3 font-monospace" onClick={() => { navigate("/mens clothing"); handleCloseMobileMenu(); }}>Men's</a></li>
                  <li><a className="nav-link m-3 font-monospace" onClick={() => { navigate("/womens clothing"); handleCloseMobileMenu(); }}>Women's</a></li>
                </ul>
              </div>
            </Offcanvas.Body>
          </Offcanvas>


          <Offcanvas style={{ width: "100%" }} placement='end' show={showCartOffcanvas} onHide={() => { return handleCloseCartOffcanvas(), exclude() }}>
            <Offcanvas.Header style={{ backgroundColor: "#1B1F30" }} className='d-flex justify-content-center ' >
              <Offcanvas.Title className='m-auto w-100  text-center text-white'  >
                <h1 id='break'> Total  USD$ {totalPrice.toFixed(2)}</h1>
                 {cart.length >0 && totalPrice >0 &&(<>  <button  style={{backgroundColor:"#1233c4ff",width:"100px"}} className=' btn text-white me-3' onClick={modalShow}>payment</button></>)}
                <button style={{width:"100px"}} className='   btn text-white  bg-danger' onClick={()=> {return handleCloseCartOffcanvas(), exclude()}}>back</button>        
                
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

              {cart.length > 0 ? cartElements : <p className="text-center">Seu carrinho está vazio.</p>}
              {cart.length > 0 && totalPrice > 0 && (<div className='d-flex w-100 justify-content-center'>
              </div>)}       

            </Offcanvas.Body>
          </Offcanvas>

          <Button variant='' className='border-0' style={{ width: "50px", height: "48px" }} onClick={handleShowMobileMenu}>
            <img width="40" height="40" src="https://img.icons8.com/fluency/48/menu--v1.png" alt="menu-v1" />
          </Button>
          <div onClick={handleShowCartOffcanvas} className='ms-2 me-2' > <span className='text-white position-relative bg-danger '
            style={{ fontSize: "16px", paddingRight: "7px", paddingLeft: "7px", paddingTop: "1px", paddingBottom: "1px", borderRadius: "50%", top: "-5px", left: "12px" }}>{cart.length}
          </span> <img style={{ cursor: "pointer", width: "30px", position: "relative", bottom: "7px" }} src={Cart} alt="Cart" /> </div>
          <input style={{ height: "48px" }} onChange={(e) => setSearch(e.target.value)} className='form-control'></input>
          <button style={{ height: "48px", backgroundColor: "#C68E6F" }} onClick={handleSearch} className='btn text-white me-2'>search</button>
        </nav>
      

        <nav style={{ backgroundColor: "#1B1F30" }} className="middle navbar navbar-expand-md sticky-top">
          <div className='container d-flex align-items-center'>
          
            <ul className="collapse navbar-collapse justify-content-between p-0 m-0" id="navbarNavAltMarkup">
              <li><a className="nav-link m-3 text-white" onClick={() => navigate("/")}>Home</a></li>
              <li> <a className="nav-link m-3 text-white" onClick={() => navigate(`/electronic`)}>Electronics</a></li>
              <li> <a className="nav-link m-3 text-white" onClick={() => navigate("/jewelery")}>Jewelery</a></li>
              <li> <a className="nav-link m-3 text-white" onClick={() => navigate("/mens clothing")}>Men's</a></li>
              <li><a className="nav-link m-3 text-white" onClick={() => navigate("/womens clothing")}>Women's</a></li>
              <div className='d-flex justify-content-center ' onClick={handleShowCartOffcanvas}>   <img className='' style={{ width: "30px", cursor: "pointer" }} src={Cart} alt="Cart" />
                <span  className='text-white position-relative bg-danger ' style={{cursor:"pointer", borderRadius: "50%", paddingRight: "10px", paddingLeft: "10px", paddingTop: "1px", paddingBottom: "1px", fontSize: "18px", top: "-15px", right: "5px" }}>
                  {cart.length}</span></div>
              <div className='d-flex'>
                <input onChange={(e) => setSearch(e.target.value)} className='form-control'></input>
                <button style={{ backgroundColor: "#C68E6F" }} onClick={handleSearch} className=' font-monospace btn text-white'>search</button>
              </div>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;