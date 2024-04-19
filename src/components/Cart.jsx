import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const { cartItems,subTotal,total,tax,shipping } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const increment = (id)=>{
    dispatch({
      type:"addToCart",
      payload :{id}
  })
  dispatch({type:"calculatePrice"})
  } 

  const decrement = (id)=>{
    dispatch({
      type:"decrement",
      payload :id
  });
  dispatch({type:"calculatePrice"})
  }
  const deleteHandler = (id)=>{
    dispatch({
      type:"deleteHandler",
      payload :id
  })
  dispatch({type:"calculatePrice"})
  }
  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i) => (
            <CartItem
              key={i.id}
              imgSrc={i.imgSrc}
              price={i.price}
              name={i.name}
              qty={i.quantity}
              id={i.id}
              decrement ={decrement}
              increment = {increment}
              deleteHandler = {deleteHandler}
            />
          ))
        ) : (
          <h1>No Items Yet</h1>
        )}
      </main>
      <aside>
        <h2>Subtotal : ${subTotal}</h2>
        <h2>Shipping : ${shipping}</h2>
        <h2>Tax : ${tax}</h2>
        <h2>Total : ${total}</h2>
      </aside>
    </div>
  );
};

export default Cart;

const CartItem = ({
  imgSrc,
  name,
  price,
  qty,
  decrement,
  increment,
  deleteHandler,
  id,
}) => (
  <div className="cartItem">
    <img src={imgSrc} />
    <article>
      <h3>{name}</h3>
      <p>${price}</p>
    </article>
    <div>
      <button onClick={() => decrement(id)}>-</button>
      <p>{qty}</p>
      <button onClick={() => increment(id)}>+</button>
    </div>

    <AiFillDelete onClick={() => deleteHandler(id)} />
  </div>
);
