import React, { Component, PureComponent } from "react";
import { storeProducts, detailProduct } from "../data";
const ProductContext = React.createContext();

//Provider - provide info for app
//Consumer - able to grab props wherever in app instead of passing

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct, //the detail product is for another component, when the user clicks on the item it takes them to the full description of the item
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0, //price of item
    cartTax: 0, //tax for cart
    cartTotal: 0 //total of item
  };
  componentDidMount() {
    //react lifecycle to get products // this was meant to get a fresh set values. // the point of this was when changing the value in one place were also changing the value that the object was assigned to.
    this.setProducts();
  }
  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem]; //looping through
    });
    this.setState(() => {
      return { products: tempProducts };
    });
  };

  //utility item that gets the id
  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  handleDetail = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };
  addToCart = id => {
    //when an item is added to the cart it picks up the id of the specifci item.
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(
      () => {
        return { products: tempProducts, cart: [...this.state.cart, product] };
      },
      () => {
        this.addTotals();
      }
    );
  };
  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };
  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  increment = id => {
    //adding item to quantity
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1; //increment by one
    product.total = product.count * product.price; //multiplied by price
    this.setState(
      () => {
        return { cart: [...tempCart] };
      },
      () => {
        this.addTotals();
      }
    );
  };
  decrement = id => {
    //taking away product quantity
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;

    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(
        () => {
          return { cart: [...tempCart] };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };

  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    tempCart = tempCart.filter(item => item.id !== id);

    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false; // set to false to eventually add product back to false
    removedProduct.count = 0;
    removedProduct.total = 0;

    this.setState(
      () => {
        return {
          cart: [...tempCart],
          products: [...tempProducts]
        };
      },
      () => {
        this.addTotals(); //able to remove one single item
      }
    );
  };
  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        //wrote a cb function to truthfully clear the cart
        this.setProducts();
        this.addTotals();
      }
    );
  };
  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total)); //add item from subtotal
    const tempTax = subTotal * 0.1; //this is for the tax to be multipled by 0.1
    const tax = parseFloat(tempTax.toFixed(2)); //parseFloat allows the first number in the string to be returned  //to fixed means for how mamy decimals
    const total = subTotal + tax; //what this line means is that everything is equal and added to the subtotal and tax
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total
      };
    });
  };
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
