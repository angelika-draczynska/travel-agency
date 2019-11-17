import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import pricing from '../../../data/pricing';
import OrderOption from '../OrderOption/OrderOption';
import settings from '../../../data/settings';
import { calculateTotal } from '../../../utils/calculateTotal';
import { formatPrice } from '../../../utils/formatPrice';
import Button from '../../common/Button/Button';

class OrderForm extends React.Component {
  state = {
    name: '',
    phone: '',
  };

  validateForm(data) {
    console.log('data', data);
    if (!data.name) {
      this.setState({ error: 'Name field is required' });
      return false;
    }
    this.setState({ error: null });
    return true;
  }

  sendOrder(options, tripCost, tripId, tripName, countryCode) {
    // const { options, setOrderOption, tripCost, tripId, tripName, countryCode } = this.props;
    const isValid = this.validateForm(options);
    if (!isValid) {
      return;
    }
    const totalCost = formatPrice(calculateTotal(tripCost, options));

    const payload = {
      ...options,
      totalCost,
      tripId,
      tripName,
      countryCode,
    };

    const url = settings.db.url + '/' + settings.db.endpoint.orders;

    const fetchOptions = {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    fetch(url, fetchOptions)
      .then(function(response) {
        return response.json();
      })
      .then(function(parsedResponse) {
        console.log('parsedResponse', parsedResponse);
      });
  }

  render() {
    const {
      options,
      setOrderOption,
      tripCost,
      tripId,
      tripName,
      countryCode,
    } = this.props;
    return (
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
        <Button
          onClick={() =>
            this.sendOrder(options, tripCost, tripId, tripName, countryCode)
          }
        >
          Order now!
        </Button>
        {this.state.error && <p>{this.state.error}</p>}
      </Row>
    );
  }
}

OrderForm.propTypes = {
  tripCost: PropTypes.node,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  tripId: PropTypes.string,
  tripName: PropTypes.string,
  countryCode: PropTypes.any,
};

export default OrderForm;
