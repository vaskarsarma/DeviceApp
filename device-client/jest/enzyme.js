/* eslint-disable no-underscore-dangle */
import Enzyme, {
  configure, shallow, mount, render,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
export { shallow, mount, render };
export default Enzyme;

global.window._env_ = {};
