//env file
require("dotenv").config();

//imports
const fs = require("fs");
const express = require("express");
// const { Deepgram } = require("@deepgram/sdk");

// const deepgram = new Deepgram(process.env.DG_KEY);
// const audioURL =
//   "https://static.deepgram.com/examples/deep-learning-podcast-clip.wav";

// const audio = "deep-learning-podcast-clip.wav";
// const audioBuffer = fs.readFileSync(audio);

// var trans;
// deepgram.transcription
//   .preRecorded({ url: audioURL }, { punctuate: true })
//   //   .preRecorded(
//   //     {
//   //       buffer: audioBuffer,
//   //       mimetype: "audio/wav",
//   //     },
//   //     {
//   //       punctuate: true,
//   //     }
//   //   )
//   .then((data) => {
//     // console.dir(data, { depth: null });
//     // console.log(data.results.channels[0];
//     var transcript = data.results.channels[0].alternatives[0].transcript;
//     trans = transcript;
//   })
//   .catch((e) => {
//     console.log("Error " + e);
//   });

const app = express();
// app.get("/", (req, res) => {
//   res.send(trans);
// });
app.use(express.static("public"));

app.use("/whatsapp", require("./routes/whatsapp.js"));

var port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
