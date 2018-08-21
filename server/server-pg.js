const nr = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// need to create a file to select data
const db = require('../db/queries-pg.js');


const app = express();

// to parse our data and use req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/about/hosts/:id', (req, res) => {
  // console.log(req.params);
  db.selectHostInfo(+req.params.id, (err, result) => {
    console.log('heeeeeelo', arguments);
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

app.get('/api/about/reviews/:listingId', (req, res) => {
  console.log('test', req.params);
  db.reviewsForHost(+req.params.listingId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

app.post('/api/about/reviews/new', (req, res) => {
  console.log('from server post reviews', req.body);
  db.addReviewForHost(req.body, (err, result) => {
    if (err) {
      console.log('err from server post reviews', err);
      res.status(500).send(err);
    } else {
      console.log('result', result);
      console.log('result rows', result.rows);
      res.status(200).send(result);
    }
  });
});

app.delete('/api/about/reviews/:listingId/delete', (req, res) => {
  console.log('test', req.params);
  db.deleteReviewForHost(+req.params.listingId, (err, result) => {
    if (err) {
      console.log('err from server delete review', err);
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

app.put('/api/about/reviews/:listingId/update', (req, res) => {
  db.updateReviewRating(req.body, (err, result) => {
    if (err) {
      console.log('err from server update review', err); 
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

// app.get('/api/about/reviews/:listingId', (req, res) => {
//   console.log(req.params);
//   db.addReviewForHost(+req.params.listingId, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(JSON.stringify(result));
//     }
//   });
// });

app.get('/api/about/neighborhood/:listingId', (req, res) => {
  db.neighborhoodInfo(+req.params.listingId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify(result));
    }
  });
});

app.listen(3001, () => {
  console.log('Server started on 3001');
});


// const express = require('express');
// const morgan = require('morgan');
// const path = require('path');
// const app = express();
// const port = process.env.PORT || 3002;
//
// app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, '../public')));
//
// app.listen(port, () => {
//   console.log(`server running at: http://localhost:${port}`);
// });
 