import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MmsIcon from '@mui/icons-material/Mms';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";
import axios from "../../axios";
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  const [user, setUser] = useState({});
  const [post, setPost] = useState({});
  const [err, setErr] = useState(false);
  let data;
  useEffect(() => {
    axios.get(`users/`, { withCredentials: true }).then((res) => {
      setUser(res.data);
    })
      .catch((e) => {
        console.log(e);
        setErr(e.response.data);
      });
  }, []);

  useEffect(() => {
    axios.get(`posts/`, { withCredentials: true }).then((res) => {
      setPost(res.data);
    })
      .catch((e) => { console.log(e); });
  }, []);


  switch (type) {
    case "user":
      data = {
        title: "Total Users in Spectrum",
        isMoney: false,
        link: "users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              fontSize: "40px",
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;

    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;

    case "earning":
      data = {
        title: "Total Posts in Spectrum",
        isMoney: true,
        link: "posts",
        icon: (
          <MmsIcon
            className="icon"
            style={{ backgroundColor:"blue", color: "skyblue" }}
          />
        ),
      };
      break;



    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney ? post.length : user.length}
        </span>
      </div>
      <div className="right">
        {data.icon}
        <div style={{ marginLeft: "10px" , marginRight:"40px"}}>
          <Link to={data.link}>
            <span className="link">See all {data.link}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Widget;
