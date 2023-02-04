import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export const PizzaInfo = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(`https://react-pizza-server.onrender.com/pizzas/${id}`);
        setPizza(data);
      } catch (error) {
        alert('Error PizzaInfo');
      }
    };

    fetchPizza();
  }, []);

  return !pizza ? (
    'Загрузка...'
  ) : (
    <div className='container'>
      <img width={350} src={pizza.imageUrl} alt='' />
      <h2>{pizza.name}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, accusamus molestiae fugiat
        cupiditate inventore qui suscipit praesentium pariatur debitis labore, amet sunt a, non
        dolorum aut perferendis nulla saepe nisi. Repudiandae nam inventore tempore sint, vel,
        provident facere aliquid.
      </p>
      <h4>{pizza.price} Р</h4>
      <div className='cart__bottom-buttons'>
        <Link className='button button--outline button--add go-back-btn' to='/'>
          <svg
            width='8'
            height='14'
            viewBox='0 0 8 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M7 13L1 6.93015L6.86175 1'
              stroke='#D3D3D3'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'></path>
          </svg>
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  );
};
