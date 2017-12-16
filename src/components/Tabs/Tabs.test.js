import React from "react";
import { shallow } from "enzyme";

import Tabs from "./Tabs";
import Default from "./index";

describe("<Tabs />", () => {
  it("exports <Tabs/> by default", () => {
    expect(Default).toEqual(Tabs);
  });

  it("renders without crashing", () => {
    const props = {
      options: {},
      onChange: () => {},
      selectedKey: undefined
    };

    const wrapper = shallow(<Tabs {...props} />);
    expect(wrapper.find(".Tabs")).toHaveLength(1);
  });

  it("renders same amount of tab-items as the # of keys in `props.options` (keys > 0)", () => {
    const props = {
      options: {
        key0: {
          listKey: "testListKey0",
          element: "<div>test0</div>"
        },
        key1: {
          listKey: "testListKey1",
          element: "<div>test1</div>"
        },
        key2: {
          listKey: "testListKey2",
          element: "<div>test2</div>"
        }
      },
      onChange: () => {},
      selectedKey: undefined
    };
    const numberOfKeysInOptions = Object.keys(props.options).length;

    const wrapper = shallow(<Tabs {...props} />);
    expect(wrapper.find(".Tabs-item")).toHaveLength(numberOfKeysInOptions);
  });

  it("renders same amount of tab-items as the # of keys in `props.options` (keys = 0)", () => {
    const props = {
      options: {},
      onChange: () => {},
      selectedKey: undefined
    };
    const numberOfKeysInOptions = Object.keys(props.options).length;

    const wrapper = shallow(<Tabs {...props} />);
    expect(wrapper.find(".Tabs-item")).toHaveLength(numberOfKeysInOptions);
  });

  it("does not add `.selected` class when `props.selectedKey` is undefined", () => {
    const props = {
      options: {
        key0: {
          listKey: "testListKey0",
          element: "<div>test0</div>"
        },
        key1: {
          listKey: "testListKey1",
          element: "<div>test1</div>"
        }
      },
      onChange: () => {},
      selectedKey: undefined
    };

    const wrapper = shallow(<Tabs {...props} />);
    expect(wrapper.find(".Tabs-item .selected")).toHaveLength(0);
  });

  it("adds `.selected` class when `props.option`'s key matches `props.selectedKey`", () => {
    const props = {
      options: {
        key0: {
          listKey: "testListKey0",
          element: "<div>test0</div>"
        },
        key1: {
          listKey: "testListKey1",
          element: "<div>test1</div>"
        }
      },
      onChange: () => {},
      selectedKey: "key1"
    };
    const selectedOptionListKey = props.options[props.selectedKey].listKey;

    const wrapper = shallow(<Tabs {...props} />);
    expect(wrapper.find(".Tabs-item .selected")).toHaveLength(1);
    expect(wrapper.find(".Tabs-item .selected").key()).toEqual(selectedOptionListKey);
  });

  it("adds `.selected` class when `props.option`'s key matches `props.selectedKey`", () => {
    const props = {
      options: {
        key0: {
          listKey: "testListKey0",
          element: "<div>test0</div>"
        },
        key1: {
          listKey: "testListKey1",
          element: "<div>test1</div>"
        }
      },
      onChange: () => {},
      selectedKey: "key1"
    };
    const selectedOptionListKey = props.options[props.selectedKey].listKey;

    const wrapper = shallow(<Tabs {...props} />);
    expect(wrapper.find(".Tabs-item .selected")).toHaveLength(1);
    expect(wrapper.find(".Tabs-item .selected").key()).toEqual(selectedOptionListKey);
  });

  it("triggers `props.onChange` when tab-item is clicked", () => {
    const props = {
      options: {
        key0: {
          listKey: "testListKey0",
          element: "<div>test0</div>"
        },
        key1: {
          listKey: "testListKey1",
          element: "<div>test1</div>"
        }
      },
      onChange: jest.fn(),
      selectedKey: undefined
    };

    const wrapper = shallow(<Tabs {...props} />);

    // Simulate clicking on 1st tab-item
    props.onChange.mockClear();
    wrapper
      .find(".Tabs-item")
      .at(0)
      .simulate("click");
    expect(props.onChange).toBeCalledWith("key0");
    expect(props.onChange).not.toBeCalledWith("key1");

    // Simulate clicking on 2nd tab-item
    props.onChange.mockClear();
    wrapper
      .find(".Tabs-item")
      .at(1)
      .simulate("click");
    expect(props.onChange).not.toBeCalledWith("key0");
    expect(props.onChange).toBeCalledWith("key1");
  });
});
