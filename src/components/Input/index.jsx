import { useCallback, useContext, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { AppContext } from '../../App';
import styles from './InputBlock.module.scss';

export const Input = () => {
  const [stateValue, setStateValue] = useState('');
  const { setSearchValue } = useContext(AppContext);

  const inputRef = useRef();

  const updateValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 350),
    []
  );

  const onClickClear = () => {
    setSearchValue('');
    setStateValue('');
    inputRef.current.focus();
  };
  const onChangeInput = (e) => {
    updateValue(e.target.value);
    setStateValue(e.target.value);
  };

  return (
    <div className={styles.root}>
      <img className={styles.search} src='search-input.svg' alt='' />
      <input
        className={styles.input}
        ref={inputRef}
        value={stateValue}
        onChange={onChangeInput}
        type='text'
        placeholder='Поиск...'
      />
      {stateValue && (
        <img className={styles.clear} onClick={onClickClear} src='clear-input.svg' alt='' />
      )}
    </div>
  );
};
