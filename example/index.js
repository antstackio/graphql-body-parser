const express = require("express");
const { graphqlParser } = require("../dist");

const app = express();

app.use(graphqlParser());
app.post("/", (req, res) => {
  console.log("gql object", JSON.stringify(req.gqlObject));
  res.send({
    message: "Yoohoooo",
  });
});

app.listen(4000, () => {
  console.log("app has started running.. 🚀🚀");
});
