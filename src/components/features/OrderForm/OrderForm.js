import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import pricing from '../../../data/pricing';
import OrderOption from '../OrderOption/OrderOption';

const OrderForm = ({ options, setOrderOption, tripCost }) => (
  <Row>
    {pricing.map(pricingData => (
      <Col md={4} key={pricingData.id}>
        <OrderOption
          currentValue={options[pricingData.id]}
          setOrderOption={setOrderOption}
          {...pricingData}
        />
      </Col>
    ))}
    <Col xs={12}>
      <OrderSummary tripCost={tripCost} options={options} />
    </Col>
  </Row>
);

OrderForm.propTypes = {
  tripCost: PropTypes.node,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
};

export default OrderForm;
