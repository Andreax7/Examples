import React, {useEffect, useState, useContext} from "react"
import { useLocation, Link } from 'react-router-dom'
import { CartContext } from "./CartContext"
import { PortalModal } from "./PortalModal"


const Details =() =>{
    const { cartItems, setCart } = useContext(CartContext);
    const {total, setTotal}  = useContext(CartContext);
    const [item, setItem] = useState([]);
    const location = useLocation();
    const { data } = location.state;
    
   const [modal, setModal] = useState(false);
   const Change = () => setModal(!modal);

    async function getTea(data){
        const res = await fetch(`https://61d256e1da87830017e59453.mockapi.io/teas`);
        const resJson = await res.json();
        setItem(resJson[data]);
        
      } // dohvaća niz vrsta sa api-ja 
     
    useEffect(() => {
        getTea(data);
    }, [data]);

    useEffect(() => {
        izracunaj();
    }, []);
  
    const izracunaj = ()=> {  
        let ukupno = 0;  
        for(let i in cartItems){
            let sum = cartItems[i][1]*cartItems[i][2];
            ukupno += sum;
            setTotal(ukupno);
        }
 }
    const DodajProizvod = () => {
        Change();
        let kolicina = 1;
        const TeaArray = [data, item.cijena, kolicina];
        //const lista = {caj:data, slika: item.slika, cijena:item.cijena, kolicina: kolicina};
        if(cartItems.length == 0){
            setCart([TeaArray]);
            setTotal(item.cijena);
        }
        else{
            const postojeciNiz = cartItems.filter( array => {
                    if(array[0] == data){

                        return array[2] += kolicina;
                    }
            })
            if (postojeciNiz.length == 0) {
                setCart(curent => [...curent, TeaArray]);
                
            }    
        } 
        izracunaj();
        console.log('CLICKED', open);

    }
    
    return(
       
        <div className="Detalji"> 
        
        <PortalModal show={modal} >   
                <p id='Modal'>Proizvod je dodan u košaricu, <br/>
                     želite li pregledati košaricu? </p>
                <button className='btnModal2' onClick={Change}> NE </button>
                <Link className="btnModal" to="/cart"> 
                                DA 
                </Link>
        </PortalModal>  
            <h3>
                <strong> Detalji o čaju {data} </strong>
            </h3>
       
         
        
           <div>
               <img width="200px" height="200px" src={item.slika}/>
               <label id="cijena"> <strong>Cijena/ 100g: {item.cijena} HRK</strong></label>
               <p id="pripr"> <strong> Priprema: {item.priprema} </strong> </p>
               <p> <strong> Opis: </strong> {item.opis} </p>
            
           </div>
            <h4 id="cartbtn"> 
                Dodaj u košaricu <button onClick={DodajProizvod} > + </button>
            </h4>
         
        </div>
    );
};

export default Details;