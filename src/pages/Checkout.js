import React, { useContext, useState } from "react";
import {CartContext} from './../context/cart'
import {UserContext} from './../context/user'
import {useHistory } from "react-router-dom"
import EmptyCart from './../components/Cart/EmptyCart'
//react-stripe-elements
import {CardElement,StripeProvider,Elements,injectStripe} from 'react-stripe-elements'
  import submitOrder from './../strapi/submitOrder'

function Checkout(props) {
  const {cart,total,clearCart} = React.useContext(CartContext)
  const {user,showAlert,hideALert,alert} =useContext(UserContext)
  const history = useHistory()

  //state value
  const [name,setName] = useState('')
  const [error,setError] = useState('')
 const isEmpty = !name || alert.show

    async function handleSubmit (e){
      showAlert({msg:'submitting order ... please wait'})
     e.preventDefault()
     const response = await props.stripe.createToken()
     .catch(error => console.log(error))
     console.log(props)
     //response can be of token of error depends op credit info it it is ok response will be token if not will be error
     console.log(response)

     const {token} = response
    if(token){
      setError('')
      const {id} = token
      let order = await submitOrder({name:name,total:total,items:cart,stripeTokenId:id,userToken:user.token})

      if(order){
        showAlert({msg:'your order is complete'})
        clearCart()
        history.push("/")
        return
      }
      else{
        showAlert({msg:"there was an error with your order ,please try again !",type:'danger'})
      }
    }
    else{
      hideALert()
      setError(response.error.message)
      
    }

  }



    
   if(cart.length < 1) return  <EmptyCart/>

  
  return <section className="section form">
   <h2 className="section title"> checkout </h2>
   <form className="checkout-form">
  <h3>order Total <span>${total}</span></h3>
  {/* single input */}
    <div className="form-control">
    <label htmlFor="name">name</label>
      <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)}/>
    </div>
  {/* end single input */}

  {/* card element */}
  <div className="stripe-input">
    <label htmlFor="card-element"> Credit or Debit card</label>
   <p className="stripe-info">
   test using this credit cart :<span> 4242 4242 4242 4242 </span>
   <br/>
   enter any 3 digits for the cvc
   <br/>
   enter any 5 digits forhe zip code

      </p> 
     
  </div>
  {/* stripe element  */}
  <CardElement className="card-element"></CardElement>
  {/* stripe errors */}
{error && <p className="form-empty"> {error}</p>}

{/* empty value */}
{isEmpty ? <p className="form-empty"> please fill out name field</p>
 :<button type="submit"  onClick={handleSubmit} 
 className="btn btn-block btn-primary" > submit  </button>

}


  {/* card element */}
  </form>
  </section>
}

const CardForm = injectStripe(Checkout)

 const  StripeWrapper = ()=>{
return(
<StripeProvider apiKey="pk_test_51HHohPCs7gnmkdev1Uikz5cLmuRjtxyfQhmLI1DwjyA3uH5yY9Jdl8niikAQ0hKmkIvisuivATp8I9LMyvZRSBDP00nDMp4V6B">
  <Elements>
    < CardForm></CardForm>
  </Elements>
</StripeProvider>
)
} 
export default StripeWrapper