import React, { useState, useRef } from 'react';
import './main.css';


const MultiSelectComboBox = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const optionsRef = useRef(null);
  const inputRef = useRef(null);

  const toggleOptionsVisibility = () => {
    setIsOptionsVisible((prev) => !prev);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedOptions((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((option) => option !== value);
      }
    });
  };

  const closeOptions = (e) => {
    if (optionsRef.current && !optionsRef.current.contains(e.target)) {
      setIsOptionsVisible(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', closeOptions);

    return () => {
      document.removeEventListener('click', closeOptions);
    };
  }, []);

  React.useEffect(() => {
    inputRef.current.value = selectedOptions.join(', ');
  }, [selectedOptions]);

  return (
    <div className="container">
      <p style={{ margin: '5px' }}>Custom multi-select combobox</p>
      <div className="custom-combobox-container">
        <div className="custom-combobox" onClick={toggleOptionsVisibility}>
          <input type="text" ref={inputRef} readOnly />
          <img src="./arrow.png" alt="arrow" />
        </div>
        {isOptionsVisible && (
          <div className="options-container" ref={optionsRef}>
            <label>
              <input
                type="checkbox"
                value="one"
                checked={selectedOptions.includes('one')}
                onChange={handleCheckboxChange}
              />
              one
            </label>
            <label>
              <input
                type="checkbox"
                value="two"
                checked={selectedOptions.includes('two')}
                onChange={handleCheckboxChange}
              />
              two
            </label>
            <label>
              <input
                type="checkbox"
                value="three"
                checked={selectedOptions.includes('three')}
                onChange={handleCheckboxChange}
              />
              three
            </label>
            <label>
              <input
                type="checkbox"
                value="four"
                checked={selectedOptions.includes('four')}
                onChange={handleCheckboxChange}
              />
              four
            </label>
            <label>
              <input
                type="checkbox"
                value="five"
                checked={selectedOptions.includes('five')}
                onChange={handleCheckboxChange}
              />
              five
            </label>
            <label>
              <input
                type="checkbox"
                value="six"
                checked={selectedOptions.includes('six')}
                onChange={handleCheckboxChange}
              />
              six
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelectComboBox;
