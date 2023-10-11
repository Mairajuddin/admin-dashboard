import React, { useState } from "react";
import { Grid, Box, Typography ,Hidden } from "@mui/material";
import "../Styles/Pages/Home.css";
import PersonIcon from "@mui/icons-material/Person";
import BarChart from "../Components/BarChart";
import { ChartData } from "../Components/ChartData";
import PieChart from "../Components/PieChart";
import LineChart from "../Components/LineChart";

const Home = () => {
  console.log(ChartData, "chartdata");

  const [UserData, setUserData] = useState({
    labels: ChartData.map((data) => data.year),
    dataset: [
      {
        labels: "Users Age",
        data: ChartData.map((data) => data.age),
      },
    ],
  });
  console.log(UserData, "chart");

  const topCards = [
    { title: "Offer", value: "$100" },
    { title: "Sales", value: "1000" },
    { title: "Rate", value: "90%" },
  ];
  const users = [
    { name: "ARHAM KHAN", email: "arhamkhancs99@gmail.com" },
    { name: "Qazi Mairaj", email: "mairaj875@example.com" },
    { name: "Peter Parker", email: "peter5R9@example.com" },
    { name: "John Moreno", email: "Moreno5R9@example.com" },
    { name: "Sara Peterson", email: "speterson5R9@example.com" },
    { name: "Albert Antonio", email: "albertantonio5R9@example.com" },
  ];
  return (
    <Grid container className="main">
      <Hidden mdUp>
      <Box className="top-cards hidden-top-cards" sx={{display: "flex",flexDirection:"row", margin: "10px" ,width:'100%' }}>
          <Box
            className="card"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="container left-side-card">
              <Typography>Users</Typography>
              <br />
              <Typography variant="h5">1100</Typography>
              <br />
              <Typography variant="caption">view all</Typography>
            </div>
            <div  className="linechart-area">
              <LineChart id={"chart1"} />
            </div>
          </Box>
          <Box
            className="card"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="container left-side-card">
              <Typography className="card-title">Business</Typography>
              <br />
              <Typography variant="h5" className="card-rate">1100</Typography>
              <br />
              <Typography variant="caption" className="card-para">view all</Typography>
            </div>
            <div className="linechart-area">
              <LineChart id={"chart2"} />
            </div>
          </Box>
          <Box
            className="card"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="container left-side-card">
              <Typography>Revenue</Typography>
              <br />
              <Typography variant="h5">1100</Typography>
              <br />
              <Typography variant="caption">view all</Typography>
            </div>
            <div className="linechart-area">
              <LineChart id={"chart3"} />
            </div>
          </Box>
        </Box>
        <Grid className="bottom-charts" style={{display:'flex',width:"100%"}} >
          <Grid item className="bar-chart"  lg={7}  sm={6} xs={12}>
            <BarChart />
          </Grid>
          <Grid item
            className="pie-chart"
            lg={5}
            sm={6}
            xs={12}
            // style={{width:"20%"}}
          >
            <PieChart />
          </Grid>
        </Grid>
        </Hidden>
        {/* <Hidden></Hidden> */}
     <Grid item xs={12} sm={12} md={3} className="left-sidebar  " >
        <h3>Top Users</h3>
        <br />
        {users.map((user) => (
          <Box className="sidebar-users" key={user.name}>
            <div className="profile-icon">
            <PersonIcon  />
            </div>
            <Box className="sidebar-user-info" sx={{ display: "flex", flexDirection: "column",  }}>
              <p  classname="sidebar-user-name" >{user.name}</p>
              <Typography className="body1 sidebar-user-email" sx={{ fontSize: "10px" }}>
                {user.email}
              </Typography>
            </Box>
            <span className="span-rate">$100</span>
          </Box>
        ))}
      </Grid>
      <Grid item xs={12} sm={12} md={9} className="main-content">
      <Hidden mdDown>
        <Box className="top-cards" sx={{ margin: "10px" }}>
          <Box
            className="card"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="container left-side-card">
              <Typography>Users</Typography>
              <br />
              <Typography variant="h5">1100</Typography>
              <br />
              <Typography variant="caption">view all</Typography>
            </div>
            <div  className="linechart-area">
              <LineChart id={"chart1"} />
            </div>
          </Box>
          <Box
            className="card"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="container left-side-card">
              <Typography className="card-title">Business</Typography>
              <br />
              <Typography variant="h5" className="card-rate">1100</Typography>
              <br />
              <Typography variant="caption" className="card-para">view all</Typography>
            </div>
            <div className="linechart-area">
              <LineChart id={"chart2"} />
            </div>
          </Box>
          <Box
            className="card"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="container left-side-card">
              <Typography>Revenue</Typography>
              <br />
              <Typography variant="h5">1100</Typography>
              <br />
              <Typography variant="caption">view all</Typography>
            </div>
            <div className="linechart-area">
              <LineChart id={"chart3"} />
            </div>
          </Box>
        </Box>
       

        <Grid className="bottom-charts" style={{display:'flex',width:"100%"}} >
          <Grid item className="bar-chart"  lg={7}  sm={6} xs={12}>
            <BarChart />
          </Grid>
          <Grid item
            className="pie-chart"
            lg={5}
            sm={6}
            xs={12}
            // style={{width:"20%"}}
          >
            <PieChart />
          </Grid>
        </Grid>
         </Hidden>
      </Grid>
    </Grid>
  );
};

export default Home;
