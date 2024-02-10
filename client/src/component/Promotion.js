import React from "react";

function Promotion() {
    return (
        <section className="promotions-section" id="promotions">
            <div className="container">
                <h2 className="text-center mb-5">Promotions and Discounts</h2>
                <div className="row">
                    <div className="col-md-4 text-center">
                        <div className="promotion-item mb-4">
                            <i className="fa fa-percent fa-3x"></i>
                            <h3 className="promotion-title mt-3">Big Savings</h3>
                            <p className="promotion-text">Get up to 50% off on selected items.</p>
                        </div>
                    </div>
                    <div className="col-md-4 text-center">
                        <div className="promotion-item mb-4">
                            <i className="fa fa-truck fa-3x"></i>
                            <h3 className="promotion-title mt-3">Free Shipping</h3>
                            <p className="promotion-text">Enjoy free shipping on orders over $50.</p>
                        </div>
                    </div>
                    <div className="col-md-4 text-center">
                        <div className="promotion-item mb-4">
                            <i className="fa fa-gift fa-3x"></i>
                            <h3 className="promotion-title mt-3">Special Gifts</h3>
                            <p className="promotion-text">Get a free gift with purchases of $100 or more.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Promotion;