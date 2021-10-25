import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import webpush from "web-push";
import Subscription from "./models/subscriptionModel.js";
import TemperaturaModel from "./models/tempModel.js";
import mongoose from "mongoose";
import PwaTable from "./models/";
const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://stipica11:stipo123@cluster0.ielh6.mongodb.net/PWA?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.once("open", () => {
  console.log("DB je konektovana...");
});
webpush.setVapidDetails(
  process.env.WEB_PUSH_CONTACT,
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

app.post("/tablica", async (req, res) => {
  const tablica = await pwaTableModel.create({
    vlaga: (Math.random() * 40).toFixed(2),
    tempds: (Math.random() * 35).toFixed(2),
    tempsht: (Math.random() * 26).toFixed(2),
    baterija: (Math.random() * 12).toFixed(2),
  });
});

app.get("/table", async (req, res) => {
  const tablica = await PwaTable.find()
    .sort({ createdAt: -1 })
    .then((rez) => {
      console.log(rez[0].vlaga.toString());
      res.status(200).json(rez);
    });
});
//Dodavanje novog preplatnika
app.post("/subscription", async (req, res, next) => {
  const { subscription } = req.body;
  try {
    const newSubscription = new Subscription(subscription);
    const savedSubscription = await newSubscription.save();
    res.status(201).json(newSubscription);
  } catch (e) {
    next(e);
  }
});
//Dodavanje temperature vezanje s preplatnikom
app.post("/addTemp", async (req, res) => {
  const { temp } = req.body;
  const end = JSON.parse(req.body.subs).endpoint;
  const subscription = await Subscription.findOne({ endpoint: end }).then(
    (rez) => {
      const novaTemeratura = TemperaturaModel.create({
        temperatura: temp,
        subs: rez._id,
      });
    }
  );
});

//Za slanje obavijesti
app.get("/broadcast", async (req, res) => {});

setInterval(async () => {
  const payload = JSON.stringify({
    title: "Vaša temperatura je prekoracila granicu",
    body: "It works.",
  });

  const zadnjaTemperatura = await PwaTable.findOne().sort({ createdAt: -1 });
  const subscriptions = await TemperaturaModel.find()
    .populate("subs")
    .then((temp) => {
      temp.forEach((sub, i) => {
        console.log(temp[i].temperatura); //upisana temp
        console.log(temp[i].subs);
        if (temp[i].temperatura < zadnjaTemperatura.tempds) {
          webpush.sendNotification(sub.subs, payload);
        } else {
          console.log("Temperatura je manja od unsene granice");
        }
      });
    });
  res.status(200).json({ success: true });
}, 120000);

app.post("/unsubscribe", async (req, res) => {
  const endpoint = JSON.parse(req.body.unsub).endpoint;
  const temperatura = JSON.parse(req.body.temperatura);
  console.log(req.body.temperatura);
  const deleteSubscription = await Subscription.findOneAndDelete({
    endpoint: endpoint,
  });
  const deleteTemperatura = await TemperaturaModel.findOneAndDelete({
    temperatura: temperatura,
  });
});

const PORT = process.env.PORT || 9000;
app.listen(9001, () =>
  console.log(`The server has been started on the port ${PORT}`)
);
