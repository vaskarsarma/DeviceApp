/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from '../../jest/enzyme';
import Device from './Device';

describe('<Device />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Device/>);
  });

  it('Render Correctly', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
