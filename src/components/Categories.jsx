import { useState, useEffect } from 'react';

const lists = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories = ({ activeCategory, setActiveCategory }) => {
  const onClickCat = (index) => {
    if (activeCategory !== index) {
      setActiveCategory(index);
    }
  };

  return (
    <div className='categories'>
      <ul>
        {lists.map((text, index) => (
          <li
            className={activeCategory === index ? 'active' : ''}
            key={index}
            onClick={() => onClickCat(index)}>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
};
