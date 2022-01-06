import React, {useState, useEffect, useContext} from "react";
import { render } from "react-dom";
import UseDropdown from "./UseDropdown";
import Result  from "./Result";
import Details from "./Details";
import Cart from "./Cart";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { CartProvider } from "./CartContext";
import Nav from "./nav";


const App = () => {
 
    return (
      <div id='smth'>
        <CartProvider>
          <Nav/>
          <Router>
            
            <div className="nav">
                <li><Link to="/"> Cajevi </Link></li> 
                <li><Link to="/cart"> Košarica </Link> </li>     
            </div>
        
            <Routes>   
              <Route exact path="/" element={<Home/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/details" element={<Details/>}/>           
            </Routes>

          </Router> 
        </CartProvider>
      </div>
       
    );
};

const Home =()=>{
  const [ defKind, setDefault] = useState(["bijeli"]);
  const [ TeaKinds, setKinds] = useState([]);
  const [ Teas, setTeas] = useState([]);
  
  
  async function getTeaKinds(){
    const res = await fetch(`http://demo3407721.mockable.io/`);
    const resJson = await res.json();
    const result = await resJson.teaKinds;
    setKinds(result);
  } // dohvaća niz vrsta sa api-ja
    
  async function getTeas(teaKind){
      const resp = await fetch(`http://demo1246999.mockable.io/`);
      const rJson = await resp.json();
      const rest = await rJson[teaKind];
      setTeas(rest);
  } 

  useEffect(() => {
    getTeaKinds();
  }, []);

  useEffect(() => {
    getTeas(defKind);
  }, [defKind]);
  
  return(
    <div className="content">
      <form>
          <label>Izaberi vrstu čaja  </label>
              <UseDropdown data = {TeaKinds} onChange={setDefault} />
                <div> Pogledajte izbor cajeva vrste <i> {defKind} </i></div>
      </form>
      
      <Result data = {Teas} />

    </div>

  )
}

/*

teasPerKind = {
 "bijeli": ["Pai Mu Tan",
	        "Silver Needle",
	        "Gong Mei"
         ],
	
 "zeleni":[    "Sencha",
                "Kukicha",
                "Matcha",
                "Thai Mu Long"
            ],
 "crni":[ "Earl Grey",
            "Ceylon",
            "Assam",
            "Darjeeling"
     ],
"biljni":[      "menta",
                "verbena",
                "kamilica",
                "kopriva",
                "Aloe Vera"
                ],
 "vocni":[ 
            "jagoda",
            "acai/ limeta",
            "rooibos naranca",
            "Dragonfruit/ malina"
            ]
 
}

teaKinds.json = {
  "teaKinds": ["bijeli", "zeleni", "crni", "biljni", "vocni"]
 }
*/


render(<App />, document.getElementById("root"));
