import React from "react";
// import './styles.css';
import styled from "styled-components";
import sort from "../assets/sort.png";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
  }
  .badge {
    font-size: 10px;
    line-height: 10px;
    background-color: rgba(240, 244, 247, 0.6);
    padding: 5px 13px;
    border-radius: 9px;
  }

  thead {
    background-color: rgba(240, 244, 247, 0.6);
    box-shadow: 0 4px 2px -2px gray;
  }
  .sort {
    height: 12px;
    opacity: 0.4;
    margin-left: 5px;
  }
  th {
    padding: 11px;
    text-align: left;
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.87);
      font-weight: bold;
      line-height: 1.5rem;
      font-size: 12px;
      border: none;
      background-color: rgba(0, 0, 0, 0);
      cursor: pointer;
      padding: 0;
      &:hover {
        transition: 0.3s;
        opacity: 0.8;
      }
    }
  }
  tr {
    border-bottom: 1px solid rgba(224, 224, 224, 1);

    td {
      color: rgb(136, 136, 136);
      font-size: 14px;
      padding: 15px 11px;
    }
  }
  tr td:first-child {
    color: green;
  }
  tr td:last-child {
    font-size: 13px;
    text-align: left;
  }
  .open {
    color: #232323;
    border-radius: 24px;
    border: 1px solid rgb(188, 131, 228);
    background-color: lightsteelblue;
    padding: 3px 10px;
  }
  .appeal {
    border-radius: 24px;
    color: orange;
    border: 1px solid orange;
    padding: 3px 10px;
    background-color: bisque;
  }
  .resolved {
    border-radius: 24px;
    color: green;
    border: 1px solid green;
    padding: 3px 10px;
    background-color: lemon;
  }
  .closed {
    border-radius: 24px;
    color: #000;
    border: 1px solid #000;
    padding: 3px 10px;
    background-color: #fff;
  }
  .btn-primary {
    color: rgb(136, 136, 136);
    font-size: 14px;
    padding-left: 11px;
    cursor: pointer;
    margin-top: 20px;
    &:hover {
      transition: 0.3s;
      text-decoration: underline;
    }
  }
  .PrivateTabIndicator-colorSecondary-3 {
    background-color: green;
  }
  .MuiTab-wrapper {
    font-size: 16px;
    text-transform: capitalize;
    font-weight: bold;
    flex-direction: row;
    justify-content: space-around;
    &:hover {
      color: rgb(136, 136, 136);
      transition: 0.3s;
    }
  }
  .MuiTab-root {
    padding: 0;
    min-width: 139px;
  }
  .scrolly{
	overflow-y: scroll;
    height: 62vh;
	margin-right: 5px;
  table{
    th{
      white-space: nowrap;
    }
  }

}
.scrolly::-webkit-scrollbar {
	width: 1px;
  }
  .scrolly::-webkit-scrollbar-track {
	margin-top: 50px;
	margin-bottom: 190px;
	box-shadow: inset 0 0 6px #fff;
  }
  
  .scrolly::-webkit-scrollbar-thumb {
	background: brown;
	border-radius: 24px;
	outline: 1px solid brown;
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
const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const Sortable = (props) => {
  const [itemsToShow, setItemsToShow] = React.useState(9);
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { items, requestSort, sortConfig } = useSortableData(props.products);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const showMore = () => {
    itemsToShow === 9
      ? setItemsToShow(items.length) || setExpanded(true)
      : setItemsToShow(9) || setExpanded(false);
  };
  return (
    <Wrapper>
      <Tabs
        value={value}
        onChange={handleChange}
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab
          label={
            <>
              <span>Grievances</span>
			  {items.length>9?  <span className="badge"> +
                {items.length > itemsToShow ? items.length - itemsToShow : ""}
              </span>:''}
            </>
          }
        />
        <Tab label="Chats" />
        <Tab label="Videos Calls" />
        <Tab label="Purchases" />
      </Tabs>
      <TabPanel value={value} index={0}>
      <div className="scrolly">
	  <table>
          <thead>
            <tr>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("grievanceId")}
                  className={getClassNamesFor("grievanceId")}
                >
                  Ticket No
                  <img src={sort} alt="sort" className="sort" />
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("department")}
                  className={getClassNamesFor("department")}
                >
                  Department
                  <img src={sort} alt="sort" className="sort" />
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("timeRemaining")}
                  className={getClassNamesFor("timeRemaining")}
                >
                  Time Remaining
                  <img src={sort} alt="sort" className="sort" />
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("date")}
                  className={getClassNamesFor("date")}
                >
                  Date
                  <img src={sort} alt="sort" className="sort" />
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("status")}
                  className={getClassNamesFor("status")}
                >
                  Status
                  <img src={sort} alt="sort" className="sort" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.slice(0, itemsToShow).map((item, i) => (
              <tr key={item.grievanceId}>
                <td>{item.grievanceId}</td>
                <td>{item.department}</td>
                <td>{item.timeRemaining}</td>
                <td>{item.date}</td>
                <td>
                  <span
                    className={
                      item.status === "Open"
                        ? "open"
                        : item.status === "Resolved"
                        ? "resolved"
                        : item.status === "Closed"
                        ? "closed"
                        : item.status === "Appeal"
                        ? "appeal"
                        : ""
                    }
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       
	  </div>
		{items.length>9?<div className="btn btn-primary" onClick={showMore}>
          {itemsToShow&&expanded ? (
            <span>Reduce </span>
          ) : (
            <span>Open all {props.fname}'s grievance</span>
          )}
        </div> : ""}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Chats
      </TabPanel>
      <TabPanel value={value} index={2}>
        "Videos Calls
      </TabPanel>
      <TabPanel value={value} index={3}>
        Purchases
      </TabPanel>
    </Wrapper>
  );
};

export default Sortable;
