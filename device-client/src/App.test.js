import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from '../jest/enzyme';
import App from './App';
import Header from './components/Header';

describe('<App />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should render correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('Header should render', () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });
});
