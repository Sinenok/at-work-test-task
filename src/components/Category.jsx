import React, { useState } from "react";
const Category = () => {
  const [activeItem, setActiveItem] = useState(null);
  const items = [
    "Данные профиля",
    "Рабочее пространство",
    "Приватность",
    "Безопасность",
  ];

  return (
    <>
      {items.map((item) => (
        <div
          key={item}
          className={`data-about__item ${
            item === activeItem ? "active-data" : ""
          }`}
          onClick={() => setActiveItem(item)}
        >
          {item}
        </div>
      ))}
    </>
  );
};

export default Category;
