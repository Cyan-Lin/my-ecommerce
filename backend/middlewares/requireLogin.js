module.exports = (req, res, next) => {
  if (!req.user) {
    console.log('no user');
    res.status(401).send({ error: 'You must log in!' });
  }

  next();
};
