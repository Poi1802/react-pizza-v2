import { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import qs from 'qs';

import { PizzaBlock } from '../components/PizzaBlock';
import { Sort, sortList } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Categories } from '../components/Categories';
import { Paginate } from '../components/Paginate';
import { AppContext } from '../App';

import { useSelector, useDispatch } from 'react-redux';
import { setActiveCategory, setFilters } from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const { searchValue } = useContext(AppContext);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMount = useRef(false);
  const isSearch = useRef(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { activeCategory, activeList, page } = useSelector((state) => {
    return state.filter;
  });

  const onChangeCategory = (id) => {
    dispatch(setActiveCategory(id));
  };

  const fetchData = () => {
    setIsLoading(true);

    const pages = `_page=${page}&_limit=4`;
    const filterByCat = activeCategory > 0 ? `&category=${activeCategory}` : '';
    const sortByCat = `&_sort=${activeList.sortProp.replace('!', '')}&_order=${
      activeList.sortProp.includes('!') ? 'asc' : 'desc'
    }`;
    const search = `&name_like=${searchValue}`;

    axios
      .get(
        `https://react-pizza-server.onrender.com/pizzas/?${pages}${filterByCat}${sortByCat}${search}`
      )
      .then(({ data }) => {
        setPizzas(data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sortProperties = sortList.find((obj) => obj.sortProp === params.sort);

      dispatch(
        setFilters({
          ...params,
          sortProperties,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      fetchData();
    }
    isSearch.current = false;

    window.scrollTo(0, 0);
  }, [activeCategory, activeList, page, searchValue]);
  useEffect(() => {
    if (isMount.current) {
      const queryString = qs.stringify({
        sort: activeList.sortProp,
        activeCategory,
        page,
      });

      navigate(`?${queryString}`);
    }

    isMount.current = true;
  }, [activeCategory, activeList, page, searchValue]);

  const pizzaItems = pizzas.map((obj) => <PizzaBlock key={`${obj.id}_${obj.name}`} {...obj} />);
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories activeCategory={activeCategory} setActiveCategory={onChangeCategory} />
        <Sort activeList={activeList} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? skeletons : pizzaItems}</div>
      <Paginate page={page} />
    </div>
  );
};
