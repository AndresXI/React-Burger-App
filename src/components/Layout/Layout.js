import React from 'react'; 
import Aux from '../../hoc/Aux'; 
import classes from './Layout.css'; 
import Toolbar from '../Navigation/Toolbar/Toolbar'; 
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'; 

const layout = (props) => (

    <Aux>
        <Toolbar />
        <SideDrawer />
        <main className={classes.Content}>
            {props.children} {/** getting this from the parent component */}
        </main>
    </Aux>
); 

export default layout; 