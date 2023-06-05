import React from 'react'
import "./buynow.css";
import Option from './Option';
import Subtotal from './Subtotal';
import Right from './Right';

import { Divider } from '@mui/material';

const Buynow = () => {
  return (
    <div className='buynow_section'>
    <div className="buynow_container">
        <div className="left_buy">
            <h1>Shopping Cart</h1>
            <p>select all items</p>
            <span className='leftbuyprice'>Price</span>
            <Divider/>
             <div className="item_container">
                <img src="https://rukminim1.flixcart.com/image/300/300/kll7bm80/smartwatch/c/1/n/43-mo-sw-sense-500-android-ios-molife-original-imagyzyycnpujyjh.jpeg?q=70" alt="" />
                <div className="item_details">
                    <h3>Molife Sense 500 SmartWatch (Black Strap, Freesize)</h3>
                    <h3>Smart Watches</h3>
                    <h3 className='different_price'> ₹4049.00 </h3>
                    <p className='unusuall'>Usually dispatched in 8 days. </p>
                    <p>Eligible For Free Shipping </p>
                    <img src="" alt="" />
                    <Option />
                </div>
                <h3 className='item_price'>₹4049.00</h3>
             </div>
            <Divider/>
            <Subtotal/>
        </div>
        <Right/>
    </div>
    </div>
  )
}

export default Buynow