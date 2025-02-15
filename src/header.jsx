import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';


function Header() {

  const [shows, setShows] = useState(false);
  const handleCloses = () => setShows(false);
  const handleShows = () => setShows(true);

  const [search, setsearch] = useState("")
  const navigate = useNavigate()

  function products() {
    if (search == "") {
      return
    }
    else {
      navigate(`/search/${search}`)
    }
  }

  return (
    <>
      <header className=' sticky-top'> 
        < nav style={{ height: "49px" }} className='d-md-none bg-dark sticky-top  d-flex' >
          <Offcanvas show={shows} style={{ width: "60%" }} onHide={handleCloses}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

              <div className=' d-flex justify-content-center align-items-md-center  row '>
                <ul className='m-auto text-center ' >
                  <li> <a className="nav-link m-3 " onClick={()=>navigate("/")} >Home</a> </li>
                  <li> <a className="nav-link m-3 " onClick={()=> navigate(`/electronic`)} >Electronics</a></li>
                  <li> <a className="nav-link m-3 " onClick={()=> navigate("/jewelery")} >Jewelery</a></li>
                  <li><a className="nav-link m-3 "  onClick={()=> navigate("/mens clothing ")}>Men's</a></li>
                  <li><a className="nav-link m-3 " onClick={()=> navigate("/mens clothing ")} >Women's</a> </li>
                </ul>
              </div>
            </Offcanvas.Body>
          </Offcanvas>


          <Button variant="dark" className=' border-0 ' style={{ width: "100px", height: "48px" }} onClick={handleShows}>
            <img width="42" height="40" src="https://img.icons8.com/fluency/48/menu--v1.png" alt="menu-v1" />
          </Button>
          <input style={{ height: "48px" }} onChange={(e) => setsearch(e.target.value.toLowerCase())} className='form-control '  ></input>
          <button style={{ height: "48px" }} onClick={products} className='btn btn-dark  '>search</button>
        </nav>

        <nav className=" middle navbar navbar-expand-md sticky-top bg-black  ">
          <div className='container d-flex align-items-center  '>
            <ul className="collapse navbar-collapse justify-content-between p-0 m-0" id="navbarNavAltMarkup">
              <li><a className="nav-link m-3 text-light" onClick={()=>navigate("/")}   >Home</a></li>
              <li> <a className="nav-link m-3 text-light"onClick={()=> navigate(`/electronic`)}>Electronics</a></li>
              <li> <a className="nav-link m-3 text-light"onClick={()=> navigate("/jewelery")} >Jewelery</a></li>
              <li> <a className="nav-link m-3 text-light"onClick={()=> navigate("/mens clothing ")} >Men's</a></li>
              <li><a className="nav-link m-3 text-light" onClick={()=> navigate("/mens clothing ")}>Women's</a></li>

              <div className='d-flex '>
                <input onChange={(e) => setsearch(e.target.value.toLowerCase())} className='form-control' ></input>
                <button onClick={products} className='btn btn-dark '>search</button>
              </div>
            </ul>

          </div>

        </nav>
      </header>
    </>
  );
}

export default Header;
