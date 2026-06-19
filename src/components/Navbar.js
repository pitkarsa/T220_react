import React from "react";
import {Link} from 'react-router-dom';

export default function Navbar() {
  const userRoles = localStorage.getItem("userRoles");
  function doLogout(){
    localStorage.clear();
    window.location.href="http://localhost:3000";
  }
  return (
    <nav className="navbar navbar-expand-lg " 
    style={{'backgroundColor':'pink'}}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Shopify
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" 
              to={'/'}>
                Home
              </Link>
            </li>
            { userRoles && userRoles.includes("ADMIN") &&
            <>
                <li className="nav-item">
                  <Link className="nav-link" to={'/add-product'}>
                    Add Product
                  </Link>
                </li>
            </>
            }
            { userRoles && userRoles.includes("USER") &&
            <>
                <li className="nav-item">
                  <Link className="nav-link" to={'/mycart'}>
                    My Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/myorders'}>
                    My Orders
                  </Link>
                </li>
            </>
            }
            { !userRoles &&
            <>
              <li className="nav-item">
                <Link className="nav-link" to={'/register'}>
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/login'}>
                  Login
                </Link>
              </li>
            </>
            }
            { userRoles &&                
              <li className="nav-item">
                <button className="nav-link" onClick={doLogout}>
                  Logout
                </button>
              </li>            
            }
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
