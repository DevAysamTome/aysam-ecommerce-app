import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Cart({ cart }) {
  // Consts
  const [cartState, setCartState] = useState(
    cart.map((product) => ({ ...product, quantity: 1 })) || []
  );
  const numItems = cartState.reduce((total, product) => total + product.quantity, 0);
  const totalPrice = cartState.reduce((total, product) => total + product.quantity * product.price, 0);

  const handleAdd = (product) => {
    const updatedCart = [...cartState];
    const index = updatedCart.indexOf(product);
    updatedCart[index].quantity += 1;
    setCartState(updatedCart);
  };

  const handleRemove = (product) => {
    const updatedCart = [...cartState];
    const index = updatedCart.indexOf(product);
    updatedCart[index].quantity -= 1;
    if (updatedCart[index].quantity === 0) {
      updatedCart.splice(index, 1);
    }
    setCartState(updatedCart);
  };

  const sortCartStateByName = () => {
    setCartState(cartState.sort((a, b) => a.name.localeCompare(b.name)));
  };

  // Add To Cart State
  useEffect(() => {
    if (cart) {
      setCartState(
        cart.map((product) => ({ ...product, quantity: 1 }))
      );
    }
  }, [cart]);
  
// Save the cart state to local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState));
  }, [cartState]);



  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3 className="my-4">Cart ({numItems})</h3>
          <button className="btn btn-primary btn-sm m-2" onClick={sortCartStateByName}>
            Sort by name
          </button>
        </div>
      </div>
      {cart && (
        <table className="table w-100">
          <thead>
            <tr>
              <th scope="col">Product image</th>
              <th scope="col">Product name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartState.map((product, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={product.images}
                    alt={product.title}
                    className="img-fluid mb-2"
                    width="100"
                  />
                </td>
                <td>{product.title}</td>
                <td>
                  <span>x {product.quantity}</span>
                </td>
                <td>
                  <span>${product.quantity * product.price}</span>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm m-2"
                    onClick={() => handleRemove(product)}
                  >
                    Remove
                  </button>
                  <button
                    className="btn btn-primary btn-sm m-2"
                    onClick={() => handleAdd(product)}
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" />
              <td>
                <strong>Total:</strong>
              </td>
              <td>
                <strong>${totalPrice}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Cart;