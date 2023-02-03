import { useCallback, useContext, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import styles from './InputBlock.module.scss';

import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

export const Input = () => {
  const [stateValue, setStateValue] = useState('');
  const dispatch = useDispatch();

  const inputRef = useRef();

  const updateValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 350),
    []
  );

  const onClickClear = () => {
    dispatch(setSearchValue(''));
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
