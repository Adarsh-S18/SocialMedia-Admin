
import "./chart.scss";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useMemo, useState } from "react";
import axios from "../../axios";

const Chart = ({ aspect, title }) => {
  const [user, setUser] = useState([]);
  const [postData, setPostData] = useState([])
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    axios
      .get(`users/stats/1`, { withCredentials: true })
      .then((res) => {
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statsList.map((item) =>
          setUser((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ])
        );
        return () => {
          setUser([]);
        };
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`posts/stats/1`, { withCredentials: true })
      .then((res) => {
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });

        statsList.map((item) =>
          setPostData((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New Post": item.total },
          ])
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="chart">
      {user.length !== 0 && (
        <>
          <div className="title">{title}</div>
          {console.log(user)}
          <div className="container">
            <ResponsiveContainer width="40%" aspect={aspect}>
              <BarChart
                data={user}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                <XAxis dataKey="name" stroke="green" />
                <YAxis stroke="green" />
                <Tooltip />
                <Bar dataKey="New User" style={{ fill: "crimson", width: "10px", strokeWidth: 1 }} barSize={40} fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="containera">
            <ResponsiveContainer width="40%" aspect={aspect}>
              <BarChart
                data={postData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                <XAxis dataKey="name" stroke="blue" />
                <YAxis stroke="green" />
                <Tooltip />
                <Bar dataKey="New Post" style={{ fill: "green", width: "10px", strokeWidth: 1 }} barSize={40} fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default Chart;
