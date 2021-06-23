import React, { useState } from "react";
import arrow from "../assets/next.svg";
import Menu from "@material-ui/core/Menu";
import styled from "styled-components";
const Wrapper = styled.div`
  .filter-btn {
    cursor: pointer;
    position: relative;
    border-radius: 5px;
    border: none;
    outline: none;
    padding: 7px 10px;
    color: #777777;
  }

  .flexy-btn {
    cursor: pointer;
    position: relative;
    border-radius: 5px;
    outline: none;
    padding: 7px 10px;
    color: #777777;
    background-color: #fff;
    border: 1px solid rgba(224, 224, 224, 1);

    .icon {
      font-size: 13px;
      color: #91a5be;
      transform: rotate(0deg);
      margin-left: 15px;
      transition: all 0.2s ease-in-out;
      height: 20px;
    }

    .icon.open {
      transform: rotate(90deg);
    }
  }
  .MuiMenu-list {
    outline: 0;
  }

`;
export default function Dropdown({ lengthy, btn,tab }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOpen, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(!isOpen);
  };


  return (
    <Wrapper>
      <button
        className="flexy-btn"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <span className="filter-btn">Filter</span>
        <img src={arrow} alt="arrow" className={`icon ${isOpen && "open"}`} />
      </button>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        
        >
          <div
            className="header flex"
            style={{ padding: " 0 10px", justifyContent: "space-between" }}
          >
            <h1
              style={{
                fontWeight: "bold",
                lineHeight: "20px",
                fontSize: "20px",
              }}
            >
              {btn}
            </h1>
            <p
              className="users"
              style={{
                color: "rgb(136, 136, 136)",
                fontSize: "14px",
              }}
            >
              Users shown: {lengthy}
            </p>
          </div>
         {tab}
        </Menu>
    </Wrapper>
  );
}
