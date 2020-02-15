import React, { Component } from "react";
import Title from "../title";
import CartCol from "./cartcolumn";
import EmptyCart from "./emptycart";
import { ProductConsumer } from "../context";
import CartList from "./cartlist";
import CartTotals from './carttotals'

export default class Cart extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {value => {
            const { cart } = value;
            if (cart.length > 0) {
              return (
                <React.Fragment>
                  <Title name="your" title="cart" />
                  <CartCol />
                  <CartList value={value}/>
                  <CartTotals value={value} history={this.props.history}/>
                </React.Fragment>
              );
            } else {
              return <EmptyCart />;
            }
          }}
        </ProductConsumer>
      </section>
    );
  }
}
