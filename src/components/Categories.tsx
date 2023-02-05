import { memo } from 'react';

const lists = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

type CategoriesProps = {
  activeCategory: number;
  setActiveCategory: (id: number) => void;
};

export const Categories: React.FC<CategoriesProps> = memo(
  ({ activeCategory, setActiveCategory }) => {
    const onClickCat = (index: number) => {
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
  }
);
