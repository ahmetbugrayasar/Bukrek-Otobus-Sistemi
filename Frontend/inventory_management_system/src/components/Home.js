import React from 'react'
import { NavLink} from 'react-router-dom';
export default function Home() {
  return (
    <div className='container-fluid p-5'>
        <h2>Otobüs'e tıklayın.</h2>
        <div className='d-flex justify-content-center col-lg-6 col-md-6'>
        <NavLink to="/otobusler" className='btn btn-primary me-5 fs-4'>Otobüs</NavLink>
        </div>
    </div>
  )
}
