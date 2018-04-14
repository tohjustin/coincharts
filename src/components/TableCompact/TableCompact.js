import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import currencyFormatter from "currency-formatter";

import BigAmount from "../BigAmount";
import Flex from "../Flex";
import { PROPTYPES } from "../../constants";
import { animation, border, color, fontFamily, fontSize, fontWeight, size } from "../../styles/constants";
import arrowIcon from "./assets/arrow-icon.png";

const DOWN_ARROW_DESCRIPTION = "Arrow pointing downwards";
const UP_ARROW_DESCRIPTION = "Arrow pointing upwards";

const StyledTableCompact = styled(Flex)`
  box-sizing: border-box;
  color: ${color.slateDark};
  padding: ${size.large} 0;
  height: 140px;
`;

const Dropdown = styled.select`
  -webkit-appearance: none;
  background-position: right 8px center;
  background: url(${arrowIcon}) right 8px center / 8px no-repeat ${color.white};
  border-image: initial;
  border-radius: ${border.radius};
  border: ${border.border}
  color: ${color.slateDark};
  cursor: pointer;
  flex: 1 1 0%;
  font-family: ${fontFamily.regular};
  font-size: ${fontSize.small};
  font-weight: ${fontWeight.medium};
  max-width: 100px;
  outline: none;
  padding: 8px 22px 8px 8px;
  text-transform: uppercase;
  transition: ${animation.default};
`;

const PriceDetails = styled.div.attrs({
  color: props => (props.positive ? color.positive : color.slateDark),
  transform: props => (props.positive ? "rotate(0deg)" : "rotate(180deg)"),
})`
  color: ${props => props.color};
  font-size: ${fontSize.small};
  font-weight: ${fontWeight.medium};

  svg {
    fill: ${props => props.color};
    height: 11px;
    margin-right: 4px;
    transform: ${props => props.transform};
    width: 11px;
  }
`;

class TableCompact extends Component {
  static renderSVGArrow(isDirectionUpward) {
    return (
      <svg height="12" width="12" viewBox="8135 12432 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <title>Arrow</title>
        <desc>{isDirectionUpward ? UP_ARROW_DESCRIPTION : DOWN_ARROW_DESCRIPTION}</desc>
        <path fillRule="evenodd" d="M8149.72 12439.36l-7.36-7.36-7.36 7.36 1 1 5.64-5.64v11.82h1.4v-11.87l5.68 5.69z" />
      </svg>
    );
  }

  constructor(props) {
    super(props);

    // Bind event-handlers
    this.handleOnSelectChange = this.handleOnSelectChange.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { isLoading } = nextProps;
    return !isLoading;
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
    const formattedPriceDifference = currencyFormatter.format(Math.abs(priceDifference), { code: currency });
    const formattedPercentDifference = Math.abs(percentDifference).toFixed(2);

    return (
      <StyledTableCompact align="center" justify="space-between">
        <div>
          <BigAmount type="currency" currency={currency} value={spotPrice} />
          <PriceDetails positive={priceDifference > 0}>
            {TableCompact.renderSVGArrow(priceDifference > 0)}
            <span data-testid="price-details">{`${formattedPriceDifference} (${formattedPercentDifference}%)`}</span>
          </PriceDetails>
        </div>
        <Dropdown value={selectedCryptocurrency} onChange={this.handleOnSelectChange}>
          {cryptocurrencies.map(crypto => (
            <option key={crypto.key} value={crypto.key}>
              {crypto.key}
            </option>
          ))}
        </Dropdown>
      </StyledTableCompact>
    );
  }
}

TableCompact.propTypes = {
  isLoading: PropTypes.bool.isRequired,
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

export default TableCompact;
