import { useEffect, useState } from 'react';
import axios from 'axios';

import { Categories } from './components/Categories';
import { Header } from './components/Header';
import { PizzaBlock } from './components/PizzaBlock';
import { Sort } from './components/Sort';
import Skeleton from './components/PizzaBlock/Skeleton';
function App() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('https://react-pizza-server.onrender.com/pizzas');
      setPizzas(data);
      setIsLoading(false);
    }

    fetchData();
  }, []);
  console.log(isLoading);

  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <div className='content__top'>
            <Categories />
            <Sort />
          </div>
          <h2 className='content__title'>Все пиццы</h2>
          <div className='content__items'>
            {(isLoading ? [...new Array(10)] : pizzas).map((obj) =>
              isLoading ? <Skeleton /> : <PizzaBlock key={`${obj.id}_${obj.name}`} {...obj} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
