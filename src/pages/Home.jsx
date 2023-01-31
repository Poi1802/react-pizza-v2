import { useEffect, useState } from 'react';
import axios from 'axios';

import { PizzaBlock } from '../components/PizzaBlock';
import { Sort } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Categories } from '../components/Categories';
import { Paginate } from '../components/Paginate';

export const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeList, setActiveList] = useState({
    name: 'сначала популярные',
    sortProp: 'rating',
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const filterByCat = activeCategory > 0 ? `category=${activeCategory}` : '';
    const sortByCat = `_sort=${activeList.sortProp.replace('!', '')}&_order=${
      activeList.sortProp.includes('!') ? 'asc' : 'desc'
    }`;
    const pages = `_page=${page}&_limit=4`;

    axios(`https://react-pizza-server.onrender.com/pizzas/?${pages}&${filterByCat}&${sortByCat}`).then(
      ({ data }) => {
        setPizzas(data);
        setIsLoading(false);
      }
    );

    window.scrollTo(0, 0);
  }, [activeCategory, activeList, page]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <Sort activeList={activeList} setActiveList={setActiveList} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {(isLoading ? [...new Array(4)] : pizzas).map((obj, index) =>
          isLoading ? <Skeleton key={index} /> : <PizzaBlock key={`${obj.id}_${obj.name}`} {...obj} />
        )}
      </div>
      <Paginate page={page} setPage={setPage} />
    </div>
  );
};
