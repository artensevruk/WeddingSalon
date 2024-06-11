import { deleteAttributes , addAttributes } from "../api";

import React, { useState } from 'react';


export const ProductAttributes = ({ productAttrs, productId , displayKey }) => {
  // Attributes = color or size\\
  const [newAttribute, setNewAttribute] = useState('');

  const handleAddAttribute = () => {
    addAttributes(productId, newAttribute , displayKey);
    setNewAttribute(''); // Очистить поле ввода после добавления
  };

  return (
    <div>
      {productAttrs?.map((productAttr) => (
        <div className="color">
          {productAttr[displayKey]}
          <i
            onClick={() => {
              deleteAttributes(productAttr.id , displayKey);
            }}
            class="fa-solid fa-xmark"
          ></i>
        </div>
      ))}
      <div>
     
          <input value={newAttribute} onChange={(e) => setNewAttribute(e.target.value)} />
          <button onClick={handleAddAttribute} type="submit">Добавить</button>
      
      </div>
    </div>
  );
};
