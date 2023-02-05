import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock: React.FC = () => (
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
