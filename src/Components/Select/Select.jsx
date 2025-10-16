import { useState, useRef, useEffect } from "react";
import "./Select.css";

const CustomSelect = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-select" ref={ref}>
      <button
        type="button"
        className="custom-select-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value}
        <span className="arrow">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <ul className="custom-select-options">
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => handleSelect(opt)}
              className={opt === value ? "selected" : ""}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
