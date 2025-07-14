import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';
import Cart from "./assets/icons8-carrinho-50.png"




function Header({ cart, setcart }) {

localStorage.setItem("cartsave",JSON.stringify(cart)) 

  const updateItemQuantity = (itemId, newQuantity) => {
  
    if(newQuantity == ""){
      return  newQuantity = 1
    }
    setcart(prevCart =>
      prevCart.map(item =>
        item.id === itemId
          ? { ...item, quantity: parseInt(newQuantity) } 
          : item
      )
    );
  };


  const trash = (id) => {

  
    setcart((prev) => prev.filter((item) => item.id !== id));
    
 

  };


  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const cartElements = cart.map((item, index) => {
    
    const itemTotalPrice = item.price * item.quantity;
    return (
      <div key={index} style={{ height: "120px" }} className='d-flex flex-row justify-content-around align-items-center mt-2'>
        <img width="120px" height="120px" src={item.image} alt={item.title || "Product Image"} />
        <input
          min={1}
          onChange={(event) => updateItemQuantity(item.id, event.target.value)}
          style={{ height: "40px" }}
          className='form-control w-25'
          type="number"
  
          value={item.quantity} 
        />
        <span>USD${itemTotalPrice.toFixed(2)}</span>
        <button onClick={() => trash(item.id)} style={{ height: "40px", backgroundColor: "#2F3A4C" }} className='btn text-white'>delete</button>
      </div>
    );
  });


  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const handleCloseMobileMenu = () => setShowMobileMenu(false);
  const handleShowMobileMenu = () => setShowMobileMenu(true);

  const [showCartOffcanvas, setShowCartOffcanvas] = useState(false);
  const handleCloseCartOffcanvas = () => setShowCartOffcanvas(false);
  const handleShowCartOffcanvas = () => setShowCartOffcanvas(true);

  
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
      <header className='sticky-top'>
        
        <nav style={{ height: "70px", backgroundColor: "#1B1F30" }} className='d-md-none d-flex align-items-center'>
        
          <Offcanvas show={showMobileMenu} style={{ width: "50vw" }} onHide={handleCloseMobileMenu}>
            <Offcanvas.Header style={{backgroundColor:"#1B1F30", height:"70px"}} closeButton>
              <Offcanvas.Title className='text-white ms-auto me-0'><h1>menu</h1></Offcanvas.Title>
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

       
          <Offcanvas style={{ width: "100vh" }} placement='end' show={showCartOffcanvas} onHide={handleCloseCartOffcanvas}>
            <Offcanvas.Header style={{backgroundColor:"#1B1F30"}} className='d-flex justify-content-center ' closeButton>
              <Offcanvas.Title  className='ms-auto  text-white'  ><h1>Total Price: USD$ {totalPrice.toFixed(2)}</h1></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {cart.length > 0 ? cartElements : <p className="text-center">Seu carrinho está vazio.</p>}
            </Offcanvas.Body>
          </Offcanvas>

          <Button variant='' className='border-0' style={{ width: "50px", height: "48px" }} onClick={handleShowMobileMenu}>
            <img width="40" height="40" src="https://img.icons8.com/fluency/48/menu--v1.png" alt="menu-v1" />
          </Button>
          <div onClick={handleShowCartOffcanvas}  className='ms-2 me-2' > <span className='text-white position-relative bg-danger '
           style={{fontSize:"16px",paddingRight:"7px",paddingLeft:"7px",paddingTop:"1px",paddingBottom:"1px",borderRadius:"50%",top:"-5px", left:"12px"}}>{cart.length}
           </span> <img style={{cursor:"pointer", width: "30px", position:"relative",bottom:"7px"}} src={Cart} alt="Cart" /> </div>
          <input style={{ height: "48px" }} onChange={(e) => setSearch(e.target.value)} className='form-control'></input>
          <button style={{ height: "48px", backgroundColor: "#C68E6F" }} onClick={handleSearch} className='btn text-white'>search</button>
        </nav>

       
        <nav style={{ backgroundColor: "#1B1F30" }} className="middle navbar navbar-expand-md sticky-top">
          <div className='container d-flex align-items-center'>
            <ul className="collapse navbar-collapse justify-content-between p-0 m-0" id="navbarNavAltMarkup">
              <li><a className="nav-link m-3 text-white" onClick={() => navigate("/")}>Home</a></li>
              <li> <a className="nav-link m-3 text-white" onClick={() => navigate(`/electronic`)}>Electronics</a></li>
              <li> <a className="nav-link m-3 text-white" onClick={() => navigate("/jewelery")}>Jewelery</a></li>
              <li> <a className="nav-link m-3 text-white" onClick={() => navigate("/mens clothing")}>Men's</a></li>
              <li><a className="nav-link m-3 text-white" onClick={() => navigate("/womens clothing")}>Women's</a></li>
              <div className='d-flex justify-content-center me-3'  onClick={handleShowCartOffcanvas}>   <img  className='' style={{ width: "30px", cursor:"pointer"}} src={Cart} alt="Cart" /> 
              <span className='text-white position-relative bg-danger '  style={{borderRadius:"50%",paddingRight:"10px",paddingLeft:"10px",paddingTop:"1px",paddingBottom:"1px",fontSize:"18px", top:"-15px", right:"5px"}}>
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