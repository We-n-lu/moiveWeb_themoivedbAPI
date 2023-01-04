import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import NavBarComp from "../components/NavBarComp";
import { AppContextInterface, useStateContext } from "./_app";

interface signInProps {}

const SignIn: React.FC<signInProps> = ({}) => {
  const { login, setLogin, user, setUser } =
    useStateContext() as AppContextInterface;
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const URL = process.env.MY_URL || "";
  
  const setTokens = (data: string) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setToken(data);
  };
  const infoSubmit = async () => {
    setTokens("{ username: username}");
    setLogin(true);
    setUser(username);
    localStorage.setItem("user", username);
    router.push("/");
  };

  return (
    <>
      <NavBarComp />
      <div style={{ backgroundColor: "lightgray", height: "100vh" }}>
        <Box sx={{ paddingTop: "8%" }}>
          <Sheet
            sx={{
              width: 300,
              mx: "auto", // margin left & right
              my: 4, // margin top & botom
              py: 3, // padding top & bottom
              px: 2, // padding left & right
              display: "flex",
              flexDirection: "column",
              gap: 2,
              backgroundColor: "white",
              borderRadius: "sm",
              boxShadow: "md",
            }}
            variant="outlined"
          >
            <div>
              <Typography level="h4" component="h1">
                <b>Welcome!</b>
              </Typography>
              <Typography level="body2">Sign in to continue.</Typography>
            </div>

            <TextField
              // html input attribute
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="username"
              placeholder="johndoe"
              // pass down to FormLabel as children
              label="username"
            />
            <Button sx={{ mt: 1 /* margin top */ }} onClick={infoSubmit}>
              Log in
            </Button>

        
          </Sheet>
        </Box>
      </div>
    </>
  );
};

export default SignIn;
