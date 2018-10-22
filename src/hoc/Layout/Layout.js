import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 

import Aux from '../Aux/Aux'; 
import classes from './Layout.css'; 
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'; 
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'; 

class Layout extends Component {

    state = {
        showSideDrawer: true
    }

    // event handler 
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false}); 
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}; 
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children} {/** getting this from the parent component */}
                </main>
            </Aux>
        )
    }; 

}

const mapStateToProps = state => {
    return {
        // extract the token from the auth reducer and compare it to null
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout); 