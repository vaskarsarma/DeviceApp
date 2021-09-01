/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from '../../jest/enzyme';
import DeviceForm from './DeviceForm';

describe('<DeviceForm />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<DeviceForm/>);
  });

  it('Render Correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
