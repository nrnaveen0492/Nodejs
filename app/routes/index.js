var express = require('express');
var index = require('../controllers/index');
var passport = require('../config/passport');
var authorization = require('../config/authorization');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var router = express.Router();

router.use(function (req, res, next) {
	if(req.isAuthenticated() && req.user.role != 'admin') {
		res.locals.user = req.user;
	}
	next();
});

// GET home page
router.get('/', index.getHome);

// activate account
router.route('/account/activate/:token').get(authorization.requiresNotLogin, index.getActivate);

// login route
router.route('/login')
	.get(authorization.requiresNotLogin, index.getLogin)
	.post(authorization.requiresNotLogin, index.postLogin);

// signup route
router.route('/signup')
	.get(authorization.requiresNotLogin, index.getSignup)
	.post(index.postSignup);

// logout route
router.route('/logout').get(index.getSignout);

// forgot password
router.route('/forgotpasswd')
	.get(authorization.requiresNotLogin, index.getForgotPassword)
	.post(authorization.requiresNotLogin, index.postForgotPassword);

// reset password
router.route('/resetpasswd/:token')
	.get(authorization.requiresNotLogin, index.getResetPassword)
	.post(authorization.requiresNotLogin, index.postResetPassword);

router.route('/changepwd')
	.get(authorization.requiresLogin, index.getChangepwd)
	.post(authorization.requiresLogin, index.postChangepwd);

router.route('/redirect').get(index.getRedirect);

router.route('/file')
	.get(authorization.requiresLogin, index.getFile)
	.post(authorization.requiresLogin, multipartMiddleware, index.postFile);

router.route('/download').get(index.getDownload);

router.route('/mail').get(index.getMail);

// Setting the google oauth routes
router.get('/google', authorization.requiresNotLogin, passport.authenticate('google', {
	failureRedirect: '/login',
	scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
}), index.getLogin);

router.get('/google/callback', authorization.requiresNotLogin, passport.authenticate('google', {
	failureRedirect: '/login',
	successRedirect: "/",
}), index.getHome);

// Setting the facebook oauth routes
router.get('/facebook', authorization.requiresNotLogin, passport.authenticate('facebook', {
	scope: ['email', 'public_profile'],
	failureRedirect: '/login'
}), index.getLogin);

router.get('/facebook/callback', authorization.requiresNotLogin, passport.authenticate('facebook', {
	failureRedirect: '/login',
	successRedirect: "/",
}), index.getHome);

// Setting the linkedin oauth routes
router.get('/linkedin', authorization.requiresNotLogin, passport.authenticate('linkedin', {
	failureRedirect: '/login',
	scope: ['r_basicprofile', 'r_emailaddress'],
}), index.getLogin);

router.get('/linkedin/callback',  authorization.requiresNotLogin, passport.authenticate('linkedin', {
	failureRedirect: '/login',
	successRedirect: "/",	
}), index.getHome);

// Setting the github oauth routes
router.get('/github', authorization.requiresNotLogin, passport.authenticate('github', {
	failureRedirect: '/login',
	scope: "user:email",
}), index.getLogin);

router.get('/github/callback',  authorization.requiresNotLogin, passport.authenticate('github', {
	failureRedirect: '/login',
	successRedirect: "/",
}), index.getHome);


// Setting the twitter oauth routes
router.get('/twitter', authorization.requiresNotLogin, passport.authenticate('twitter', {
	failureRedirect: '/login'
}), index.getLogin);

router.get('/twitter/callback',  authorization.requiresNotLogin, passport.authenticate('twitter', {
	failureRedirect: '/login',
	successRedirect: "/",
}), index.getHome);






module.exports = router;
// router.router.get().post().put().delete();