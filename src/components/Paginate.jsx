import classNames from 'classnames';

export const Paginate = ({ page, setPage }) => {
  const lists = [1, 2, 3];

  return (
    <>
      <ul className='pagination'>
        <li
          className={classNames('previous', { disable: page === 1 })}
          onClick={() => setPage(page - 1)}>
          {'<'}
        </li>
        {lists.map((num, index) => (
          <li
            className={page === index + 1 ? 'selected' : ''}
            key={index}
            onClick={() => setPage(index + 1)}>
            {num}
          </li>
        ))}
        <li className={classNames('next', { disable: page === 3 })} onClick={() => setPage(page + 1)}>
          {'>'}
        </li>
      </ul>
    </>
  );
};
