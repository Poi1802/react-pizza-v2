import { useContext } from 'react';
import { AppContext } from '../../App';
import styles from './InputBlock.module.scss';

export const Input = () => {
  const { searchValue, setSearchValue } = useContext(AppContext);

  return (
    <div className={styles.root}>
      <img className={styles.search} src='search-input.svg' alt='' />
      <input
        className={styles.input}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type='text'
        placeholder='Поиск...'
      />
      {searchValue && (
        <img className={styles.clear} onClick={() => setSearchValue('')} src='clear-input.svg' alt='' />
      )}
    </div>
  );
};
