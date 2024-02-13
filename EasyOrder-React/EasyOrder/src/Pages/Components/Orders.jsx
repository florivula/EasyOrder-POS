import React from 'react'
import CategoriesCard from './CategoriesCard'
import "./Orders.css";
import logo from "../../assets/easyorder.jpg";


export default function Orders() {

    
  return (
    <div className='container'>
       <div className='nav'>
        <div className='logo-search'>
         <img src={logo} alt="gabim" />
         <input type="search" placeholder="Search..."/>
        
        </div>
        <div className='user'>
        <button> Filan Fisteku</button>
        </div >
        </div>
        <div className='flex'>
         
       

              <div className='bill'>
          <h1>Categories</h1>
        <div className="cards">
        <CategoriesCard/>
        <CategoriesCard/>
        <CategoriesCard/>
        <CategoriesCard/>
        <CategoriesCard/>
        
        </div>
          <div className='product'>
         <h1>Products</h1>
        <div className="cards-product">
        <CategoriesCard/>
        <CategoriesCard/>
        <CategoriesCard/>
        <CategoriesCard/>
        <CategoriesCard/>
        <CategoriesCard/>
        <CategoriesCard/>
        <CategoriesCard/>
        </div>
        </div>
        </div>
        <div className='fature'>
            <h2>Current Order</h2>
            <p> Lorem, ipsum dolor.</p>
            <p> 22 Lorem, ipsum dolor.</p>
            <p> 22 Lorem, ipsum dolor.</p>

            <p className='total'> Total:254$</p>

            <button> Print Order</button>

          </div>
        </div>
    </div>
  )
}
