import { Link, useLocation } from "react-router-dom";
import {addFav,removeFav} from "../redux/actions"
import { useEffect, useState } from "react";
import { connect } from "react-redux";

//,addFav,removeFav,myFavorites
function Card({id,onClose,name,weight,temperaments,image}) {
 
  const { pathname } = useLocation()
  const [isFav,setIsFav] = useState(false);

  const handleFavorite = ()=>{
    if(isFav){
      setIsFav(false)
      removeFav(id)
    }else{
      setIsFav(true)
      addFav({id,onClose,name,weight,temperaments,image})
    }
  }

  useEffect(()=>{
    myFavorites.forEach(charFav => {
       charFav.id === id && setIsFav(true)
    })
  },[])

  return (
    <div>
      {
        isFav ? (
          <button onClick={handleFavorite}>❤️</button>
        ) : (
          <button onClick={handleFavorite}>🤍</button>
        )
      }
      {
         pathname === '/home' && <button onClick={() => onClose(id)}>X</button>
      }
      {/*<button onClick={onClose}>X</button>*/}      

      <Link to={`/detail/${id}`}>
        <h2 className="card-name">{name}</h2>
      </Link>
      <h2>{weight}</h2>
      <h2>{temperaments}</h2>
    
      <img src={image} alt='dog' /> 
    </div>
  );

  
}
function mapDispatchToProps(dispatch) {
  return {
    addFav: function (character) {
      dispatch(addFav(character));
    },
    removeFav: function (id) {
      dispatch(removeFav(id));
    },
  };
}

function mapStateToProps(state){
   return {
      myFavorites:state.myFavorites
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(Card);