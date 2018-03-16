/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import toast from 'toastr';
import {withRouter} from "react-router-dom";

export default function (ComposedComponent) {
  class IsAdmin extends Component {
      componentWillMount(){
          if(this.props.auth.user.role !== 'ADMIN1'){
           this.props.history.push("/")
            toast.error('Only Admins allowed')
        }
      }
    render() {
      return (
       <ComposedComponent {...this.props}/>
      );
    }
  }
    const mapStateToProps = state => ({
    auth: state.auth
})

    return withRouter(connect(mapStateToProps)(IsAdmin));
}

