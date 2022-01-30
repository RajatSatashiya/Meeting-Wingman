const router = require("express").Router();
const client = require("twilio")();

router.post("/send", (req, res) => {
  try {
    const { name, phone, keyword } = req.body;
    console.log(req.body);

    client.messages
      .create({
        body: `Meeting Wingman: ${name} please check your meeting, your specified keyword: ${keyword} was highlighted during the meet`,
        from: "whatsapp:+14155238886",
        to: `whatsapp:${phone}`,
      })
      .then((message) => console.log(message.sid))
      .then((message) => res.send("message sent!!"))
      .done();

    res.json({
      message: "message was send",
    });
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
