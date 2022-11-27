import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message/Message'
import Loader from '../components/loader/Loader'
import {
  getOrderDetail,
  confirmOrderById,
  updateStatusOrder,
} from '../actions/orderActions'
import {
  ORDER_CONFIRM_RESET,
  ORDER_UPDATE_STATUS_RESET,
} from '../constants/orderConstants'
import StatusSteps from '../components/StatusSteps'
const OrderScreen = ({ match }) => {
  const dispatch = useDispatch()
  const orderId = match.params.id
  const [sdkReady, setSdkReady] = useState(false)
  const orderDetail = useSelector((state) => state.orderDetail)
  const { order, loading, error } = orderDetail
  const confirmOrder = useSelector((state) => state.confirmOrder)
  const { success: successUpdateStatus } = useSelector(
    (state) => state.updateStatusOrder
  )
  const {
    loading: loadingConfirm,
    error: errorConfirm,
    success: successConfirm,
  } = confirmOrder

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }
    order.itemsPrice = addDecimals(
      order.orderItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )
    )
  }
  const [isShipping, setIsShipping] = useState(false)
  const [isShipped, setIsShipped] = useState(false)
  useEffect(() => {
    // const addPayPalScript = async () => {
    //   const { data: clientId } = await axios.get('/api/config/paypal')
    //   const script = document.createElement('script')
    //   script.type = 'text/javascript'
    //   script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
    //   script.async = true
    //   script.onload = () => {
    //     setSdkReady(true)
    //   }
    //   document.body.appendChild(script)
    // }
    // console.log('here')
    // dispatch(getOrderDetail(orderId))
    if (
      !order ||
      order._id !== orderId ||
      successConfirm ||
      successUpdateStatus
    ) {
      dispatch({ type: ORDER_UPDATE_STATUS_RESET })
      dispatch({ type: ORDER_CONFIRM_RESET })
      dispatch(getOrderDetail(orderId))
    } else {
      setIsShipped('Shipped' === order.status.statusNow)
      setIsShipping(
        'Shipping' === order.status.statusNow ||
          'Shipped' === order.status.statusNow
      )
    }
  }, [dispatch, orderId, order, successConfirm, successUpdateStatus])
  // const successPaymentHandler = (paymentResult) => {
  //   dispatch(payOrder(orderId, paymentResult))
  // }
  const confirmHandler = (orderId) => {
    dispatch(confirmOrderById(orderId))
  }
  const shippingHandler = () => {
    const status = {
      statusNow: 'Shipping',
      description: 'Đơn hàng đang được vận chuyển ',
    }
    dispatch(updateStatusOrder(orderId, status))
  }
  const shippedHandler = (orderId) => {
    const status = {
      statusNow: 'Shipped',
      description: 'Đơn hàng đã giao thành công ',
    }
    dispatch(updateStatusOrder(orderId, status))
  }
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1> Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup.Item>
            <h2>{order.status && order.status.statusNow}</h2>
            <p>
              {' '}
              <strong>Name:</strong>
              {order.user.name}
            </p>
            <p>
              <strong>Email:</strong>
              <a href={`mailto:${order.user.email}`}>{order.user.email} </a>
            </p>
            <p>
              <strong>Address :</strong>
              {order.shippingAddress.address},{order.shippingAddress.city}{' '}
              {order.shippingAddress.postalCode},{' '}
              {order.shippingAddress.country}
            </p>
            <StatusSteps
              step1={order.isConfirm}
              step2={isShipping}
              step3={isShipped}
            />
            {order.isDelivered ? (
              <Message variant='success'>
                {' '}
                Delivered on {order.deliveredAt}
              </Message>
            ) : (
              <Message variant='danger'>Not Delivered</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Payment Method </h2>
            <p>
              <strong>Method:</strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Message variant='success'> Paid on {order.paidAt}</Message>
            ) : (
              <Message variant='danger'>Not Paid</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Order Item</h2>
            {order.orderItems.length === 0 ? (
              <Message> Order is empty</Message>
            ) : (
              <ListGroup variant='flush'>
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.quantity} x {item.price} =
                        {item.quantity * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
                <Nav className='justify-content-center '>
                  <Nav.Item>
                    {order && order.isConfirm ? (
                      <Button
                        disabled
                        type='submit'
                        variant='primary'
                        onClick={() => confirmHandler(orderId)}
                      >
                        Confirm
                      </Button>
                    ) : (
                      <Button
                        type='submit'
                        variant='primary'
                        onClick={() => confirmHandler(orderId)}
                      >
                        Confirm
                      </Button>
                    )}
                  </Nav.Item>
                  <Nav.Item>
                    {isShipping || (!order.isConfirm && !isShipping) ? (
                      <Button disabled type='submit' variant='primary'>
                        Add To Shipping
                      </Button>
                    ) : (
                      <Button
                        type='submit'
                        variant='primary'
                        onClick={() => shippingHandler(orderId)}
                      >
                        Add To Shipping
                      </Button>
                    )}
                  </Nav.Item>
                  <Nav.Item>
                    {isShipped || !order.isConfirm ? (
                      <Button disabled type='submit' variant='primary'>
                        Shipped
                      </Button>
                    ) : (
                      <Button
                        type='submit'
                        variant='primary'
                        onClick={() => shippedHandler(orderId)}
                      >
                        Shipped
                      </Button>
                    )}
                  </Nav.Item>
                </Nav>
              </ListGroup>
            )}
          </ListGroup.Item>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
