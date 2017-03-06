const express = require('express');
const historyController = require('../controller/history-controller');

const router = express.Router();

router.get('/history', (req, res) => {
  historyController.searchLatest(5).then(
    (result) => {
      res.status(200).json(result);
    }).catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
