const router = require("express").Router();
const { Deepgram } = require("@deepgram/sdk");
const fs = require("fs");

const deepgram = new Deepgram(process.env.DG_KEY);
const audio = "deep-learning-podcast-clip.wav";
const audioBuffer = fs.readFileSync(audio);

router.get("/", (req, res) => {
  var trans;
  deepgram.transcription
    // .preRecorded({ url: audioURL }, { punctuate: true })
    .preRecorded(
      {
        buffer: audioBuffer,
        mimetype: "audio/wav",
      },
      {
        punctuate: true,
      }
    )
    .then((data) => {
      var transcript = data.results.channels[0].alternatives[0].transcript;
      trans = transcript;
      res.send(trans);
    })
    .catch((e) => {
      res.send(e);
    });
});

module.exports = router;
