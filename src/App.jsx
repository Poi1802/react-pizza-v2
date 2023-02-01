import { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { NotFound } from './pages/NotFound';

import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './redux/slices/counterSlice';

export const AppContext = createContext({});

function App() {
  const [searchValue, setSearchValue] = useState('');

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  console.log(count);

  return (
    <AppContext.Provider value={{ searchValue, setSearchValue }}>
      <div className='wrapper'>
        <div>
          <div>
            <button
              className='d-block'
              aria-label='Increment value'
              onClick={() => dispatch(increment())}>
              Increment
            </button>
            <span className='d-block'>{count}</span>
            <button
              className='d-block'
              aria-label='Decrement value'
              onClick={() => dispatch(decrement())}>
              Decrement
            </button>
          </div>
        </div>
        <Header />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
