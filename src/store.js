import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import ThemeReducer from './reducers/ThemeReducer'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import {
  countProductReducers,
  productListReducer,
  productDeleteReducer,
  productCreateReducer,
} from './reducers/productReducers'
import {
  orderListReducer,
  orderDetailReducer,
  orderPayReducer,
  confirmOrderReducer,
  updateStatusOrderReducer,
} from './reducers/orderReducer'
import {
  cardsReducer,
  topOrderReducer,
  lastOrderReducer,
} from './reducers/dashboardReducers'
const reducer = combineReducers({
  ThemeReducer: ThemeReducer,
  productListReducer: productListReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetail: userDetailReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  countProduct: countProductReducers,

  cardsReducer: cardsReducer,
  topOrder: topOrderReducer,
  lastOrder: lastOrderReducer,
  orderList: orderListReducer,
  orderPay: orderPayReducer,
  orderDetail: orderDetailReducer,
  confirmOrder: confirmOrderReducer,
  updateStatusOrder: updateStatusOrderReducer,
})
// const cartItemsFromStorage = localStorage.getItem('cartItems')
//   ? JSON.parse(localStorage.getItem('cartItems'))
//   : []
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
// const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
//   ? JSON.parse(localStorage.getItem('shippingAddress'))
//   : []
const initialState = {
  // cart: {
  //   cartItems: cartItemsFromStorage,
  //   shippingAddress: shippingAddressFromStorage,
  // },
  userLogin: { userInfo: userInfoFromStorage },
}
const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
