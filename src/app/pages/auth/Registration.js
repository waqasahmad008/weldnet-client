import React from "react";
import axios from 'axios';
import { Formik } from "formik";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import * as auth from "../../store/ducks/auth.duck";
import { register } from "../../crud/auth.crud";
import  { Redirect } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function Registration(props) {
  const { intl } = props;

  return (
    <div className="kt-login__body">
       <div className="kt-login__form">
        <div className="kt-login__title">
          <h3>
            <FormattedMessage id="AUTH.REGISTER.TITLE" />
          </h3>
        </div>

        <Formik
          initialValues={{
            Name:"",
            Email: "",
            Company: "",
            Address: "",
            Telephone: "",
            acceptTerms: true,
            confirmPassword: "",
            Password:""
          }}
          validate={values => {
            const errors = {};

            if (!values.Email) {
              errors.Email = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.Email)
            ) {
              errors.Email = intl.formatMessage({
                id: "AUTH.VALIDATION.INVALID_FIELD"
              });
            }

            if (!values.Name) {
              errors.Name = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            }

            if (!values.Company) {
              errors.Company = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            }

            if (!values.Password) {
              errors.Password = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            }

            if (!values.confirmPassword) {
              errors.confirmPassword = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            } else if (values.Password !== values.confirmPassword) {
              errors.confirmPassword =
                "Password and Confirm Password didn't match.";
            }
            if (!values.acceptTerms) {
              errors.acceptTerms = "Accept Terms";
            }
             //return errors;
          }}
          onSubmit={(values, { setStatus, setSubmitting }) => {
            axios.post("http://localhost:5000/signup", values)
              .then(res => {
                console.log(res.data.message);
              if(res.data.message){
                  //console.log(res.data);
                  toast.success(res.data.message);
                  props.history.push("/");
               }else{
                  toast.error(res.data.error);
                  setSubmitting(false);
                }
                // else{
                //   alert(res);
                //   setSubmitting(false);
                // }
                //props.register(accessToken);
              })
              .catch(error => {
                console.log('SIGNUP ERROR', error.res.data);
                ///setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.res.data.error);
            });
              // .catch(() => {
              //   console.log('falie')
              //   setSubmitting(false);
              //   setStatus(
              //     intl.formatMessage({
              //       id: "AUTH.VALIDATION.INVALID_LOGIN"
              //     })
              //   );
              // });
          }}
        >
          {({
            values,
            status,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              {status && (
                <div role="alert" className="alert alert-danger">
                  <div className="alert-text">{status}</div>
                </div>
              )}

              <div className="form-group mb-0">
                <TextField
                  margin="normal"
                  label="Fullname"
                  className="kt-width-full"
                  name="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Name}
                  helperText={touched.fullname && errors.fullname}
                  error={Boolean(touched.fullname && errors.fullname)}
                />
              </div>

              <div className="form-group mb-0">
                <TextField
                  label="Email"
                  margin="normal"
                  className="kt-width-full"
                  name="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Email}
                  helperText={touched.email && errors.email}
                  error={Boolean(touched.email && errors.email)}
                />
              </div>

              <div className="form-group mb-0">
                <TextField
                  margin="normal"
                  label="Company Name"
                  className="kt-width-full"
                  name="Company"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Company}
                  helperText={touched.username && errors.username}
                  error={Boolean(touched.username && errors.username)}
                />
              </div>

              <div className="form-group mb-0">
                <TextField
                  type="password"
                  margin="normal"
                  label="Password"
                  className="kt-width-full"
                  name="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Password}
                  helperText={touched.password && errors.password}
                  error={Boolean(touched.password && errors.password)}
                />
              </div>

              <div className="form-group mb-0">
                <TextField
                  type="password"
                  margin="normal"
                  label="Confirm Password"
                  className="kt-width-full"
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  error={Boolean(
                    touched.confirmPassword && errors.confirmPassword
                  )}
                />
              </div>
              <div className="form-group mb-0">
                <TextField
                  margin="normal"
                  label="Company Address"
                  className="kt-width-full"
                  name="Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Address}
                  helperText={touched.username && errors.username}
                  error={Boolean(touched.username && errors.username)}
                />
              </div>
              <div className="form-group mb-0">
                <TextField
                  margin="normal"
                  label="Company Telephone"
                  className="kt-width-full"
                  name="Telephone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Telephone}
                  helperText={touched.username && errors.username}
                  error={Boolean(touched.username && errors.username)}
                />
              </div>

              <div className="form-group mb-0">
                <FormControlLabel
                  label={
                    <>
                      I agree the{" "}
                      <Link
                        to="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms & Conditions
                      </Link>
                    </>
                  }
                  control={
                    <Checkbox
                      color="primary"
                      name="acceptTerms"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      checked={values.acceptTerms}
                    />
                  }
                />
              </div>

              <div className="kt-login__actions">
                <Link
                  to="/auth/forgot-password"
                  className="kt-link kt-login__link-forgot"
                >
                  <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
                </Link>

                <Link to="/auth">
                  <button type="button" className="btn btn-secondary btn-elevate kt-login__btn-secondary">
                    Back
                  </button>
                </Link>

                <button type = "submit"
                  disabled={isSubmitting || !values.acceptTerms}
                  className="btn btn-primary btn-elevate kt-login__btn-primary"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default injectIntl(
  connect(
    null,
    auth.actions
  )(Registration)
);
