import React from 'react';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import Layout from './Layout';

test('Load layout with title and children', () => {
  const title = 'Test Title'
  const content = 'Test'
  const wrapper = shallow(
    <Layout title={title}>
      <p>{content}</p>
    </Layout>
  );

  expect(wrapper.find('div.content').exists()).toEqual(true);
  expect(wrapper.find('Header').props().title).toEqual(title);
  expect(wrapper.contains(<p>{content}</p>)).toEqual(true);
})

test('Layout renders correctly', () => {
  const tree = renderer
    .create(<MemoryRouter><Layout /></MemoryRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});