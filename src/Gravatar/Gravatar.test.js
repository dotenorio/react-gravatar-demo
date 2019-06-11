import React from 'react';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import jsonp from 'universal-jsonp';
import Gravatar from './Gravatar';

jest.mock('universal-jsonp')

test('Load Gravatar', async () => {  
  const wrapper = shallow(
    <Gravatar />
  );

  const entry = [
    {
      "preferredUsername": "dotenorio",
      "thumbnailUrl": "https://secure.gravatar.com/avatar/9c62a4730ba4ebf764862b7866038dcb"
    }
  ]

  jsonp.mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({
      entry
    }),
    ok: true
  }));

  jsonp.mockImplementationOnce(() => Promise.resolve({
    ok: false
  }));
  
  const EmailForm = wrapper.find('EmailForm');
  const EmailFormWraper = EmailForm.shallow();
  const Result = EmailFormWraper.find('Result');
  const ResultWrapper = Result.shallow();
  
  expect(EmailForm.length).toEqual(1);
  expect(EmailFormWraper.find('label').length).toEqual(1);
  expect(EmailFormWraper.find('label').text()).toEqual('Email:');
  expect(EmailFormWraper.find('input[type="text"]').length).toEqual(1);
  expect(EmailFormWraper.find('input[type="submit"]').length).toEqual(1);

  expect(Result.length).toEqual(1);
  expect(ResultWrapper.find('pre').text()).toContain('Insert your email above to see results!');
  
  // ToDo ~> Quebrar os blocos abaixo em 3 testes diferentes
  
  // Success
  EmailFormWraper.find('input[type="text"]').simulate('change', { target: { value: 'dotenorio@gmail.com'} });
  EmailFormWraper.find('form').simulate('submit', { preventDefault: () => { } });
  
  // Success :: With Image
  ResultWrapper.setProps({ res: entry[0] });
  expect(ResultWrapper.find('img').length).toEqual(1);

  // Forced Error
  EmailFormWraper.find('input[type="text"]').simulate('change', { target: { value: 'invalid@mail.com'} });
  EmailFormWraper.find('form').simulate('submit', { preventDefault: () => { } });
})

test('Gravatar renders correctly', () => {
  const tree = renderer
    .create(<MemoryRouter><Gravatar /></MemoryRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});