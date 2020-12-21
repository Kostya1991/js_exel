import { createStore } from './createStore';

const initialState = {
  count: 0
};

const reducer = (state = initialState, action) => {
  if (action.type === 'ADD') {
    return {...initialState, count: state.count + 1};
  }

  return state;
};

describe('createStore', () => {
  let store;
  let handler;

  beforeEach(() => {
    store = createStore(reducer, initialState);
    handler = jest.fn();
  });

test('проверяем создание стора', () => {
    expect(store).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.getState).toBeDefined();
  });

  test('проверяем, что возвращаемое значение объект', () => {
    expect(store.getState()).toBeInstanceOf(Object);
  });

  test('проверяем что дефолтный стейт возвращается корректно', () => {
    expect(store.getState()).toEqual(initialState);
  });

  test('проверяем, что состояние изменяется', () => {
    store.dispatch({type: 'ADD'});

    expect(store.getState().count).toBe(1);
  });

  test('проверяем, что состояние не изменяется при несуществуещем экшене', () => {
    store.dispatch({type: 'NOT_ACTION'});

    expect(store.getState().count).toBe(0);
  });

  test('проверяем, что subscrie вызывается', () => {
    store.subscribe(handler);
    store.dispatch({type: 'ADD'});

    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(store.getState());
  });

  test('проверяем, отписку', () => {
    const unsub = store.subscribe(handler);

    unsub.unsubscribe();
    store.dispatch({type: 'ADD'});

    expect(handler).not.toHaveBeenCalled();
  });

  test('проверяем работу диспатча асинхронно', () => {
    return new Promise(resolve => {
      setTimeout(() => {
        store.dispatch({type: 'ADD'});
      }, 500);

      setTimeout(() => {
        expect(store.getState().count).toBe(1);
        resolve();
      }, 1000);
    });
  });
});