import "./Policy.css";
import React from "react";
function Policy() {
  return (
    <div className="Policy">
      <div className="header__policy">
        <img src="./images/Logo.png" />
        <h2 className="header__policy__logo">JEWELRYMS</h2>
      </div>

      <div className="title">
        <h2>STORE POLICY</h2>
      </div>

      <div className="content__policy">
        <div className="content__policy__refund">
          <div className="content__policy__title">
            <h3>A/ Refund Policy:</h3>
          </div>
          <div className="content__policy__nd">
            <h4>
              - Return Period: Items can be returned within 30 days of purchase. The return period begins on the date
              the item was purchased, as shown on your receipt.
            </h4>
          </div>
          <div className="content__policy__nd">
            <h4>
              - Original Receipt: The original receipt must be presented at the time of the buy-back. This helps us
              verify the purchase and calculate the buy-back value.
            </h4>
          </div>
          <div className="content__policy__nd">
            <h4>
              - Condition of Item: Items must be returned in their original condition, unworn and unaltered in any way.
              All original packaging and documentation must be included.
            </h4>
          </div>
          <div className="content__policy__nd">
            <h4>
              - Restocking Fee: A restocking fee of 10% will be deducted from the refund amount. Please note that the
              processing of the refund may take between 7 to 10 business days.
            </h4>
          </div>
          <div className="content__policy__nd">
            <h4>
              - Non-Refundable Items: Items that have been resized, damaged, or otherwise altered after delivery will
              not be accepted for return.
            </h4>
          </div>
        </div>
        <div className="content__policy__purchase">
          <div className="content__policy__title">
            <h3>B/ Purchase Policy:</h3>
          </div>
          <div className="content__policy__nd">
            <h4>
              - Eligibility: We purchase a wide variety of jewelry, including gold as well as pieces with diamonds or
              other precious gemstones.
            </h4>
          </div>
          <div className="content__policy__nd">
            <h4>
              - Appraisal: When you bring in an item for sale, our staff will inspect and appraise the item based on its
              condition, market value, and our current inventory needs. This process ensures that we offer a fair price
              for all items.
            </h4>
          </div>
          <div className="content__policy__nd">
            <h4>
              - Payment: If you choose to accept our offer, we will process the payment immediately including cash and
              bank-transfer payment . Please note that you must present a valid identification for all transactions.
            </h4>
          </div>
          <div className="content__policy__nd">
            <h4>
              - Item Condition: We accept items in any condition, but please note that the condition of the item can
              significantly impact its value.
            </h4>
          </div>
        </div>
        <div className="content__policy__guarantee">
          <div className="content__policy__title">
            <h3>C/ Guarantee Policy:</h3>
          </div>
          <div className="content__policy__nd">
            <h4>
              - Coverage: Our guarantee only covers any defects in material or workmanship for all jewelry purchased
              from our store. If you notice any such defects, we will repair or replace your item free of charge.
            </h4>
            <h4>
              - Duration: The guarantee is valid for two years from the date of purchase. The guarantee period begins on
              the date the item was purchased, as shown on your receipt.
            </h4>
            <h4>
              - Services: Under the guarantee, we also offer free routine services like cleaning, inspections, or stone
              tightening.
            </h4>
            <h4>
              - Exclusions: This guarantee does not cover damage from misuse, alterations not performed by our store, or
              failure to meet any required maintenance or inspection schedules.
            </h4>
            <h4>
              - Claim Process: To make a claim under this guarantee, please bring the item to our store for evaluation.
              Our expert staff will inspect the item and provide further assistance.
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Policy;
