import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';

import OrderOptionNumber from './OrderOptionNumber';
import OrderOptionDropdown from './OrderOptionDropdown';
import OrderOptionIcons from './OrderOptionIcons';
import OrderOptionCheckboxes from './OrderOptionCheckboxes';
import OrderOptionText from './OrderOptionText';
import OrderOptionDate from './OrderOptionDate';

const optionTypes = {
  dropdown: OrderOptionDropdown,
  icons: OrderOptionIcons,
  checkboxes: OrderOptionCheckboxes,
  number: OrderOptionNumber,
  text: OrderOptionText,
  date: OrderOptionDate,
};

const OrderOption = ({ name, type, id, setOrderOption, ...otherProps }) => {
  const OptionComponent = optionTypes[type];
  if (!OptionComponent) {
    return null;
  }
  return (
    <div className={styles.component}>
      <h3 className={styles.title}>{name}</h3>
      <OptionComponent
        {...otherProps}
        setOptionValue={value => setOrderOption({ [id]: value })}
      />
    </div>
  );
};

OrderOption.propTypes = {
  name: PropTypes.any,
  type: PropTypes.any,
  id: PropTypes.any,
  setOrderOption: PropTypes.func,
};

export default OrderOption;
