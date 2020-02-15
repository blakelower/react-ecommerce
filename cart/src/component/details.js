import React, { Component } from "react";
import { ProductConsumer } from "./context";
import { Link } from "react-router-dom";
import { detailProduct } from "../data";
import styled from "styled-components";

export default class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const {
            id,
            img,
            info,
            price,
            name,
            inCart,
            description
          } = value.detailProduct;
          return (
            <div className="container py-5">
              {/* title */}
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-black my-5">
                  <h1>{name}</h1>
                </div>
              </div>
              {/* end of title */}
              {/* product Info */}
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                  <div className="col-10 mx-auto text-center text-slanted text-black my-5">
                    <img src={img} className="img-fluid"></img>
                  </div>
                  {/*product text */}
                  <div className="col-10 mx-auto col-md-6 my-3 text-capitalized">
                    <h2>{description}</h2>
                    <h4 className="text-black">{price}</h4>
                  </div>
                  <p className="text-capitalize font-weight-bold mt-3 mb-6">
                    Information about the product:
                  </p>
                  <p className="text-muted lead">{info}</p>
                  {/*buttons*/}
                  <div>
                    <Link to="/">
                      <ButtonContainer>back to products</ButtonContainer>
                    </Link>
                    <ButtonContainer
                      cart
                      disabled={inCart ? true : false}
                      onClick={() => {
                        value.addToCart(id);
                        value.openModal(id);
                      }}
                    >
                      {inCart ? "in Cart" : "add to cart"}
                    </ButtonContainer>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
export const ButtonContainer = styled.button`
  text-transform: capitalize;
  font-size: 1.4rem;
  background: transparent;
  border: 0.05rem solid var(--mainPink);
  color: var(--mainLight);
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  margin: 0.2rem 0.5rem 0.2rem 0;
  transition: 0.5s ease-in-out;
  &:hover {
    background: var(--mainPink);
    color: var(--mainLight);
  }
  &:focus {
    outline: none;
  }
`;
