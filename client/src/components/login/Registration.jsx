//import { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./login.css";

function Registration(props) {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      userType: "Rep",
    },
    // Validation requirements for each field
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Required")
        .test(
          "Unique Email",
          "Email already in use", // <- key, message
          function (value) {
            return new Promise((resolve, reject) => {
              fetch(`validate-email?email=${value}`)
                .then((res) => {
                  if (res.status === 200) {
                    resolve(false);
                    console.log('hi');
                  } else {
                    resolve(true);
                    console.log('ho');
                  }
                })
                .catch((err) => console.log(err));
            });
          }
        ),
      password: Yup.string()
        //password contains at least 8 characters,
        .min(8, "Your password is too short")
        /*password contains one lowercase letter, 
        one uppercase letter and one of the following characters: !, @, #, ? or ].*/
        .matches(/(?=.*\d)/, "Your password must contain at least one digit")
        .matches(
          /(?=.*[a-z])/,
          "Your password must contain at least one lower case character"
        )
        .required("Required"),
    }),
    //When submitting the form
    onSubmit: (values) => {
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.status === 200) {
            navigate('../login')
          } else {
            throw new Error("form not valid");
          }
        })
        .catch((err) => console.log(err));
      // props.changeIntf();
    },
  });

  return (
    <Container fluid className="signup-form mt-4">
      <h1 className="h1-form">Sign Up</h1>
      <br />
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <Form.Text className="text-danger">{formik.errors.name}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Enter your lastname"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <Form.Text className="text-danger">{formik.errors.lastName}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <Form.Text className="text-danger">{formik.errors.email}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <Form.Text className="text-danger">
              {formik.errors.password}
            </Form.Text>
          ) : null}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Form.Label
        className="text-muted text-center"
        onClick={() => navigate('../login')}
      >
        Login
      </Form.Label>
    </Container>
  );
}

export default Registration;
