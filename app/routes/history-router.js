const express = require('express');

const router = express.Router();

router.get('/history', (req, res) => {
  res.status(200).json({ status: true });
});

module.exports = router;
