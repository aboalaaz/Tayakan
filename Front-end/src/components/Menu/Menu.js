import React from 'react';
import axios from 'axios';
import { useSelector, useStore } from 'react-redux';

function Menu() {
  const user = useSelector((state) => state.user);
  const [source, setSource] = React.useState(null);
  React.useEffect(() => {});
  return <img src={source} />;
}

export default Menu;
