import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_CONFIRM_REQUEST,
  ORDER_CONFIRM_SUCCESS,
  ORDER_CONFIRM_FAIL,
  ORDER_UPDATE_STATUS_REQUEST,
  ORDER_UPDATE_STATUS_SUCCESS,
  ORDER_UPDATE_STATUS_FAIL,
} from '../constants/orderConstants'
import { logout } from './userActions'
import axios from 'axios'
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(`/api/orders`, order, config)
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getOrderDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAIL_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/orders/${id}`, config)
    dispatch({
      type: ORDER_DETAIL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
      })
      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      )
      dispatch({
        type: ORDER_DETAIL_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ORDER_DETAIL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/orders/myorders`, config)
    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const listOrders =
  (pageNumber = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_LIST_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(`/api/orders?page=${pageNumber}`, config)

      dispatch({
        type: ORDER_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.messages
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: ORDER_LIST_FAIL,
        payload: message,
      })
    }
  }

export const confirmOrderById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CONFIRM_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.data.access_token}`,
      },
    }

    const { data } = await axios.put(`/api/orders/confirm/${id}`, config)

    dispatch({
      type: ORDER_CONFIRM_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_CONFIRM_FAIL,
      payload: message,
    })
  }
}

export const updateStatusOrder = (id, status) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_UPDATE_STATUS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.data.access_token}`,
      },
    }

    const { data } = await axios.put(`/api/orders/${id}`, { status }, config)

    dispatch({
      type: ORDER_UPDATE_STATUS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ORDER_UPDATE_STATUS_FAIL,
      payload: message,
    })
  }
}
