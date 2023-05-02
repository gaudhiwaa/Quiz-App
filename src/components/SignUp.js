import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const navigate = useNavigate();

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
   
  };

  function handleLoginClick() {
    navigate('/');
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: windowSize.height,
        background:
          "linear-gradient(122.76deg, #3550DC -35.72%, #27E9F7 172.73%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "80%",
          minHeight: "70% ",
        }}
      >
        {windowSize.width > 700 ? (
          <Box
            sx={{
              visibility: windowSize.width > 700 ? "visible" : "hidden",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
              borderRadius: "0 30px 30px 0 ",
            }}
          >
            <img src="/image/Quiz-Illustration.png" width={"550px"}></img>
          </Box>
        ) : (
          <></>
        )}

        <Box
          sx={{
            padding: "40px 34px 40px 34px",
            background: "#FFFFFF",
            borderRadius: "30px",
            width: windowSize.width > 700 ? "35%" : "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src="/image/Logo.png" width="42px" heigth="42px" />
            <Typography
              sx={{
                fontSize: "30px",
                fontWeight: 700,
                ml: "8px",
                color: "#333333",
              }}
            >
              QuizUp
            </Typography>
          </Box>

          <Typography
            sx={{
              marginTop: windowSize.width > 700 ? "56px" : "10px",
              fontSize: windowSize.width > 700 ? "24px" : "17px",
              fontWeight: 700,
            }}
          >
            Interactive Quiz for Learning
          </Typography>
          <Typography sx={{ mt: "10px", fontSize: "16px", mb: "20px" }}>
            Please fill information below
          </Typography>

          <Box>
            <Typography sx={{ mb: "5px" }}>
              {/* <b>Email:</b> */}
            </Typography>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              size="small"
              sx={{ width: "100%" }}
              // value={username}
              onChange={handleEmailChange}
            />
            <br />
            <Typography sx={{ mt: "18px", mb: "5px" }}>
              {/* <b>Email:</b> */}
            </Typography>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              size="small"
              sx={{ width: "100%" }}
              // value={username}
              onChange={handleEmailChange}
            />
            <br />

            <Typography sx={{ mt: "18px", mb: "5px" }}>
              {/* <b>Password:</b> */}
            </Typography>
            <TextField
              value={password}
              onChange={handlePasswordChange}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              size="small"
              sx={{ width: "100%" }}
            />

            <br />

            <Box
              sx={{
                display: "flex",
                width: "100%",
                mt: "27px",
                justifyContent: "space-between",
              }}
            >
              <Button
                disableElevation
                variant="outlined"
                sx={{
                  textTransform: "none",
                  width: "47%",
                  height: "40px",
                  borderRadius: "5px",
                }}
                onClick={handleLoginClick}
              >
                Login
              </Button>
              <Button
                disableElevation
                variant="contained"
                sx={{
                  textTransform: "none",
                  borderRadius: "5px",
                  ml: "24px",
                  width: "47%",
                  height: "40px",
                  background: "linear-gradient(122.76deg, #3550DC -35.72%, #27E9F7 172.73%)"
                }}
                onClick={handleSubmit}
              >
                Next
              </Button>
            </Box>
            <Box
              sx={{
                background:
                  "#60a4e4",
                height: "1px",
                mt: "20px",
                mb: "20px",
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: "10px",
              }}
            >
              <Typography sx={{ fontSize: "14px", mr: "7px" }}>
                Or login with
              </Typography>
              <Button variant="outlined" onClick={signInWithGoogle}>
                <img src="/image/IconGoogle.png" width="20px" />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
