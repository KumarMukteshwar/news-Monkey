import React from "react"

export default function Alert(props) {
    // const capitalized = (word) =>{
    //     const lower = word.toLowerCase();
    //     return lower.charAt(0).toUpperCase()+lower.slice(1);
    // }
    
    return (
      <div className={`alert alert-warning alert-dismissible fade show`} role="alert">
        <strong> {(props.alert.type)} </strong> : {props.alert.mesg}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    
  )
}