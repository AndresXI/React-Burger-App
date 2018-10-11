import React from 'react'; 
import Aux from '../../hoc/Aux'; 
import classes from './Layout.css'; 

const layout = (props) => (

    <Aux>
        <div>
            Toolbar, SideDrawer, Backdrop
        </div>
        <main className={classes.Content}>
            {props.children} {/** getting this from the parent component */}
        </main>
    </Aux>
); 

export default layout; 