import React, { useState, useEffect} from 'react'
import locaCart from './../utils/localCart'


function getCartFromLocalStorage(){
    return localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[]
}


const CartContext = React.createContext()

function CartProvider ({children}){
    
    const [cart,setCart] = useState(getCartFromLocalStorage())
    const [total,setTotal] =useState(0)
    const [cartItems,setCartItems] = useState(0)

useEffect(()=>{
    //localstorage
    localStorage.setItem("cart",JSON.stringify(cart))
    //total of cart items
let newCartItems = cart.reduce((total,cartItem)=> {
   return (total+= cartItem.amount)
},0)
setCartItems(newCartItems)
// cart total
    let newTotal = cart.reduce((total,cartItem)=>(
    total + cartItem.amount * cartItem.price),0)

    newTotal = parseFloat(newTotal.toFixed(2))
   setTotal(newTotal)
},[cart])



     //removeItem
            const removeItem = (id)=>{
            // const newCart = [...cart].filter(item=>item.id !==id)
            // setCart(newCart)
            setCart([...cart].filter(item=>item.id !== id))
                }

    //increaseAmount 
    const increaseAmount =  (id)=>{
const newCart = [...cart].map(item => {
    return item.id === id ?{...item,amount:item.amount+1}:{...item}
})
setCart(newCart)
    }


    //decreaseAmount 
    const decreaseAmount = (id,amount)=>{
    if (amount === 1){
    removeItem(id)
    return;
   }else{
    const newCart = [...cart].map(item => {
    return item.id === id ?{...item,amount:item.amount - 1}
    :{...item}
    })
    setCart(newCart)
   }
    }

    //add to cart
        const addToCart = (product)=>{
             const {id,image,title,price} = product;
            const item = [...cart].find(item => item.id === id);  
        if(item){
            increaseAmount(id)  
        }else{
            const newItem = {id,image,title,price,amount:1}
            const newCart = [...cart,newItem]
            setCart(newCart)
        }

    }


    // clear cart
        const clearCart =()=>{
        setCart([])
    }


    return <CartContext.Provider value={{cart,total,cartItems,      removeItem,increaseAmount,decreaseAmount,addToCart,clearCart}}>
        {children}
    </CartContext.Provider>
}

export {CartContext,CartProvider}
