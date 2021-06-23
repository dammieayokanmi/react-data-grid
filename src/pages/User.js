import React from "react";
import styled from "styled-components";
import FilterDataGrid from "../components/FilterDataGrid";
import UserDetails from "../components/UserDetails";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

function Home({ user }) {
  return (
    <Wrapper>
      <FilterDataGrid />
      <UserDetails user={user} />
    </Wrapper>
  );
}

Home.propTypes = {};

export default Home;
