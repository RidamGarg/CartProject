import CartItem from './CartItem';
const Cart = (props)=>{
        const {products,increaseQuantity,decreaseQuantity,handleDeleteOptions} = props ;
        return(
            <div className="cart">
               {
                 products.map((product)=>{
                   return <CartItem product = {product} key={product.id} onIncrement = {increaseQuantity} onDecrement={decreaseQuantity} onDelete={handleDeleteOptions}/>
                   })
               }
            </div>
        )
    
}
export default Cart ;