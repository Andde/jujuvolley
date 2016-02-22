var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

// Indeksi 
router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    db.Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login',  function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// Joukkueet 
router.get('/teams', function (req, res, next) {
  db.Team.findAll().then(function (teams) {
    res.render('teams', {
      title: 'Teams',
      teams: teams
    });
  });
});

// luo joukkue
router.post('/createteam', function(req, res) {
  db.Team.create({
    name: req.body.name,
	age: req.body.age
  }).then(function() {
    res.redirect('/teams');
  });
});

// poista joukkue
router.get('/teams/:team_id/destroy', function(req, res) {
  db.Team.destroy({
    where: {
      id: req.params.team_id
    }
  }).then(function() {
    res.redirect('/teams');
  });
});

// Muokkaa
router.get('/teams/:team_name/edit', function (req, res, next) {
  var teamname = req.params.team_name
db.Team.findOne({ where: {name: teamname }, include: [db.Player]}).then(function (team) {
    res.render('team', {
      title: 'Team',
      team: team
    });
  });
});


// tee tilasto joukkueelle
router.get('/teams/:team_id/makestats', function(req, res) {
  db.Team.findById(req.params.team_id, {include: [db.Player]} ).then(function(team) {
    res.render('stats', {
      title: 'Team',
      team: team
  });
});
});

// luo tilasto
router.post('/teams/:team_id/savestats', function(req, res) {
    db.MatchStat.create({
      round: req.body.round,
	  PlayerId: req.body.player,
      MatchId: req.body.matchId,
      stat: req.body.stat,
      statValue: req.body.statValue
    }).then(function() {
      res.redirect('/teams/'+req.params.team_id+'/makestats');
      });
});

// OTTELUT
router.get('/matches', function (req, res, next) {
  db.User.findAll().then( function (users) {
    db.Team.findAll().then( function (teams) {
    db.Match.findAll({include: [db.Team]}).then(function (matches) {
        res.render('matches', {
          title: 'matches',
          matches: matches,
          teams: teams,
          users: users
        });
      });
    });
  });
});

// tee tilasto joukkueelle
// hakee samalla joukkestatsit
router.get('/matches/:match_id/:team_id/makestats', function(req, res) {
  db.Match.findById(req.params.match_id, {include: [{model: db.User},{model: db.Team, include: [db.Player]}]} ).then(function(match) {
    db.MatchStat.getTeam2(req.params.match_id).then(function (tstats) {
      db.MatchStat.getTest3(req.params.match_id,req.params.team_id).then(function (stats) {
        res.render('matchstats', {
          title: 'Match',
          match: match,
          tstats: tstats,
          stats: stats
        });
      });
    });
  });
});

// luo tilasto
router.post('/matches/:match_id/:team_id/savestats', function(req, res) {
    db.MatchStat.create({
      round: req.body.round,
	  PlayerId: req.body.player,
      MatchId: req.body.matchId,
      stat: req.body.stat,
      statValue: req.body.statValue
    }).then(function() {
      res.redirect('/matches/'+req.params.match_id+'/'+req.params.team_id+'/makestats');
      });
});


// Luo ottelu
router.post('/creatematch', function(req, res) {
    db.Match.create({
      date: req.body.date,
      opponent: req.body.opponent,
	  TeamId: req.body.team,
      UserId: req.body.user
    }).then(function() {
      res.redirect('/matches');
      });
});


// Pelaajat
// haetaan myös kaikki joukkueet valintalistaan. 
router.get('/players', function (req, res, next) {
  db.Team.findAll().then( function (teams) {
    db.Player.findAll({include: [db.Team]}).then(function (players) {
      res.render('players', {
        title: 'Players',
        players: players,
        teams: teams
      });
    });
  });
});

// luo pelaaja
router.post('/createplayer', function(req, res) {
    db.Player.create({
      name: req.body.name,
	  number: req.body.number,
      TeamId: req.body.team
    }).then(function() {
      res.redirect('/players');
      });
});
// poista pelaaja
router.get('/players/:player_id/destroy', function(req, res) {
  db.Player.destroy({
    where: {
      id: req.params.player_id
    }
  }).then(function() {
    res.redirect('/players');
  });
});

// Tilastoija
router.get('/users', function (req, res, next) {
  db.User.findAll().then(function (users) {
    res.render('users', {
      title: 'users',
      users: users
    });
  });
});
// luo Tilastoija
router.post('/createuser', function(req, res) {
  db.User.create({
    name: req.body.name,
  }).then(function() {
    res.redirect('/users');
  });
});
// poista Tilastoija
router.get('/users/:user_id/destroy', function(req, res) {
  db.User.destroy({
    where: {
      id: req.params.user_id
    }
  }).then(function() {
    res.redirect('/users');
  });
});

// Tilastoija
router.get('/rotations', function (req, res, next) {
  res.render('rotations', {
    title: 'rotations',
  });
});

