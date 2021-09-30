const router = require('express').Router();
const { User } = require('../../models');

// Register a new User
// Route: POST /api/user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.usrnm,
      password: req.body.pswd
    });
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
      console.log('----------------------------Session Object', req.session);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Log in a user
// Route: POST /api/user/login
router.post('/login', async (req, res) => {
 try {
    const userData = await User.findOne({ where: { username: req.body.usrnm } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.pswd);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
      console.log('----------------------------Session Object', req.session);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get user status
// Route: GET /api/user/userStatus
router.get("/userStatus", (req, res) => {
  res.status(200).json(req.session);
})

// Logout user
// Route: POST /api/user/logout
router.post('/logout', (req, res) => {
  console.log('Axios logout route');
  req.session.destroy(() => {
    res.status(200).end();
  });
});

module.exports = router;