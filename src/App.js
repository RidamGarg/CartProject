import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";
import firebase from "firebase/app";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true,
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
  AddItem = () => {
    this.db
      .add({
        img: "https://media.croma.com/image/upload/v1605332123/Croma%20Assets/Large%20Appliances/Washers%20and%20Dryers/Images/8986234421278.png",
        price: 9999,
        qty: 1,
        title: "Washing Machine",
      })
      .then((docRef) => {
        console.log("Product has been added", docRef);
      })
      .catch((err) => {
        console.log("Oops Something went wrong", err);
      });
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
    return (
      <div className="App">
        <div>
          <Navbar count={this.totalItems()} />
        </div>
        <div>
          <Cart
            products={this.state.products}
            increaseQuantity={this.increaseQuantity}
            decreaseQuantity={this.decreaseQuantity}
            handleDeleteOptions={this.handleDeleteOptions}
          />
          {this.state.loading && <h1>Loading....</h1>}
        </div>
        <div style={{ fontSize: 20, padding: 10 }}>
          Total Amount : {this.totalAmount()}
        </div>
        <button onClick={this.AddItem}>Add Product</button>
      </div>
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
