import { useState } from 'react';

const lists = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories = () => {
  const [isActive, setIsActive] = useState(0);

  const onClickCat = (index) => {
    if (isActive !== index) {
      setIsActive(index);
    }
  };

  return (
    <div className='categories'>
      <ul>
        {lists.map((text, index) => (
          <li
            className={isActive === index ? 'active' : ''}
            key={index}
            onClick={() => onClickCat(index)}>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
};
