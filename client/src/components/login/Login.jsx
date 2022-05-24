import { Form, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCookies } from "react-cookie";

function Login(props) {
  const [cookies, setCookie] = useCookies([]);
  const handleCookie = (key, val) => {
    setCookie(key, val, {
      path: "/",
    });
  };
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // Validation requirements for each field
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Required")
        .test(
          "Email exists",
          "Email does not exist in the database", // <- key, message
          function (value) {
            return new Promise((resolve, reject) => {
              fetch(`validate-email?email=${value}`)
                .then((res) => {
                  if (res.status === 200) {
                    resolve(true);
                  } else {
                    resolve(false);
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
    onSubmit: async (values) => {
      const login = await fetch(
        `login?email=${values.email}&password=${values.password}`
      );
      if (login.status === 200) {
        const data = await login.json();
        handleCookie("userId", data._id);
        console.log(data);
        navigate('../courses')
      }
    },
  });

  return (
    <Container fluid className="signup-form">
      <h1 className="h1-form ">Login</h1>
      <br />
      <Form onSubmit={formik.handleSubmit}>
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

        <Button type="submit">Submit</Button>
      </Form>

      <Form.Label
        className="text-muted text-center"
        onClick={() => navigate("../signup")}
      >
        don't have and account? Sign up.
      </Form.Label>
    </Container>
  );
}

export default Login;
