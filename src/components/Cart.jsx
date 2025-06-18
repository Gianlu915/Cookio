import Modal from '../components/UI/Modal'
import React, { useContext } from 'react'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../Util/formatting'
import Button from './UI/Button'
import  {UserProgressContext } from '../store/UserProgressContext'

const Cart = () => {
    const cartCtx = useContext(CartContext);
     const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price,0);

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

  return (
    <Modal classname='cart' open={userProgressCtx.progress === 'cart'}>
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map(item => <li key={item.id}>
                {item.name} - {item.quantiy}
            </li>)}
        </ul>
        <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
        <p className='modal-actions'>
            <Button textOnly onClick={handleCloseCart}>Close</Button>
            <Button>Go to checkout</Button>
        </p>
    </Modal>
  )
}

export default Cart