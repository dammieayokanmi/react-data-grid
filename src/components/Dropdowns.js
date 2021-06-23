import React, { useState } from "react";
// import PropTypes from "prop-types";
import arrow from "../assets/next.svg";

import styled from "styled-components";
const Wrapper = styled.div`
  .icon {
    height: 25px;
  }
  label {
    font-size: 13px;
    margin-left: 8px;
    font-weight: 600;
  }
`;

const data = [
  { id: 0, label: "Istanbul, TR (AHL)" },
];

const Dropdowns = ({ trigger, children }) => {
  const [isOpen, setOpen] = useState(false);
  const [items,] = useState(data);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (id) => {
    selectedItem === id ? setSelectedItem(null) : setSelectedItem(id);
  };

  return (
    <Wrapper className="dropdown">
      <div
        onClick={toggleDropdown}
        className={`dropdown-header ${isOpen && "open"}`}
      >
        {trigger}
        <img className={`icon ${isOpen && "open"}`} src={arrow} alt="" />
      </div>
      <div className={`dropdown-body ${isOpen && "open"}`}>
        {items.map((item) => (
          <div
            className="dropdown-item"
            onClick={(e) => handleItemClick(e.target.id)}
            id={item.id}
          >
            {children}
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default Dropdowns;
