'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('game', {
    playerOneName: 'Player 1',
    playerTwoName: 'Player 2',
  });
});

app.post('/', (req, res) => {
  const playerOneName = req.body.nameInput1;
  const playerTwoName = req.body.nameInput2;

  // if both > 0
  if (playerOneName.length > 0 && playerTwoName.length > 0) {
    res.render('game', {
      playerOneName: playerOneName,
      playerTwoName: playerTwoName,
    });
  }
  // if only playerone > 0
  else if (playerOneName.length > 0 && playerTwoName.length === 0) {
    res.render('game', {
      playerOneName: playerOneName,
      playerTwoName: 'Player 2',
    });
  }
  // if only playertwo > 0
  else if (playerTwoName.length > 0 && playerOneName.length === 0) {
    res.render('game', {
      playerOneName: 'Player 1',
      playerTwoName: playerTwoName,
    });
  }
  // else default
  else {
    res.render('game', {
      playerOneName: 'Player 1',
      playerTwoName: 'Player 2',
    });
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
