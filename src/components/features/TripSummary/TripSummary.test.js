import React from 'react';
import { shallow } from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should generate valid link if props id is abc', () => {
    const propsId = 'abc';
    const component = shallow(<TripSummary id={propsId} />);
    const renderedLink = component.find('.link').prop('to');
    expect(renderedLink).toEqual(`/trip/${propsId}`);
  });

  it('image should have valid src and alt', () => {
    const expectedAlt = 'text';
    const expectedSrc = 'image';
    const component = shallow(
      <TripSummary name={expectedAlt} image={expectedSrc} />
    );

    expect(component.find('img').prop('src')).toEqual(expectedSrc);
    expect(component.find('img').prop('alt')).toEqual(expectedAlt);
  });

  it('should render correct props days, name, cost', () => {
    const component = shallow(
      <TripSummary days={5} name='Lorem Ipsum' cost='99' />
    );

    expect(component.find('.details span').at(0).text()).toEqual(`${5} days`);
    expect(component.find('.details span').at(1).text()).toEqual(`from ${'99'}`);
    expect(component.find('.title').text()).toEqual('Lorem Ipsum');

  });

  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('should render tags array correctly', () => {
    const expectedArray = ['abc', 'xyz', 'ccc'];
    const component = shallow(<TripSummary tags={expectedArray} />);

    expect(component.find('.tags span').at(0).text()).toEqual(expectedArray[0]);
    expect(component.find('.tags span').at(1).text()).toEqual(expectedArray[1]);
    expect(component.find('.tags span').at(2).text()).toEqual(expectedArray[2]);
  });

  it('should render tags div if tags is truthy', () => {
    const component = shallow(<TripSummary tags={[]} />);

    expect(component.find('.tags')).toBeTruthy();
  });
});
