import React from "react";

function ItemName({ type, time, amount, kara }) {
  return (
    <>
      <div id="typeName">
        <section id="goldInfo">
          <p>{type}</p>
          <p>{amount}</p>
          <p>{kara}</p>
        </section>

        <p id="timeInput">{time}</p>
      </div>
    </>
  );
}

export default ItemName;
