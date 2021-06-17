const _ = require('lodash')

module.exports = (req, res, next) => {
  var data = req.body
  if (!_.isEmpty(data)) {
    next()
  } else {
    res.status(400).json({
      message: 'Bad request.'
    })
  }
}
