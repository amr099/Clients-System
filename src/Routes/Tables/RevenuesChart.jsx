import React, { useState, useContext, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FirebaseContext } from "context/FirebaseContext";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  // LinearScale,
  PointElement,
  LineElement
);

export default function RevenuesChart() {
  const [years, setYears] = useState();
  const [year, setYear] = useState();
  const [revenues, setRevenues] = useState([]);
  const { clientsData, expenses } = useContext(FirebaseContext);

  const getYears = async () => {
    let years = new Set();
    await clientsData.clients?.map((c) => {
      c.transaction?.map((t) => {
        years.add(t.date.split("/")[2]);
      });
    });
    setYears([...years]);
  };

  const getRevenues = async () => {
    let months = new Map([
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
      [8, 0],
      [9, 0],
      [10, 0],
      [11, 0],
      [12, 0],
    ]);
    await clientsData.clients?.map((c) => {
      c.transaction?.map((t) => {
        for (let [k, v] of months.entries()) {
          if (t.date.split("/")[1] == k && t.date.split("/")[2] == year) {
            months.set(k, months.get(k) + Number(t.payment) || 0);
          }
        }
      });
    });
    setRevenues([...months.values()]);
  };

  useEffect(() => {
    getYears();
  }, []);
  useEffect(() => {
    getRevenues();
  }, [year]);

  return (
    <>
      <Alert variant="primary m-4">
        <h2>Revenues</h2>
      </Alert>
      <Container className="w-90 mx-auto mt-4">
        <Form.Select
          className="mb-4"
          onChange={(e) => {
            setYear(e.target.value);
          }}
          defaultValue="0"
        >
          <option value="0" disabled>
            Select year
          </option>
          {years?.map((year) => (
            <option key={year}>{year}</option>
          ))}
        </Form.Select>
        <Line
          datasetIdKey="id"
          data={{
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            datasets: [
              {
                id: 1,
                label: "Revenues",
                data: revenues,
              },
            ],
          }}
        />
      </Container>
    </>
  );
}
