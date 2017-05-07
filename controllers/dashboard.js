const User = require('../models/User');
const github = require('../service/github');


// ======================================
// GET /dashboard
// Dashboard page.
//
exports.getDashboard = (req, res, next) => {
  User.find({role: 'applicant'}).exec()
    .then((applicants) => {
      let errorFlag = false;
      const reposPromises = applicants.map(u => {
        if (!u.github) {
          req.flash('danger', 'some users dont have their github account linked');
          errorFlag = true;
          return res.redirect('/');
        }
        const token = u.tokens.find(tkn => tkn.kind === 'github');
        return github.getRepos(token.accessToken);
      })
      if (errorFlag) return;
      Promise.all(reposPromises)
        .then((repos) => {
          res.render('dashboard',
            {
              title: 'Dashboard',
              pageName: 'userListView',
              applicants,
              repos,
            });
        }).catch(err => next(err));
    })
    .catch(err => next(err));
};

// ======================================
// GET /dashboard/:userid
// View user profile
//
exports.getUserProfile = (req, res, next) => {
  User.findOne({ _id: req.params.userid, role: 'applicant'}).exec()
    .then((user_profile) => {
      const breadcrumbs = res.locals.breadcrumbs;
      breadcrumbs[breadcrumbs.length-1].name = user_profile.email;
      res.render('userprofile',
        {
          title: `User Profile: ${user_profile.profile.first_name} ${user_profile.profile.last_name}`,
          user_profile,
          pageName: 'detailView'
        }
      )
    })
    .catch(err => next(err));
}
