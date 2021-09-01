/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from '../../jest/enzyme';
import GetTransactionCount from './GetTransactionCount';

describe('<GetTransactionCount />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<GetTransactionCount/>);
  });

  it('Render Correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
