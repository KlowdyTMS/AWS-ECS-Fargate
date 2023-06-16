const express = require("express");
const axios = require("axios");
const app = express();

const indexPage = `
    <h3>Hello from a Node.js Application running on AWS ECS Fargate</h3>
    <p>What would you like to see?</p>
    <ul>
        <li>Random dogs? <a href="/dogs">Click here</a></li>
        <li>Random cats? <a href="/cats">Click here</a></li>
        <li>Create tables on AWS RDS <a href="/create-tables">Click here</a></li>
        <li>Check my todo list <a href="/todos">Click here</a></li>
    </ul>
`;

app.get("/", (req, res) => {
  res.send(indexPage);
});

app.get("/healthcheck", (req, res) => {
  try {
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get("/dogs", async (req, res) => {
  try {
    const response = await axios.get("http://dog.ceo/api/breeds/image/random");

    const { message: dog } = response.data;
    res.send(`<img src="${dog}" alt="dog" style="max-width: 500px" />`);
  } catch (error) {
    res.sendStatus(error);
  }
});

app.get('/cats', async (req, res) => {
  try {
    const response = await axios.get('https://aws.random.cat/meow');

    console.log(JSON.stringify(response.data));

    // const { file: catImage } = response.data;
    // res.send(
    //   `<img src="${catImage}" alt="random cat" style="max-width: 500px" />`
    // );
    
  } catch (error) {
    console.error(JSON.stringify(error));
    res.status(500);
    res.send(error.message);
  }
});

app.listen(3000, () => {});