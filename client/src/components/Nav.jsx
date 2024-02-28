import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import '../styles/Nav.css'

export default function Nav(){
  return(
    <nav className="navbar">
      <div className="navbar-left">

        <button>
            <Link to="/home">Home</Link>
        </button>
        
        <button>
            <Link to="/form">Form</Link>
        </button>
      </div>
      
      <div className="navbar-center">
        <SearchBar />
      </div>
    </nav>
  )
}