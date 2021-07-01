import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
const CartItem = (props) => {
  const { price, title, qty, img } = props.product;
  const { onIncrement, onDecrement, onDelete, product } = props;
  return (
    <div>
      <div className="cart-item">
        <div className="left-block">
          <img style={styles.image} src={img} alt="item" />
        </div>
        <div className="right-block">
          <div style={{ fontSize: 30, color: "#777" }}>{title}</div>
          <div style={{ fontSize: 20, color: "#777" }}>Rs {price}</div>
          <div style={{ fontSize: 20, color: "#777" }}>Qty : {qty}</div>
          <div className="cart-item-actions" style={{ marginTop: 10 }}>
            <AddCircleOutlineIcon
              onClick={() => onIncrement(product)}
            ></AddCircleOutlineIcon>

            <RemoveCircleOutlineIcon
              onClick={() => onDecrement(product)}
            ></RemoveCircleOutlineIcon>

            <DeleteIcon
              onClick={() => onDelete(product.id)}
              fontSize="normal"
            ></DeleteIcon>
          </div>
        </div>
      </div>
    </div>
  );
};
const styles = {
  image: {
    borderRadius: 4,
    width: 150,
    height: 150,
    backgroundColor: "grey",
  },
};
export default CartItem;
