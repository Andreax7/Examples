import React, {useState, useEffect} from "react";
import { render } from "react-dom";
import UseDropdown from "./Teas";

const App = () => {
    const [ defKind, setDefault] = useState(["bijeli"]);
    const [ TeaKinds, setKinds] = useState([]);
    const [ Teas, setTeas] = useState([]);
    const [ defTea, setTea] = useState([""]);

    
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
       // console.log( rest);
        } 
    useEffect(() => {
      getTeaKinds();
    }, []);

    useEffect(() => {
      getTeas(defKind);
    }, [defKind]);
    
    return (
      <div>
        <form>
          <label>Izaberi vrstu čaja  </label>
                  <UseDropdown data = {TeaKinds} onChange={setDefault} />

          <div> Izabrana vrsta : {defKind}</div>
          <UseDropdown data = {Teas} onChange={setTea} />
            <div> Izabrani caj : {defTea}</div>
        </form>
      </div>
    );
};

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
 "vocni":[ "visnja",
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
