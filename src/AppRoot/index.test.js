import React from 'react';
import AppRoot from './index';
import { shallow } from 'enzyme';


describe('app rendering', () => {
  it('renders without crashing', () => {
    shallow(<AppRoot />);
  });
});