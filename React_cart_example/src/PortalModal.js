import React from 'react'
import ReactDOM from 'react-dom'


export function PortalModal ({children, show}) {
 //   if(!Open) return null
   
    return ReactDOM.createPortal( 
        <>
        <div class="modal-background"></div>
            {
            show ? 
            
            <div  className="modalContainer"
            onClick={() => close()} >
                {children}
            </div>
             : null
            } 
        </>, 
       document.getElementById('portal')
    );
}
