import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    console.log("fired")
    axiosWithAuth().get("/colors")
      .then(res => {
        setColorList(res.data)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <ColorList
        colors={colorList}
        updateColors={setColorList}
        getData={getData}
      />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
