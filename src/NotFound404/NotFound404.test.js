import React from 'react';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import NotFound404 from './NotFound404';

test('Load NotFound404', () => {
  const wrapper = shallow(
    <NotFound404 />
  );

  expect(wrapper.contains(<p>Page Not Found</p>)).toEqual(true);
  expect(wrapper.contains(<p>:(</p>)).toEqual(true);
})

test('NotFound404 renders correctly', () => {
  const tree = renderer
    .create(<MemoryRouter><NotFound404 /></MemoryRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});