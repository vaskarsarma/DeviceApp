/* eslint-disable global-require */
import 'babel-regenerator-runtime';
import noop from 'lodash/noop';
import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.3';

process.env.TEST = true;
process.env.UI_ASSETS_URL = '/uiassets/';
global.__SAFE_RENDER__ = false;
// apply React 16 adapter
Enzyme.configure({ adapter: new Adapter() });

// Enzyme methods save to global
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.MEDIA_URL = '';
global.__BROWSER__ = true;
global.__APP_MOUNT__ = true;
global.__INITIAL_STATE__ = { get resources() {
  return global.resources;
}};

jest.mock('store', () => {
  global.resources = setResources();

  function setResources(newresources = {}) {
    global.resources = {
      ...newresources,
      getRawResource(string) {
        return global.resources[string];
      },
    };
  }

  function setResMap(map) {
    if (!map) {
      return {};
    }

    const { resources } = global;
    return Object.keys(map).reduce((res, key) => {
      if (typeof map[key] !== 'object') {
        res[key] = resources[map[key]];
      } else if (Array.isArray(map[key])) {
        res[key] = map[key].map(item => setResMap(item));
      } else {
        res[key] = setResMap(map[key]);
      }
      return res;
    }, {});
  }

  return {
    ...require.requireActual('store'),
    __setResources: jest.fn(setResources),
    connectResources: jest.fn(map => Comp => {
      if (!global.resources) {
        setResources();
      }
      function Wrapper(props) {
        const resMap = {
          ...setResMap(map),
          getRawResource(string) {
            return global.resources[string];
          },
        };
        return (
          <Comp
            {...props}
            resources={resMap}
          />
        );
      }
      Wrapper.displayName = `WithResources(${Comp.displayName || Comp.name})`;
      return Wrapper;
    }),

  };
});

// eslint-disable-next-line global-require
jest.mock('react-responsive-redux', () => {
  let fakeWidth = 1240;
  return {
    __setFakeWidth: value => (fakeWidth = value),
    responsiveWrapper: jest.fn(({ minWidth = 0, maxWidth = Infinity }) => ({ children }) =>
      (fakeWidth >= minWidth && fakeWidth <= maxWidth ? children : null),
    ),
  };
});

jest.mock('react-dom', () => {
  const __portalNodes = [];
  return {
    ...require.requireActual('react-dom'),
    __portalNodes,
    createPortal: jest.fn((el, node) => {
      if (!__portalNodes.find(portalNode => node === portalNode)) {
        __portalNodes.push(node);
      }
      return el;
    }),
  };
});

jest.mock('utils/dom-utils/get-modal-root', () => {
  const modalRoot = {
    appendChild: jest.fn(),
    removeChild: jest.fn(),
    querySelector: jest.fn(),
    querySelectorAll: jest.fn(),
    clientWidth: 0,
  };
  return {
    getModalRoot: () => modalRoot,
  };
});

jest.mock('utils/dom-utils/ping-image-url', () => jest.fn(src => Promise.resolve(src)));

global.Element.prototype.querySelector = jest.fn(() => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  focus: jest.fn(),
  setAttribute: jest.fn(),
  getBoundingClientRect: jest.fn(() => ({
    height: 0,
    width: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  })),
  style: jest.fn(() => {}),
}));

const _Date = Date;
global.MOCK_TIME = 1514764800000;
global.Date = jest.fn((...args) => (args.length ? new _Date(...args) : new _Date(global.MOCK_TIME)));
global.Date.now = jest.fn(() => global.MOCK_TIME);
global.Date.UTC = _Date.UTC;

jest.mock('@atoms/script', () => jest.fn(() => null));
jest.mock('utils/hocs/with-breakpoints', () => {
  const actual = require.requireActual('utils/hocs/with-breakpoints');
  const __contextDataSetter = jest.fn(() => ({ breakpoint: 'medium' }));
  const mock = jest.fn(() => Component => props => (
    <Component
      {...__contextDataSetter()}
      {...props}
    />
  ));
  mock.BREAKPOINTS_NAMES = actual.default.BREAKPOINTS_NAMES;
  mock.BreakpointPropType = actual.BreakpointPropType;
  mock.__contextData = __contextDataSetter;
  return mock;
});

const createStorage = () => {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, data) {
      store[key] = data.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
};

global.dataLayer = { push: noop };
global.localStorage = createStorage();
global.sessionStorage = createStorage();

const { createEvent } = global.Document.prototype;
global.document.createEvent = function _createEvent(type, ...arg) {
  const typeLower = type.toLowerCase();

  if (typeLower === 'storageevent') {
    const storageevent = createEvent.call(global.document, 'customevent', ...arg);
    storageevent.initStorageEvent = (name, bubbles, cancelable) => {
      storageevent.initEvent(name, bubbles, cancelable);
    };
    return storageevent;
  }

  return createEvent.call(global.document, type, ...arg);
};

jest.mock('store/selectors', () => {
  const __resourcesGetter = jest.fn(() => ({}));
  const actual = require.requireActual('store/selectors');
  const resourcesSelector = jest.fn((...args) => __resourcesGetter(...args));
  return {
    ...actual,
    __resourcesGetter,
    __resourcesDefaultSelector: actual.resourcesSelector,
    __useActualResourceSelector: () => resourcesSelector.mockImplementation(actual.resourcesSelector),
    __useMockResourceSelector: () => resourcesSelector.mockImplementation(__resourcesGetter),
    resourcesSelector,
  };
});
