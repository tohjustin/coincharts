import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { extent } from "d3-array";
import { scaleLinear } from "d3-scale";
import currencyFormatter from "currency-formatter";
import styled from "styled-components";

import { DEFAULT_PROPS, PROPTYPES, MOBILE_WIDTH } from "../../constants";
import { GRAPH_PADDING_TOP, TICK_COUNT_DESKTOP, TICK_COUNT_MOBILE } from "./constants";
import Cursor from "./Cursor";
import Graph from "./Graph";
import HorizontalAxis from "./HorizontalAxis";
import HoverContainer from "./HoverContainer";
import VerticalAxis from "./VerticalAxis";

const StyledChart = styled.div`
  cursor: crosshair;
  height: 100%;
  width: 100%;
  position: relative;

  svg {
    position: absolute;
    left: 0;
    top: 0;
  }
`;

const INITIAL_STATE = {
  dimensions: {
    height: 0,
    width: 0,
  },
  hovered: false,
  hoveredValue: {},
  hoverX: -1,
  hoverY: -1,
};

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    // Bind event-handlers
    this.handleResize = this.handleResize.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    const { height, width } = this.chartSvgComponent.getBoundingClientRect();
    const dimensions = {
      height: Math.round(height),
      width: Math.round(width),
    };

    this.setState({ dimensions });
  }

  // Show hover elements
  handleMouseEnter() {
    this.setState({ hovered: true });
  }

  // Hide hover elements
  handleMouseLeave() {
    this.setState({ hovered: false });
  }

  // Update hover position
  handleMouseMove(e) {
    const { data, currency } = this.props;

    // Find closest data point to the x-coordinates of where the user's mouse is hovering
    const hoverX = e.nativeEvent.clientX - this.chartSvgComponent.getBoundingClientRect().left;

    this.setState(prevState => {
      const { dimensions } = prevState;
      const index = Math.round(hoverX / dimensions.width * (data.length - 1));
      const hoveredDatapoint = data[index] || {};
      const hoveredValue = {
        price: hoveredDatapoint.price && currencyFormatter.format(hoveredDatapoint.price, { code: currency }),
        time: hoveredDatapoint.time && hoveredDatapoint.time.toLocaleString(),
      };

      const scalePriceToY = scaleLinear()
        .range([dimensions.height, GRAPH_PADDING_TOP])
        .domain(extent(data, d => d.price));
      const hoverY = scalePriceToY(hoveredDatapoint.price) || 0;

      return {
        hovered: Boolean(hoveredDatapoint),
        hoveredValue,
        hoverX,
        hoverY,
      };
    });
  }

  render() {
    const { dimensions, hoveredValue: { price, time }, hoverX, hoverY, hovered } = this.state;
    const { color, currency, data, durationType } = this.props;
    const svgRef = node => {
      this.chartSvgComponent = node;
    };

    return (
      <MediaQuery minWidth={MOBILE_WIDTH}>
        {isDesktopView => (
          <div className="chart">
            <div className="topSection">
              <VerticalAxis data={data} currency={currency} align="left" />
              <StyledChart
                data-testid="HoverRegion"
                innerRef={svgRef}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onMouseMove={this.handleMouseMove}
              >
                <Graph color={color} data={data} height={dimensions.height} width={dimensions.width} />
                {isDesktopView && <Cursor height={dimensions.height} visible={hovered} x={hoverX} y={hoverY} />}
                {isDesktopView && <HoverContainer position="top" label={price} visible={hovered} x={hoverX} />}
                {isDesktopView && <HoverContainer position="bottom" label={time} visible={hovered} x={hoverX} />}
              </StyledChart>
              {isDesktopView && <VerticalAxis data={data} currency={currency} align="right" />}
            </div>
            <HorizontalAxis
              data={data}
              duration={durationType}
              hideRightMargin={!isDesktopView}
              tickCount={isDesktopView ? TICK_COUNT_DESKTOP : TICK_COUNT_MOBILE}
            />
          </div>
        )}
      </MediaQuery>
    );
  }
}

Chart.propTypes = {
  currency: PROPTYPES.CURRENCY.isRequired,
  data: PROPTYPES.PRICE_DATA.isRequired,
  durationType: PROPTYPES.DURATION.isRequired,
  color: PROPTYPES.COLOR,
};

Chart.defaultProps = {
  color: DEFAULT_PROPS.COLOR,
};

export default Chart;
