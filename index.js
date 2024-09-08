var express = require('express');
var cors = require('cors');
const multer = require('multer');
const path = require('path');


require('dotenv').config()

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({dest:'uploads/'});

// Serve static files from the 'uploads' directory
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  
   if (!req.file) {
     res.json("No file uploaded. Please upload a file.")
   } else {
   res.json({
     name: req.file.originalname,
     type: req.file.mimetype,
     size: req.file.size,
   });
  }
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
