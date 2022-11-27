import React from 'react'
import { Nav } from 'react-bootstrap'

const CheckOutSteps = ({ step1, step2, step3, step4, step5 }) => {
  return (
    <Nav className='justify-content-center '>
      <Nav.Item>
        {step1 ? (
          <i className='fas fa-circle-check'> Confirm</i>
        ) : (
          <Nav.Link disabled>Confirm</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <i className='fas fa-truck-fast'> Shipping</i>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <i class='fa fa-sack-dollar'>Shipped</i>
        ) : (
          <Nav.Link disabled>Shipped</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckOutSteps
