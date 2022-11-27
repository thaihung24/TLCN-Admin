import axios from 'axios'
import {
  GET_CARDS_REQUEST,
  GET_CARDS_SUCCESS,
  GET_CARDS_FAIL,
  GET_LAST_ORDER_REQUEST,
  GET_LAST_ORDER_SUCCESS,
  GET_LAST_ORDER_FAIL,
  GET_TOP_ORDER_REQUEST,
  GET_TOP_ORDER_SUCCESS,
  GET_TOP_ORDER_FAIL,
} from '../constants/dashboardConstant.js'
export const getCards = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_CARDS_REQUEST,
    })
    const { data } = await axios.get(`/api/dashBoard`)
    dispatch({
      type: GET_CARDS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_CARDS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const getTopOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_TOP_ORDER_REQUEST,
    })
    const { data } = await axios.get(`/api/dashBoard/topOrders`)
    dispatch({
      type: GET_TOP_ORDER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_TOP_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const getLastOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_LAST_ORDER_REQUEST,
    })
    const { data } = await axios.get(`/api/dashBoard/lastOrders`)
    dispatch({
      type: GET_LAST_ORDER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_LAST_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
