import React from 'react';
import InputBox from './InputBox';

const AutoFillInputBox = ({ suggestions = [], ...props }) => {
  // Simple fallback: render InputBox and show a datalist if suggestions provided
  const listId = `af-${Math.random().toString(36).slice(2, 9)}`;
  return (
    <div>
      <InputBox {...props} list={listId} />
      {suggestions.length > 0 && (
        <datalist id={listId}>
          {suggestions.map((s, i) => (
            <option value={s} key={i} />
          ))}
        </datalist>
      )}
    </div>
  );
};

export default AutoFillInputBox;