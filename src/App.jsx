import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Search from './search';
import Electronic from './eletronic';
import Jewelerys from './Jewelerys';
import Men from './Men';
import Women from './Women';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route path='' element={<Home />} />
          <Route path='/electronic' element={<Electronic/>}> </Route>
          <Route path='/jewelery' element={<Jewelerys/>}> </Route>
          <Route path="/mens clothing"  element={<Men/>}> </Route>
          <Route path='/womens clothing'  element={<Women/>}> </Route>
          <Route path='/search/:search'  element={<Search/>}> </Route>


      
        
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
