import { Button } from "baseui/button";
import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  ErrorText,
  InnerContainer,
  InputWrapper,
  StyledInput,
} from "../commons";

// Login interface
function Login(props: any) {
  const [error, setError] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();

  // Send user login details for validation and receive token
  const onSubmit = async (values: any) => {
    console.log("Values: ", values);
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/login",
        values
      );

      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: values.email },
      });
      navigate("/");
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  const formik = useFormik({
    initialValues: {
      providerID: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <Container>
      <InnerContainer>
        <form onSubmit={formik.handleSubmit}>
          <h1 style={{ color: "white" }}>Enter Provider Login</h1>
          <br></br>
          <InputWrapper>
            <StyledInput
              name="providerID"
              value={formik.values.providerID}
              onChange={formik.handleChange}
              placeholder="Provider ID"
              clearOnEscape
              size="large"
              type="text"
            />
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password"
              clearOnEscape
              size="large"
              overrides={{
                MaskToggleButton: () => null,
              }}
            />
          </InputWrapper>
          <InputWrapper>
            <Button size="large" kind="primary">
              Login
            </Button>
          </InputWrapper>
          <br></br>
          {error ? (
            <ErrorText>{error}</ErrorText>
          ) : (
            <>
              <br></br>
              <br></br>
            </>
          )}
        </form>
      </InnerContainer>
    </Container>
  );
}

export default Login;
