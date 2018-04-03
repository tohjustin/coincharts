import React, { Component } from "react";
import PropTypes from "prop-types";

import BigAmount from "../BigAmount";
import { PROPTYPES } from "../../constants";
import PriceDetails from "./PriceDetails";
import "./index.css";

class TableMobile extends Component {
  constructor(props) {
    super(props);

    // Bind event-handlers
    this.handleOnSelectChange = this.handleOnSelectChange.bind(this);
  }

  handleOnSelectChange(event) {
    const { onCryptocurrencyChange } = this.props;
    onCryptocurrencyChange(event.target.value);
  }

  render() {
    const {
      currency,
      spotPrice,
      priceDifference,
      percentDifference,
      cryptocurrencies,
      selectedCryptocurrency,
    } = this.props;

    return (
      <div className="TableMobile">
        <div>
          <BigAmount type="currency" currency={currency} value={spotPrice} />
          <PriceDetails currency={currency} priceDifference={priceDifference} percentDifference={percentDifference} />
        </div>
        <select className="Dropdown" value={selectedCryptocurrency} onChange={this.handleOnSelectChange}>
          {cryptocurrencies.map(crypto => <option key={crypto.key}>{crypto.key}</option>)}
        </select>
      </div>
    );
  }
}

TableMobile.propTypes = {
  percentDifference: PropTypes.number.isRequired,
  priceDifference: PropTypes.number.isRequired,
  spotPrice: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  cryptocurrencies: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
    }),
  ).isRequired,
  selectedCryptocurrency: PROPTYPES.CRYPTOCURRENCY.isRequired,
  onCryptocurrencyChange: PropTypes.func.isRequired,
};

export default TableMobile;
