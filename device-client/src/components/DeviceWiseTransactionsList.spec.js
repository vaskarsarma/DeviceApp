/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from '../../jest/enzyme';
import DeviceWiseTransactionsList from './DeviceWiseTransactionsList';

describe('<DeviceWiseTransactionsList />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<DeviceWiseTransactionsList/>);
  });

  it('Render Correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
