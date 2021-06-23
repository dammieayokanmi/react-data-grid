import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import useTable from "./useTable";
import clients from "../assets/clients";
import searchIcon from "../assets/searchIcon.png";
import Avatar from "@material-ui/core/Avatar";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Dropdowns from "./Dropdowns";
import Chip from "@material-ui/core/Chip";

const Wrapper = styled.div`
  border-right: 1px solid rgba(224, 224, 224, 1);

  .bold-m-text {
    font-weight: bold;
    font-size: 15px;
  }

  .avatar {
    margin-right: 7px;
    font-size: 12px;
    font-weight: bold;
    .dp {
      width: 35px;
      height: 35px;
    }
  }
  .name {
    white-space: nowrap;
  }
  .MuiTableSortLabel-root:hover .MuiTableSortLabel-icon,
  .MuiTableSortLabel-root.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active
    .MuiTableSortLabel-icon {
    opacity: 0 !important;
  }
  .sort {
    height: 12px;
    opacity: 0.4;
    margin-left: 5px;
  }

  .id {
    white-space: nowrap;
    font-size: 12px;
    color: rgb(136, 136, 136);
  }
  .showing {
    font-size: 13px;
    color: rgb(136, 136, 136);
  }
  .active_item {
    background-color: #e4e4e4;
    border-left: 6px solid green;
  }
  .MuiTableCell-head {
    color: rgba(0, 0, 0, 0.87);
    font-weight: bold;
    line-height: 1.5rem;
    font-size: 12px;
    padding: 11px;
  }
  tbody .MuiTableRow-root {
    cursor: pointer;
    &:hover {
      background-color: rgba(240, 244, 247, 0.6);
      transition: 0.3s;
    }
  }
  .link-to {
    display: contents;
  }

  .MuiTable-root {
    position: relative;
  }
  .MuiTableHead-root {
    background-color: rgba(240, 244, 247, 0.6);
    box-shadow: 0 4px 2px -2px gray;
  }
  .MuiTableCell-root {
    padding: 11px;
  }

  .action {
    display: grid;
    grid-template-columns: max-content 1fr max-content;
    padding: 11px;
    @media screen and (max-width: 425px) {
      display: block;
    }
    input {
      margin: 0 10px 0 20px;
      border: 1px solid rgba(224, 224, 224, 1);
      margin: 0 10px 0 20px;
      border-radius: 8px;
      outline: none;
      padding: 0 12px;
      @media screen and (max-width: 425px) {
        height: 32px;
        margin-left: 0;
      }
      &::placeholder {
        color: rgb(136, 136, 136);
      }
    }
    .search-btn {
      border-radius: 5px;
      border: none;
      outline: none;
      padding: 7px 10px;
      color: #777777;
      @media screen and (max-width: 425px) {
        margin-top: 10px;
      }
      img {
        margin-right: 10px;
        height: 22px;
      }
    }
  }
  .pagination {
    margin: 20px 0;
    padding: 0 11px;
    justify-content: space-between;
    .MuiTablePagination-caption {
      font-size: 13px;
      color: rgb(136, 136, 136);
    }
  }
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div p={3}>
          <Typography>{children}</Typography>
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
const headCells = [
  { id: "firstName", label: "User" },
  { id: "category", label: "Category" },
  { id: "numberOfContact", label: "Contacts" },
];

export default function FilterDataGrid() {
  const [value, setValue] = React.useState(0);
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const [records] = useState(clients);
  const [activeLink, setActiveLink] = useState();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter(
            (x) =>
              x.category.toLowerCase().includes(target.value) ||
              x.firstName.toLowerCase().includes(target.value) ||
              x.lastName.toLowerCase().includes(target.value) ||
              x.id.toString().toLowerCase().includes(target.value) ||
              x.numberOfContact.toString().toLowerCase().includes(target.value)
          );
      },
    });
  };
  const handleClick = (id) => {
    setActiveLink(id);
  };

  // FIlter numberOfContact

  const filterBy = ["numberOfContact"]; // Read from API

  let id = 0;
  const unique = (prop) => {
    const res = [];
    recordsAfterPagingAndSorting().forEach((v) => {
      if (res.findIndex((i) => i[prop] === v[prop]) === -1)
        res.push({ id: id++, checked: false, [prop]: v[prop] });
      // console.log( v[prop] )
    });
    return res;
  };

  let init = {};
  let initGroups = {};
  filterBy.forEach((item) => {
    init[item] = [];
    initGroups[item] = unique(item);
  });
  const [filterGroups, setFilterGroups] = useState(initGroups);

  const [filters, setFilters] = useState(init);

  const filterData = () => {
    let result = recordsAfterPagingAndSorting();
    Object.keys(filters).forEach((key) => {
      if (filters[key].length !== 0)
        result = result.filter(
          (item) => filters[key].indexOf(item[key].toString()) !== -1
        );
    });
    return result;
  };

  const handleChange = (e) => {
    let id = e.target.id;
    let name = e.target.name;
    let filter = e.target.getAttribute("filter");
    let checked = e.target.checked;
    if (checked) {
      let newFilter = [...filters[filter]];
      newFilter.push(name);
      setFilters({ ...filters, [filter]: newFilter });
    } else {
      setFilters({
        ...filters,
        [filter]: filters[filter].filter((item) => item !== name),
      });
    }
    const tmp = filterGroups[filter];
    const arrayCount = tmp.map((count)=>{return count.numberOfContact})

  
    let updateGroup = [...tmp];
    const index = updateGroup.findIndex((i) => i.id.toString() === id);
    updateGroup[index].checked = checked;
    setFilterGroups({
      ...filterGroups,
      [filter]: updateGroup,
    });
  };
  // console.log(arrayCount)


  const clearAll = () => {
    let tmp = { ...filterGroups };
    Object.keys(tmp).forEach((item) => {
      tmp[item].forEach((subItem) => {
        subItem.checked = false;
      });
    });
    setFilterGroups(tmp);
    setFilters(init);
  };

  const [chipData, setChipData] = React.useState([
    { key: 1 },
    { key: 2 },
    { key: 3 },
    { key: 4 },
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  return (
    <Wrapper>
      <div>
        <div className="action">
          <Dropdown
            lengthy={records.length}
            btn="Filters"
            tab={
              <div className="child">
                {" "}
                <Tabs
                  value={value}
                  onChange={handleChangeTab}
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab label="All" />
                  <Tab
                    label={
                      <>
                        <span>Applied</span> <span className="badge"> 4</span>
                      </>
                    }
                  />
                </Tabs>
                <TabPanel value={value} index={0}>
                  <Dropdowns
                    children={
                      <div className="dropdown-item">
                        {filterBy.map((item) => (
                          <div className="container-fluid">
                            {filterGroups[item] &&
                              filterGroups[item].map((li) => (
                                <div
                                  key={li.id}
                                  className="custom-control custom-checkbox"
                                >
                                  <div className="flex flex-input">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id={li.id}
                                      filter={item}
                                      name={li[item]}
                                      checked={li.checked}
                                      onChange={handleChange}
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor={li.id}
                                    >
                                      {li[item]}
                                    </label>
                                  </div>
                                </div>
                              ))}
                          </div>
                        ))}
                      </div>
                    }
                    trigger="Number of contacts"
                  />
                  <Dropdowns
                    children={<div className="dropdown-item"> hi</div>}
                    trigger="Video calls"
                  />
                  <Dropdowns
                    children={<div className="dropdown-item"> hi</div>}
                    trigger="Music use"
                  />
                  <Dropdowns
                    children={<div className="dropdown-item"> hi</div>}
                    trigger="Purchases"
                  />
                  <Dropdowns
                    children={<div className="dropdown-item"> hi</div>}
                    trigger="Photos"
                  />
                  <Dropdowns
                    children={<div className="dropdown-item"> hi</div>}
                    trigger="Transfer"
                  />
                  <Dropdowns
                    children={<div className="dropdown-item"> hi</div>}
                    trigger="STG status"
                  />
                  <Dropdowns
                    children={<div className="dropdown-item"> hi</div>}
                    trigger="Prison Facility"
                  />
                  <Dropdowns
                    children={<div className="dropdown-item"> hi</div>}
                    trigger="Number of earnings"
                  />
                  <Dropdowns
                    children={<div className="dropdown-item"> hi</div>}
                    trigger="Block history"
                  />
                  <Dropdowns
                    children={<div className="dropdown-item"> hi</div>}
                    trigger="Age"
                  />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <div className="tab2">
                    <button className="clear" onClick={clearAll}>
                      Clear All
                    </button>
                    <p className="what">Number of Contacts</p>
                    <div className="chips">
                      {" "}
                      {chipData.map((data) => {
                        return (
                          <li key={data.key}>
                            <Chip
                              label={data.key}
                              onDelete={handleDelete(data)}
                            />
                          </li>
                        );
                      })}
                    </div>
                  </div>
                </TabPanel>
              </div>
            }
          />
          <input onChange={handleSearch} placeholder="Type here" />

          <button className="search-btn">
            <img src={searchIcon} alt="searchIcon" />
            <span>Search</span>
          </button>
        </div>
        <TblContainer>
          <TblHead />
          <TableBody>
            {filterData().map((item) => (
              <Link className="link-to" to={`/user/${item.id}`} key={item.id}>
                <TableRow
                  onClick={() => handleClick(item.id)}
                  className={
                    item.className +
                    (item.id === activeLink ? " active_item" : "")
                  }
                >
                  <TableCell>
                    <div className="flex flexy-c1 ">
                      <div className="avatar">
                        {item.avatarUrl === "" ? (
                          <Avatar alt={item.firstName} className="avatar">
                            {item.firstName.substring(0, 1)}
                            {item.lastName.substring(0, 1)}
                          </Avatar>
                        ) : (
                          <Avatar
                            alt={item.firstName}
                            className="avatar"
                            src={
                              item.avatarUrl === ""
                                ? "../assets/searchIcon.png"
                                : item.avatarUrl
                            }
                          />
                        )}
                      </div>
                      <div className="info">
                        <p className="name bold-m-text">
                          {item.firstName} {item.lastName}
                        </p>
                        <p className="id">ID: {item.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="bold-m-text">{item.category}</TableCell>
                  <TableCell className="bold-m-text">
                    {item.numberOfContact}
                  </TableCell>
                </TableRow>
              </Link>
            ))}
          </TableBody>
        </TblContainer>
        <div className="pagination flex">
          {/* <p className="showing">Showing of {records.length} items</p> */}
          <TblPagination />
        </div>
      </div>
    </Wrapper>
  );
}
