import React from 'react';

import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock = () => {
  return (
    <div className='container'>
      <div className={styles.root}>
        <h1>
          <span>😕</span>
          <br />
          Страница не найдена
        </h1>
        <p>К сожалению данная страница отсутствует в нашем магазине</p>
      </div>
    </div>
  );
};
