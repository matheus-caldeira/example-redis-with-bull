import {Router} from 'express';
import session from 'express-session';
import passport from 'passport'
import {Strategy} from 'passport-local'
import {ensureLoggedIn} from 'connect-ensure-login'

import {all, orders} from './queue';

const router = Router();

const LocalStrategy = new Strategy(function (username, password, cb) {
    if (username === 'bull' && password === 'bull') {
      return cb(null, { user: 'bull-board' })
    }
    return cb(null, false)
  });

passport.use(LocalStrategy)

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((user, cb) => {
  let us = user as null | any;
  cb(null, us)
})

router.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }))

router.use(passport.initialize())
router.use(passport.session())

router.get('/', (req, res) => {
  res.render('auth')
})

router.post(
  '/',
  passport.authenticate(LocalStrategy, {
    failureRedirect: '/dashboard',
    successReturnToOrRedirect: '/dashboard/all'
  })
)

router.use('/all', ensureLoggedIn({ redirectTo: '/dashboard' }), all.router)
router.use('/orders', ensureLoggedIn({ redirectTo: '/dashboard' }), orders.router)

export default router;
