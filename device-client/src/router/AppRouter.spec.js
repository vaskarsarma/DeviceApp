/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from '../../jest/enzyme';
import AppRouter from './AppRouter';

describe('<AppRouter />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AppRouter/>);
  });

  it('Render Correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
