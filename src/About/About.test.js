import React from 'react';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import About from './About';

test('Load About', () => {
  const wrapper = shallow(
    <About />
  );

  expect(wrapper.contains(<p>A React Gravatar Demo..</p>)).toEqual(true);
  expect(wrapper.find('p').last().text()).toEqual('See more on Github.');
})

test('About renders correctly', () => {
  const tree = renderer
    .create(<MemoryRouter><About /></MemoryRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});