const router = require("express").Router();
const client = require("twilio")();

router.get("/send/:id", (req, res) => {
  const sender = req.params.id;
  client.messages
    .create({
      body: `Your name was called during the meeting at 11:52AM ${sender}`,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+918924805069",
    })
    .then((message) => console.log(message.sid))
    .then((message) => res.send("message sent!!"))
    .done();
});

module.exports = router;
