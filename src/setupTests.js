import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import { shallow, render } from 'enzyme';

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;