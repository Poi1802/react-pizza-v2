import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/slices/filterSlice';

export const Paginate = ({ page }) => {
  const lists = [1, 2, 3];
  const dispatch = useDispatch();

  return (
    <>
      <ul className='pagination'>
        <li
          className={classNames('previous', { disable: page === 1 })}
          onClick={() => dispatch(setPage(page - 1))}>
          {'<'}
        </li>
        {lists.map((num, index) => (
          <li
            className={page === index + 1 ? 'selected' : ''}
            key={index}
            onClick={() => dispatch(setPage(index + 1))}>
            {num}
          </li>
        ))}
        <li
          className={classNames('next', { disable: page === 3 })}
          onClick={() => dispatch(setPage(page + 1))}>
          {'>'}
        </li>
      </ul>
    </>
  );
};
