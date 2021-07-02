import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";
import firebase from "firebase/app";
import AddProduct from "./addProduct";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
function Home(props) {
  return (
    <div>
      <div>
        <Cart
          products={props.products}
          increaseQuantity={props.increaseQuantity}
          decreaseQuantity={props.decreaseQuantity}
          handleDeleteOptions={props.handleDeleteOptions}
        />
        {props.loading && <h1>Loading....</h1>}
      </div>
      <div style={{ fontSize: 20, padding: 10 }}>
        Total Amount : {props.totalAmount()}
      </div>
    </div>
  );
}
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true,
      product: {},
    };
    this.db = firebase.firestore().collection("products");
  }
  increaseQuantity = (product) => {
    const { products } = this.state;
    const idx = products.indexOf(product);
    const docRef = this.db.doc(products[idx].id);
    docRef
      .update({
        qty: products[idx].qty + 1,
      })
      .then(() => {
        console.log("Updated Successfully");
      });
  };
  decreaseQuantity = (product) => {
    const { products } = this.state;
    const idx = products.indexOf(product);
    if (products[idx].qty === 0) return;
    const docRef = this.db.doc(products[idx].id);
    docRef
      .update({
        qty: products[idx].qty - 1,
      })
      .then(() => {
        console.log("Updated Successfully");
      });
  };
  handleDeleteOptions = (id) => {
    const { products } = this.state;
    const docRef = this.db.doc(id);
    docRef.delete().then(() => {
      console.log("Deleted Successfully");
    });
  };
  componentDidMount = () => {
    this.db.orderBy("price", "asc").onSnapshot((snapshot) => {
      //where
      const products = snapshot.docs.map((doc) => {
        const obj = doc.data();
        obj["id"] = doc.id;
        return obj;
      });
      this.setState({ products, loading: false });
    });
  };
  handleChange = (key, value) => {
    const product = {
      ...this.state.product,
    };
    product[key] = value;
    this.setState({
      product,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { product } = this.state;
    if (Object.keys(product).length != 0) {
      this.db
        .add({
          img: product.imageUrl,
          title: product.name,
          price: product.price,
          qty: 1,
        })
        .then((docref) => {
          console.log("Product has been added", docref);
        })
        .catch((err) => {
          console.log("Oops something went wrong", err);
        });
    }
    this.setState({ product: {} });
  };

  totalItems = () => {
    const { products } = this.state;
    let count = 0;
    products.forEach((product) => {
      count += product.qty;
    });
    return count;
  };
  totalAmount = () => {
    const { products } = this.state;
    let amount = 0;
    products.forEach((product) => {
      amount += product.qty * product.price;
    });
    return amount;
  };
  render() {
    const { product } = this.state;

    return (
      <Router>
        <div>
          <Navbar count={this.totalItems()} />
        </div>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => {
              return (
                <Home
                  products={this.state.products}
                  increaseQuantity={this.increaseQuantity}
                  decreaseQuantity={this.decreaseQuantity}
                  handleDeleteOptions={this.handleDeleteOptions}
                  loading={this.state.loading}
                  totalAmount={this.totalAmount}
                />
              );
            }}
          />
          <Route
            path="/add/product"
            render={(props) => {
              return (
                <AddProduct
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  checkAddProductStatus={this.checkAddProductStatus}
                />
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
}
export default App;

// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if
//           request.time < timestamp.date(2021, 5, 25);
//     }
//   }
// }
