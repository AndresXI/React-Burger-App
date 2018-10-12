import React from 'react'; 
import Aux from '../../../hoc/Aux'; 
import Button from '../../UI/Button/Button'; 

const orderSummary = (props) => {
    const ingridientSummary = Object.keys(props.ingridient)
        .map(igKey => {
            return <li key={igKey}>
                    <span syle={{textTransform: 'capitalize'}}>{igKey}</span>:{props.ingridient[igKey]} 
                   </li>
        }); 

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingridientSummary}
            </ul>
            <p>Continue to Ckeckout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )
}

export default orderSummary; 