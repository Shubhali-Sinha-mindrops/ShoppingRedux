import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);                  //useSelector sets up a suscription to Redux. So, whenever our redux store does change, this component fx.n will be re-executed.And, we will get the latest state as here in the cart constant.
  const notification = useSelector((state) => state.ui.notification);
  
  useEffect(() => {
    dispatch(fetchCartData());
  },[dispatch]);

  useEffect(() => {
   if( isInitial) {
     isInitial = false;
     return;
   }

   if(cart.changed) {
     dispatch(sendCartData(cart));
   }

  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && <Notification status={notification.status}
        title={notification.title}
        message={notification.message}
      />
      }
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
