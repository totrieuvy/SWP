import React from "react";

function ItemPrice({ buy, sell }) {
  return (
    <>
      <section id="boardPrice">
        <p id="b1">{buy}</p>
        <p id="b2">{sell}</p>
      </section>
    </>
  );
}

export default ItemPrice;
