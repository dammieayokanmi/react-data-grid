import React from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import Sortable from "./Sortable";
const Wrapper = styled.div`
  .top-info {
    display: grid;
    grid-template-columns: max-content 1fr;
    padding: 20px;
    margin-bottom: 40px;
  }
  .flex_gen {
    align-items: flex-start;
    .category {
      color: white;
      background-color: rgb(138, 65, 191);
      width: 90px;
      text-align: center;
      border-radius: 25px;
      font-size: 13px;
      margin-left: 5px;
    }
  }
  .avatar {
    font-size: 20px;
    font-weight: bold;
    width: 55px;
    height: 55px;
    margin-right: 15px;
  }
  .flex_auto {
    margin-top: 25px;
    flex-wrap: wrap;
    display: flex;
    justify-content: space-between;
  }
  .name {
    font-weight: bold;
    line-height: 20px;
    font-size: 20px;
  }
  .bold-m-text {
    font-weight: bold;
    font-size: 15px;
    line-height: 20px;
  }
  .light-m-text {
    line-height: 20px;
    font-weight: light;
    font-size: 15px;
    color: #777777;
  }
`;

function UserDetails({ user }) {
  return (
    <Wrapper>
      <div className="top-info">
        {user.avatarUrl === "" ? (
          <Avatar alt={user.firstName} className="avatar">
            {user.firstName.substring(0, 1)}
            {user.lastName.substring(0, 1)}
          </Avatar>
        ) : (
          <Avatar
            alt={user.firstName}
            className="avatar"
            src={
              user.avatarUrl === ""
                ? "../assets/searchIcon.png"
                : user.avatarUrl
            }
          />
        )}

        <div className="rhs">
          <div className="flex_gen flex">
            <div className="info">
              <p className="name">
                {user.firstName} {user.lastName}
              </p>
              <p className="id ">
                <span className="bold-m-text">Inmate ID:</span>
                {"   "}
                <span className="light-m-text">{user.id}</span>
              </p>
            </div>
            <p className="category">{user.category}</p>
          </div>
          <div className="flex_auto">
            <div className="first">
              <p className="bold-m-text">Facility</p>
              <p className="light-m-text">{user.facility}</p>
            </div>
            <div className="second">
              <p className="bold-m-text">Housing Unit</p>
              <p className="light-m-text">{user.facility}</p>
            </div>
            <div className="third">
              <p className="bold-m-text">STG</p>
              <p className="light-m-text">-</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-info">
        <Sortable products={user.grievances} fname={user.firstName} />
      </div>
    </Wrapper>
  );
}

UserDetails.propTypes = {};

export default UserDetails;
