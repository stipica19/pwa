import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";

const Chartt = () => {
  const [datum, setDatum] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [day, setDay] = useState();

  const vrijeme = [];
  const vlaga = [];
  const tempds = [];
  const tempsht = [];
  const baterija = [];
  useEffect(() => {
    fetch("https://stipica10.tk/api/table")
      .then((res) => res.json())
      .then((data) => setDatum([...data]))
      .then(setisLoading(true));
  }, [day]);
  if (isLoading) {
    datum.reverse().map((e) => {
      console.log("klik");
      const dateToFormat = new Date(e.createdAt);
      moment(dateToFormat).format("MMM Do YY");
      vrijeme.push(moment(dateToFormat).format("l"));
      vlaga.push(e.vlaga);
      tempsht.push(e.tempsht);
      tempds.push(e.tempds);
      baterija.push(e.baterija);
    });
  }
  const data = {
    labels: vrijeme,
    datasets: [
      {
        label: "vlaga",
        data: vlaga,
        fill: true,
        backgroundColor: "rgba(184, 185, 210, .3)",
        borderColor: "rgb(35, 26, 136)",
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(35, 26, 136)",
        pointBackgroundColor: "rgb(255, 255, 255)",
        pointBorderWidth: 5,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(0, 0, 0)",
        pointHoverBorderColor: "rgba(220, 220, 220, 1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 5,
      },
    ],
  };

  const data1 = {
    labels: vrijeme,
    datasets: [
      {
        label: "tempsht",
        data: tempsht,
        fill: true,
        backgroundColor: "rgba(184, 185, 210, .3)",
        borderColor: "rgb(35, 26, 136)",
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(35, 26, 136)",
        pointBackgroundColor: "rgb(255, 255, 255)",
        pointBorderWidth: 5,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(0, 0, 0)",
        pointHoverBorderColor: "rgba(220, 220, 220, 1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 5,
      },
    ],
  };
  const data2 = {
    labels: vrijeme,
    datasets: [
      {
        label: "tempds",
        data: tempds,
        fill: true,
        backgroundColor: "rgba(250, 27, 27, .2)",
        borderColor: "rgb(250, 27, 27)",
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(250, 27, 27)",
        pointBackgroundColor: "rgb(255, 255, 255)",
        pointBorderWidth: 5,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(0, 0, 0)",
        pointHoverBorderColor: "rgba(220, 220, 220, 1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 5,
      },
    ],
  };
  const data3 = {
    labels: vrijeme,
    datasets: [
      {
        label: "baterija",
        data: baterija,
        fill: true,
        backgroundColor: "rgba(250, 27, 27, .2)",
        borderColor: "rgb(250, 27, 27)",
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(250, 27, 27)",
        pointBackgroundColor: "rgb(255, 255, 255)",
        pointBorderWidth: 5,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(0, 0, 0)",
        pointHoverBorderColor: "rgba(220, 220, 220, 1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 5,
      },
    ],
  };
  const options = {
    title: {
      display: true,
      text: "Line Chart",
    },
    scales: {
      y: {
        ticks: {
          stepSize: 5,
        },
      },
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          stepSize: 0.2,
        },
        min: day,
        max: moment(new Date().toISOString()).format("l"),
      },
    },
  };
  return (
    <div>
      <div className="container">
        <button
          className="button"
          onClick={() => {
            const d = new Date().toISOString();
            console.log(moment(d).subtract(2, "days").format("l"));
            setDay(moment(d).subtract(2, "days").format("l"));
          }}
        >
          1 Dan
        </button>
        <button
          className="button"
          onClick={() => {
            const d = new Date().toISOString();
            setDay(moment(d).subtract(7, "days").format("l"));
          }}
        >
          7 Dana
        </button>
        <button
          className="button"
          onClick={() => {
            const d = new Date().toISOString();
            console.log(moment(d).subtract(1, "months").format("l"));
            setDay(moment(d).subtract(1, "months").format("l"));
          }}
        >
          1 Mjesec
        </button>
      </div>

      <div className="row">
        <div className="column">
          <Line data={data} options={options} />
        </div>
        <div className="column">
          <Line data={data1} options={options} />
        </div>
        <div className="column">
          <Line data={data2} options={options} />
        </div>
        <div className="column">
          <Line data={data3} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Chartt;
