import { Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { NotFound } from './pages/NotFound';
import { PizzaInfo } from './pages/PizzaInfo';
import { ParentLayout } from './layouts/ParentLayout';

function App() {
  return (
    <Routes>
      <Route path='/' element={<ParentLayout />}>
        <Route path='' element={<Home />} />
        <Route path='cart' element={<Cart />} />
        <Route path='pizza/:id' element={<PizzaInfo />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
