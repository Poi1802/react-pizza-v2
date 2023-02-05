import { useCallback, useEffect, useRef } from 'react';
import qs from 'qs';

import { PizzaBlock } from '../components/PizzaBlock';
import { Sort, sortList } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Categories } from '../components/Categories';
import { Paginate } from '../components/Paginate';

import { useSelector } from 'react-redux';
import {
  FilterState,
  selectFilter,
  setActiveCategory,
  setFilters,
} from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';
import { fetchPizza, selectPizzaFetch } from '../redux/slices/fetchSlice';
import { useAppDispatch } from '../redux/store';

export const Home = () => {
  const isMount = useRef(false);
  const isSearch = useRef(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { activeCategory, activeList, page, searchValue } = useSelector(selectFilter);

  const { pizzas, status } = useSelector(selectPizzaFetch);

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setActiveCategory(id));
  }, []);

  const fetchData = async () => {
    const pages = `_page=${page}&_limit=4`;
    const filterByCat = activeCategory > 0 ? `&category=${activeCategory}` : '';
    const sortByCat = `&_sort=${activeList.sortProp.replace('!', '')}&_order=${
      activeList.sortProp.includes('!') ? 'asc' : 'desc'
    }`;
    const search = `&name_like=${searchValue}`;

    dispatch(fetchPizza({ pages, filterByCat, sortByCat, search }));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const activeList = sortList.find((obj) => params.sort && obj.sortProp === params.sort);

      dispatch(
        setFilters({
          ...params,
          activeList,
        } as FilterState)
      );

      isSearch.current = true;
    }
  }, []);

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

  useEffect(() => {
    if (!isSearch.current) {
      fetchData();
    }
    isSearch.current = false;

    window.scroll(0, 0);
  }, [activeCategory, activeList, page, searchValue]);

  const pizzaItems = pizzas.map((obj: any) => (
    <PizzaBlock key={`${obj.id}_${obj.name}`} {...obj} />
  ));
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories activeCategory={activeCategory} setActiveCategory={onChangeCategory} />
        <Sort activeList={activeList} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div className='content__error-pizza'>
          <div>
            <h2>
              Ошибка запроса к серверу
              <span>😕</span>
            </h2>
            <p>К сожалению, не удалось получить пиццы. Повторите попытку чуть позже</p>
          </div>
        </div>
      ) : (
        <div className='content__items'>{status === 'loading' ? skeletons : pizzaItems}</div>
      )}
      <Paginate page={page} />
    </div>
  );
};
