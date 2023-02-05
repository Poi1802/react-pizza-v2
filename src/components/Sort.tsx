import { useState, useEffect, useRef, memo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveList } from '../redux/slices/filterSlice';

export type SortItem = {
  name: string;
  sortProp: 'rating' | 'price' | '!name' | '!rating' | '!price';
};

export const sortList: SortItem[] = [
  { name: 'сначала популярные', sortProp: 'rating' },
  { name: 'сначала не популярные', sortProp: '!rating' },
  { name: 'сначала дорогие', sortProp: 'price' },
  { name: 'сначала дешёвые', sortProp: '!price' },
  { name: 'по алфавиту', sortProp: '!name' },
];

type SortProps = {
  activeList: SortItem;
};

export const Sort: React.FC<SortProps> = memo(({ activeList }) => {
  const [popupIsActive, setPopupIsActive] = useState<boolean>(false);
  // const { activeList } = useSelector(selectFilter);
  const sortRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const sortByCat = (obj: SortItem) => {
    dispatch(setActiveList(obj));
    setPopupIsActive(false);
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.target && !sortRef.current?.contains(e.target as Node)) {
        setPopupIsActive(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <div className='sort'>
      <div className='sort__label' ref={sortRef} onClick={() => setPopupIsActive(!popupIsActive)}>
        <svg
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <b className='cu-p'>Сортировка:</b>
        <span>{activeList.name}</span>
      </div>
      <div className={popupIsActive ? 'sort__popup sort__popup-active' : 'sort__popup'}>
        <ul>
          {sortList.map((obj, index) => (
            <li
              className={activeList.name === obj.name ? 'active' : ''}
              key={index}
              onClick={() => sortByCat(obj)}>
              {obj.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
