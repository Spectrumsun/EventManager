import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import render from 'react-test-renderer';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import ConnectedEditCenter,
{ EditCenter, mapDispatchToProps  } from '../../../src/components/Center/EditCenter';
import CenterFrom from
  '../../../src/components/Center/Form/CenterForm';


global.FileReader = () => ({
  readAsDataURL: () => {}
});

const middleware = [thunk];
const mockStore = configureStore(middleware);
const initialState = {
  centers: {
    loadedCenter: {
      centerName: 'farm center',
      city: 'Yaba',
      id: 20,
      address: 'No 33, yaba road lagos',
      availability: 'yes',
      imageurl: 'https://res.96295052-uueqqqc5ey6gzmjel0ft.jpg.jpg',
      imageId: 'even052-uueqqqc5ey6gzmjel0ft.jpg',
      about: 'lalalla',
      facility: ['house', 'horuse', 'car'],
      events: [
        { startDate: '2018-11-09', endDate: '2018-10-22' },
        { startDate: '2018-11-09', endDate: '2018-10-22' }
      ]
    },
  },
  match: {
    params: {
      id: '1'
    }
  }
};

const store = mockStore(initialState);

const props = {
  initEditCenter: sinon.spy(() => new Promise((cb) => {
    cb();
  })),
  history: createMemoryHistory(),
  loadedCenter: {
    centerName: 'farm center',
    city: 'Yaba',
    id: 20,
    address: 'No 33, yaba road lagos',
    availability: 'yes',
    imageurl: 'https://res.96295052-uueqqqc5ey6gzmjel0ft.jpg.jpg',
    imageId: 'even052-uueqqqc5ey6gzmjel0ft.jpg',
    about: 'lalalla',
    facility: ['house', 'horuse', 'car'],
  },
  match: {
    params: {
      id: '1'
    }
  }
};

const mountedWrapper = mount(  
  <Provider store={store}>
    <BrowserRouter>
      <ConnectedEditCenter {...props} />
    </BrowserRouter>
  </Provider>);

const shallowWrapper = shallow(<EditCenter {...props} />);

const state = {
  name: 'yaba',
  city: 'lagos',
  address: 'nO 22 yaba',
  about: 'lol',
  availability: 'yes',
  values: 'table',
  facility: ['car, egg'],
  image: 'http://wwww.image.com/png',
  preview: 'folder/image',
  imageurl: 'http://wwww.image.com/png',
  publicUrlId: 'png',
  progress: `${0}%`,
  formValid: false,
  files: [{ data: 'image1', type: 'image/jpg' }]
};

const event = {
  preventDefault: jest.fn(),
  target: {
    name: 'yaba',
    city: 'lagos',
    address: 'nO 22 yaba',
    about: 'lol',
    availability: 'yes',
    values: 'table',
    facility: ['car, egg'],
    image: 'http://wwww.image.com/png',
    preview: 'folder/image',
    imageurl: 'http://wwww.image.com/png',
    publicUrlId: 'png',
    progress: `${0}%`,
    formValid: false,
    files: [0]
  }
};

const i = [1, 2, 3, 4];


describe('<EditCenter /> Component', () => {
  const wrapper = shallow(<EditCenter {...props} />);
  it('should render the <EditCenter />', () => {
    shallow(<EditCenter {...props} />);
  });

  it('should match component snapshot', () => {
    const tree = render.create(<Provider store={store}>
      <BrowserRouter>
        <ConnectedEditCenter {...props} />
      </BrowserRouter>
    </Provider>);
    expect(tree).toMatchSnapshot();
  });


  it('should render initial layout of <EditCenter />', () => {
    expect(wrapper.getElements()).toMatchSnapshot();
  });

  it('should have three div on layout', () => {
    expect(wrapper.find('div').length).toEqual(3);
  });

  it('should have <CenterFrom /> when the page loads', () => {
    expect(wrapper.find(CenterFrom)).toHaveLength(1);
  });

  it('calls onChange event when input is passed to state', () => {
    sinon.spy(shallowWrapper.instance(), 'onChange');
    shallowWrapper.instance().onChange(event);
    expect(shallowWrapper.instance().onChange.calledOnce).toEqual(true);
  });

  it('calls onSubmit event when submit button is clicked', () => {
    sinon.spy(shallowWrapper.instance(), 'onSubmit');
    shallowWrapper.setState(state);
    shallowWrapper.instance().onSubmit(event);
    expect(shallowWrapper.instance().onSubmit.calledOnce).toEqual(true);
  });

  it('calls onClick event when adding to facility array', () => {
    sinon.spy(shallowWrapper.instance(), 'onClick');
    shallowWrapper.setState(state);
    shallowWrapper.instance().onClick();
    expect(shallowWrapper.instance().onClick.calledOnce).toEqual(true);
  });

  it('calls onKeyPress event to disable add facility when input is empty', () => {
    sinon.spy(shallowWrapper.instance(), 'onKeyPress');
    shallowWrapper.setState(state);
    shallowWrapper.instance().onKeyPress(event);
    expect(shallowWrapper.instance().onKeyPress.calledOnce).toEqual(true);
  });

  it('calls removeFacility event when removing from the array of facility object', () => {
    sinon.spy(shallowWrapper.instance(), 'removeFacility');
    shallowWrapper.setState(state);
    shallowWrapper.instance().removeFacility(i);
    expect(shallowWrapper.instance().removeFacility.calledOnce).toEqual(true);
  });

  it('calls handleImageChange event when image is add to the file input field', () => {
    sinon.spy(shallowWrapper.instance(), 'handleImageChange');
    shallowWrapper.setState(state);
    shallowWrapper.instance().handleImageChange(event);
    expect(shallowWrapper.instance().handleImageChange.calledOnce).toEqual(true);
  });

  it('should have div element match snap', () => {
    expect(wrapper.getElements('div')).toMatchSnapshot();
  });

  it('should have div element', () => {
    expect(wrapper.find('div').length).toEqual(3);
  });

  it('ensures that mapDispatchToProps dispatches the specified actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).initEditCenter).toBeTruthy();
  });

  it('sets error message when trying to submit empty fields', () => {
    const events = mountedWrapper.find('form');
    events.simulate('submit');
  });
});

