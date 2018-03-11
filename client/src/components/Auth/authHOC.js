/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import toast from 'toastr';
import {withRouter} from "react-router-dom";



export default function (ComposedComponent) {
  class Authenticate extends Component {
      componentWillMount(){
          if(!this.props.isAuthenticated){
            toast.error('You need to LogIn First!')
            this.props.history.push("/login")
        }
      }
    render() {
      return (
       <ComposedComponent {...this.props}/>
      );
    }
  }
    const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

    return withRouter(connect(mapStateToProps)(Authenticate));
}


