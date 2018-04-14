import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import BigAmount from "../BigAmount";
import Flex from "../Flex";
import { border, color, fontSize, fontWeight, size } from "../../styles/constants";

const StyledTable = styled(Flex)`
  box-sizing: border-box;
  text-align: center;
  padding: ${size.large} 0;
  border-bottom: ${border.border};
`;

const TableCell = styled(Flex)`
  color: ${color.slateDark};
  font-size: ${fontSize.mega};
  width: 100%;

  &:not(:first-child) {
    border-left: ${border.border};
  }
`;

const Label = styled.div`
  color: ${color.coinchartsGray};
  font-size: ${fontSize.small};
  font-weight: ${fontWeight.medium};
  letter-spacing: ${size.tiny};
  text-transform: uppercase;
`;

class Table extends Component {
  shouldComponentUpdate(nextProps) {
    const { isLoading } = nextProps;
    return !isLoading;
  }

  render() {
    const { cryptocurrencyLabel, durationLabel, percentDifference, priceDifference, spotPrice, currency } = this.props;
    const showOtherCells = Boolean(durationLabel);

    return (
      <StyledTable justify="space-around">
        <TableCell column justify="center">
          <BigAmount type="currency" value={spotPrice} currency={currency} />
          <Label>{cryptocurrencyLabel} price</Label>
        </TableCell>
        {showOtherCells && (
          <TableCell column justify="center">
            <BigAmount type="currency" value={priceDifference} currency={currency} showPlusMinusSymbol />
            <Label>{`${durationLabel} (${currency})`}</Label>
          </TableCell>
        )}
        {showOtherCells && (
          <TableCell column justify="center">
            <BigAmount type="percentage" value={percentDifference} showPlusMinusSymbol />
            <Label>{durationLabel} (%)</Label>
          </TableCell>
        )}
      </StyledTable>
    );
  }
}

Table.propTypes = {
  cryptocurrencyLabel: PropTypes.string.isRequired,
  durationLabel: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  percentDifference: PropTypes.number.isRequired,
  priceDifference: PropTypes.number.isRequired,
  spotPrice: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

export default Table;
