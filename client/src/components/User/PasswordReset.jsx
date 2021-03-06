import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from './TextField';
import * as action from '../../store/actions/index';
import { checkPasswordRest } from '../../static/js/validator';

/**
 * @class PasswordReset
 *
 * @extends {React.Component}
 */
export class PasswordReset extends Component {
  state = {
    password: '',
    confirmPassword: '',
  }

  /**
   * @description update component state with current value in dom
   *
   * @param {any} event
   *
   * @memberof PasswordReset
   *
   * @returns {void}
   */
  onChange =(event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description vaildate data in state
   * sends state to api with action dispatch
   * @param {any} event
   *
   * @memberof PasswordReset
   *
   * @returns {void}
   */
  onSubmit = (event) => {
    event.preventDefault();
    checkPasswordRest(this.state.password, this.state.confirmPassword, (err, res) => {
      if (res) {
        this.props.initpasswordreset(
          this.props.match.params.token,
          this.state, this.props.history
        );
      }
    });
  }

  /**
   * @description renders component to the DOM
   *
   * @memberof PasswordReset
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    return (
      <div>
        <div className="container" style={{ paddingTop: '150px' }}>
          <h3 className="center">Event Manager</h3>
          <div className="card loginCard" style={{ width: '30rem' }}>
            <div className="card-header">
              <h3>Password Reset</h3>
            </div>
            <div className="card-body">
              <div className="cont card-body">
                <form onSubmit={this.onSubmit} className="centerform">
                  <TextField
                    label="New Password"
                    value={this.state.password}
                    onChange={this.onChange}
                    name="password"
                    type="password"
                    placeholder="Password"
                  />

                  <TextField
                    label="Password"
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                    name="confirmPassword"
                    type="password"
                    placeholder="confirm Password"
                  />
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-outline-dark"
                    >
                    Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PasswordReset.propTypes = {
  initpasswordreset: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string,
    }),
  }).isRequired,
};

export const mapDispatchToProps = dispatch => ({
  initpasswordreset: (token, user, history) =>
    dispatch(action.initpasswordreset(token, user, history)),
});

export default connect(null, mapDispatchToProps)(PasswordReset);
