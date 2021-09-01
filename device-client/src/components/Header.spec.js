/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from '../../jest/enzyme';
import Header from './Header';

describe('<Header />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Header/>);
  });

  it('Render Correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
