import AccountCircle from "@mui/icons-material/AccountCircle";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import MailIcon from "@mui/icons-material/Mail";
import MoreIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import * as React from "react";
import { useEffect } from "react";
import { AppContextInterface, useStateContext } from "../pages/_app";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

interface searchTerm {
  search?: string;
  searchChange: (item: string) => void;
  request: (apiPath: string, search: string) => void;
}

const PrimarySearchAppBar: React.FC<searchTerm> = ({
  search,
  searchChange,
  request,
}) => {
  const { login, setLogin, user, collect, setCollect, setUser } =
    useStateContext() as AppContextInterface;

  useEffect(() => {
    if (localStorage === window.localStorage) {
      setLogin(localStorage.getItem("tokens") ? true : false);
      setUser(
        (localStorage.getItem("user") as string)
          ? (localStorage.getItem("user") as string)
          : ""
      );
    }
  }, [login, user]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const clearStorage=()=>{
    localStorage.removeItem("tokens");
    localStorage.removeItem("collect");
    localStorage.removeItem("user");
    
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        hi{" "}
        <label style={{ marginLeft: "8px", color: "purple", fontSize: "20px" }}>
          {user}
        </label>
      </MenuItem>
      <MenuItem
        onClick={() => {
          localStorage.setItem("collect", JSON.stringify(collect));
          router.push("/collection");
          handleMenuClose;
        }}
      >
        Collection
      </MenuItem>
      <MenuItem
        onClick={() => {
          // clearStorage();
          localStorage.clear();
          // setCollect([])
          setLogin(false);
          handleMenuClose();
          router.push('/')
        }}
      >
        Log Out
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show new notifications"
          color="inherit"
        >
          <Badge color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const router = useRouter();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          padding: 0,
          marginX: "10%",
          alignItems: "center",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => router.push("/")}
        >
          <LiveTvIcon sx={{ fontSize: 40 }} />
        </IconButton>
        <Button
          variant="outlined"
          color="inherit"
          sx={{ fontSize: 16 }}
          onClick={() => {
            router.push("/movie");
          }}
        >
          MOIVE
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => router.push("/tvshow")}
          sx={{ ml: 1, fontSize: 16 }}
        >
          TV SHOW
        </Button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (router.route !== "/search") {
              router.push("/search");
            } else {
              request("/search/movie", search!);
            }
          }}
        >
          <Search sx={{ border: 1 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
              // value={search}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e: any) => {
                searchChange(e.target.value);
                // console.log(search);
              }}
            />
          </Search>
        </form>
        <Box sx={{ flexGrow: 1 }} />
        {login ? (
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        ) : (
          <div>
            <Button
              color="inherit"
              onClick={() => router.push("/signIn")}
              sx={{ marginRight: "4px", fontSize: 16 }}
            >
              SIGN IN{" "}
            </Button>
          </div>
        )}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Box>
      {login ? renderMobileMenu : null}
      {renderMenu}
    </>
  );
};
export default PrimarySearchAppBar;
