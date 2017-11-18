import React, { Component } from "react";
import PropTypes from "prop-types";
import { extent } from "d3-array";
import { scaleLinear } from "d3-scale";

import { formatCurrency } from "../../utils";
import Chart from "./Chart";
import Cursor from "./Cursor";
import HorizontalChartAxis from "./HorizontalChartAxis";
import HoverContainer from "./HoverContainer";
import VerticalChartAxis from "./VerticalChartAxis";

import "./index.css";

const ACTIVE_CURRENCY = "usd";
const CHART_PADDING_TOP = 20;
const DEFAULT_COLOR = {
  fill: "#FFEBC5",
  stroke: "#FFB119"
};
const INITIAL_STATE = {
  dimensions: {
    height: 0,
    width: 0
  },
  hovered: false,
  hoveredValue: {},
  hoverX: -1,
  hoverY: -1,
  scalePriceToY: undefined
};

class PriceChart extends Component {
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
      width: Math.round(width)
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
    const { data } = this.props;
    const { dimensions } = this.state;

    // Find closest data point to the x-coordinates of where the user's mouse is hovering
    const hoverX =
      e.nativeEvent.clientX -
      this.chartSvgComponent.getBoundingClientRect().left;
    const index = Math.round(hoverX / dimensions.width * (data.length - 1));
    const hoveredDatapoint = data[index] || {};
    const hoveredValue = {
      price:
        hoveredDatapoint.price &&
        formatCurrency(hoveredDatapoint.price, ACTIVE_CURRENCY),
      time: hoveredDatapoint.time && hoveredDatapoint.time.toLocaleString()
    };

    const scalePriceToY = scaleLinear()
      .range([dimensions.height, CHART_PADDING_TOP])
      .domain(extent(data, d => d.price));
    const hoverY = scalePriceToY(hoveredDatapoint.price) || 0;

    this.setState({
      hovered: Boolean(hoveredDatapoint),
      hoveredValue,
      hoverX,
      hoverY
    });
  }

  render() {
    const { dimensions, hoveredValue, hoverX, hoverY, hovered } = this.state;
    const { color, data, durationType } = this.props;
    const svgRef = node => {
      this.chartSvgComponent = node;
    };

    return (
      <div className="chart">
        <div className="topSection">
          <VerticalChartAxis data={data} textAlign="left" />
          <div className="PriceChart">
            <div>
              <HoverContainer
                top
                value={hoveredValue.price}
                visible={hovered}
                x={hoverX}
              />
              <HoverContainer
                bottom
                value={hoveredValue.time}
                visible={hovered}
                x={hoverX}
              />
            </div>
            <svg
              ref={svgRef}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              onMouseMove={this.handleMouseMove}
            >
              <Chart
                height={dimensions.height}
                width={dimensions.width}
                data={data}
                color={color}
              />
              <Cursor
                height={dimensions.height}
                visible={hovered}
                x={hoverX}
                y={hoverY}
              />
            </svg>
          </div>
          <VerticalChartAxis data={data} textAlign="right" />
        </div>
        <HorizontalChartAxis data={data} duration={durationType} />
      </div>
    );
  }
}

PriceChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number,
      time: PropTypes.date
    })
  ).isRequired,
  color: PropTypes.shape({
    fill: PropTypes.string,
    stroke: PropTypes.string
  }),
  durationType: PropTypes.string.isRequired
};

PriceChart.defaultProps = {
  color: DEFAULT_COLOR
};

export default PriceChart;
