import React from 'react'
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

function Nav() {
  let navigate=useNavigate();
  

  return (
    <div>
        <nav className="navbar navbar-expand-sm">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link to ="/bookings" className="nav-link shadow p-2">Bookings</Link>
                    {/* <a className="nav-link shadow p-2" href="#" onClick={()=>navigate('/bookings')}>Booking</a> */}
                    </li>
                    <li className="nav-item">
                    <Link to ="/dispatch" className="nav-link shadow p-2">Dispatch</Link>
                    {/* <a className="nav-link shadow p-2" href="#" onClick={()=>navigate('/dispatch')}>Dispatch</a> */}
                    </li>
                    <li className="nav-item">
                    <a className="nav-link shadow p-2" href="#">Inward</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link shadow p-2" href="#">Tracking</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link shadow p-2" href="#">Deliver</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link shadow p-2" href="#">Manual Inward</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link shadow p-2" href="#">Reports</a>
                    </li>
                </ul>
                <a className="navbar-brand" href="#">
                <img src="cargo.png" alt="cargo" style={{'width':'40px'}}/> 
                </a>
            </div>
        </nav>
    </div>
  )
}

export default Nav