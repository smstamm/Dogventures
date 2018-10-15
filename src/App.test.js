import React from 'react';
import App from './App';
import { shallow } from 'enzyme';


describe('app rendering', () => {
	it('renders without crashing', () => {
		shallow(<App />);
	});
});