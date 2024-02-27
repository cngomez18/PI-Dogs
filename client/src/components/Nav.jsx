import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

export default function Nav(){
  return(
    <div>

      <button>
          <Link to="/home">Home</Link>
      </button>
      
      <button>
          <Link to="/form">Form</Link>
      </button>

      <SearchBar/>
    </div>
  )
}