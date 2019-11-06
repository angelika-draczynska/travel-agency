import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import pricing from '../../../data/pricing';
import OrderOption from '../OrderOption/OrderOption';

const OrderForm = props => (
  <Row>
    {pricing.map(pricingData => (
      <Col md={4} key={pricingData.id}>
        <OrderOption
          currentValue={props.options[pricingData.id]}
          setOrderOption={props.setOrderOption}
          {...pricingData}
        />
      </Col>
    ))}
    <Col xs={12}>
      <OrderSummary tripCost={props.tripCost} options={props.options} />
    </Col>
  </Row>
);

OrderForm.propTypes = {
  tripCost: PropTypes.node,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
};

export default OrderForm;
