import React, { Component } from "react";
import { extent } from "d3-array";
import { scaleLinear } from "d3-scale";
import MediaQuery from "react-responsive";

import { DEFAULT_PROPS, PROPTYPES, MOBILE_WIDTH } from "../../constants";
import { formatCurrency } from "../../utils";
import Graph from "./Graph";
import { GRAPH_PADDING_TOP, TICK_COUNT_DESKTOP, TICK_COUNT_MOBILE } from "./constants";
import Cursor from "./Cursor";
import HorizontalAxis from "./HorizontalAxis";
import HoverContainer from "./HoverContainer";
import VerticalAxis from "./VerticalAxis";

import "./index.css";

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
        price: hoveredDatapoint.price && formatCurrency(hoveredDatapoint.price, currency),
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

  renderMobile() {
    const { dimensions } = this.state;
    const { color, currency, data, durationType } = this.props;
    const svgRef = node => {
      this.chartSvgComponent = node;
    };

    return (
      <div className="chart mobile">
        <div className="topSection">
          <VerticalAxis data={data} currency={currency} textAlign="left" />
          <div className="Chart">
            <svg ref={svgRef}>
              <Graph height={dimensions.height} width={dimensions.width} data={data} color={color} />
            </svg>
          </div>
        </div>
        <HorizontalAxis data={data} duration={durationType} tickCount={TICK_COUNT_MOBILE} />
      </div>
    );
  }

  renderDesktop() {
    const { dimensions, hoveredValue, hoverX, hoverY, hovered } = this.state;
    const { color, currency, data, durationType } = this.props;
    const svgRef = node => {
      this.chartSvgComponent = node;
    };

    return (
      <div className="chart">
        <div className="topSection">
          <VerticalAxis data={data} currency={currency} textAlign="left" />
          <div className="Chart">
            <div>
              <HoverContainer position="top" label={hoveredValue.price} visible={hovered} x={hoverX} />
              <HoverContainer position="bottom" label={hoveredValue.time} visible={hovered} x={hoverX} />
            </div>
            <svg
              ref={svgRef}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              onMouseMove={this.handleMouseMove}
            >
              <Graph height={dimensions.height} width={dimensions.width} data={data} color={color} />
              <Cursor height={dimensions.height} visible={hovered} x={hoverX} y={hoverY} />
            </svg>
          </div>
          <VerticalAxis data={data} currency={currency} textAlign="right" />
        </div>
        <HorizontalAxis data={data} duration={durationType} tickCount={TICK_COUNT_DESKTOP} />
      </div>
    );
  }

  render() {
    return (
      <MediaQuery maxWidth={MOBILE_WIDTH}>
        {matches => (matches ? this.renderMobile() : this.renderDesktop())}
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
