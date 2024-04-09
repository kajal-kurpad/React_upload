import React from "react";
import './DescriptionBox.css'

const DescriptionBox = () => {
    return(
        <div className="descriptionbox">
        <div className="descriptionbox-navigator">
    <div className="descriptionbox-nav-box">Description</div>
    <div className="descriptionbox-nav-box fade">Reviews (122) </div>

        </div>
 <div className="descriptionbox-description">
 <p>An e-commerce website is one that allows people to buy and sell physical goods, services, and digital products over the internet rather than at a brick-and-mortar location. Through an e-commerce website, a business can process orders, accept payments, manage shipping and logistics, and provide customer service.</p>
 <p>E-commerce involves the purchase and sale of goods and services online and is actually just one part of e-business. An e-business involves the entire process of running a company online. Put simply, it's all of the activity that takes place with an online business.</p>
 </div>
        </div>
    )
}

export default DescriptionBox;