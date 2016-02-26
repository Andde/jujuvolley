// Example model


module.exports = function (sequelize, DataTypes) {
  var MatchStat = sequelize.define('MatchStat', {
    round: DataTypes.ENUM('1','2','3','4','5'),
    stat: DataTypes.ENUM('pass','serve','block','attack'),
    statValue: DataTypes.ENUM('1','2','3','4') 
  }, {
    classMethods: {
      associate: function (models) {
        MatchStat.belongsTo(models.Player);
        MatchStat.belongsTo(models.Match);
      },
      getPlayerStats: function(id,pid) {
          return MatchStat.findAll({
            where: {
                MatchId: id,
                PlayerId: pid
            },  
            attributes: [
              [sequelize.fn('COUNT', sequelize.col('id')),'luku'],'PlayerId','round','stat','statValue',],
            group: ['stat','statValue','round','PlayerId']
          });
      },
      getTeamStats: function  (id) {
          return MatchStat.findAll({
            where: {
                MatchId: id
            },  
            attributes: [
              [sequelize.fn('COUNT', sequelize.col('id')), 'luku'],'round','stat','statValue'],
            group: ['stat','statValue','round']
          });
      },
      getTest2: function (mid,pid) {
          return sequelize.query("select distinct count(p.id) as sum,p.id, m.stat, m.statValue from Players p left outer join MatchStats m on m.PlayerId=p.id where m.MatchId= :mid   and m.PlayerId= :pid group by  p.id, p.name, m.stat, m.statValue",{raw: true, type: sequelize.QueryTypes.SELECT,  replacements:{ mid: mid, pid: pid}})
      },
      getTeam2: function (mid) {
          return sequelize.query("select ifnull(round((b.passGoodCount||'.00'/a.passTotalCount*100),2),0) as passEff,ifnull(round((c.passExcCount||'.00'/a.passTotalCount*100),2),0) as passExtEff,ifnull(round((f.attackExcCount||'.00'/d.attackTotalCount*100),2),0) as attackEff,ifnull(a.passTotalCount,0) as passTotal,ifnull(b.passGoodCount,0) as passGood,ifnull(c.passExcCount,0) as passExc,ifnull(d.attackTotalCount,0) as attackTotal,ifnull(e.attackErrCount,0) as attackErr,ifnull(f.attackExcCount,0) as attackExc,ifnull(g.bloCount,0) as blockTot,ifnull(h.serveErrorCount,0) as serveErr,ifnull(i.serveAceCount,0) as serveAce,ifnull(j.serveTotalCount,0) as serveTotal,ifnull(k.passErrCount,0) as passErr from (select count(1) as passTotalCount from MatchStats where MatchId= :mid  and round=1  and stat='pass'  ) a, (select count(1) as passGoodCount from MatchStats where MatchId= :mid  and round=1  and stat='pass'  and statValue in ('1','2')    ) b ,(select count(1) as passExcCount from MatchStats where MatchId= :mid  and round=1  and stat='pass'  and statValue in ('1')  ) c,(select count(1) as passErrCount from MatchStats where MatchId= :mid  and round=1  and stat='pass'  and statValue in ('4')  ) k,   (select count(1) as attackTotalCount from MatchStats where MatchId= :mid  and round=1  and stat='attack'  ) d, (select count(1) as attackErrCount from MatchStats where MatchId= :mid  and round=1  and stat='attack'  and statValue in ('3')  )  e ,(select count(1) as bloCount from MatchStats where MatchId= :mid  and round=1  and stat='block'  and statValue in ('1')  ) g ,(select count(1) as attackExcCount from MatchStats where MatchId= :mid  and round=1  and stat='attack'  and statValue in ('1')  ) f,(select count(1) as serveErrorCount from MatchStats where MatchId= :mid  and round=1  and stat='serve'  and statValue in ('4')  ) h,(select count(1) as serveAceCount from MatchStats where MatchId= :mid  and round=1  and stat='serve'  and statValue in ('1')) i,(select count(1) as serveTotalCount from MatchStats where MatchId= :mid  and round=1  and stat='serve'  and statValue in ('1','2','3','4')) j",{raw: true, type: sequelize.QueryTypes.SELECT,  replacements:{ mid: mid}})
      },
      getTest3: function (mid,tid) {
          return sequelize.query("select p.id,p.name,ifnull(round((b.passGoodCount||'.00'/a.passTotalCount*100),2),0) as passEff,ifnull(round((c.passExcCount||'.00'/a.passTotalCount*100),2),0) as passExtEff,ifnull(round((f.attackExcCount||'.00'/d.attackTotalCount*100),2),0) as attackEff,ifnull(a.passTotalCount,0) as passTotal,ifnull(b.passGoodCount,0) as passGood,ifnull(c.passExcCount,0) as passExc,ifnull(d.attackTotalCount,0) as attackTotal,ifnull(e.attackErrCount,0) as attackErr,ifnull(f.attackExcCount,0) as attackExc,ifnull(g.bloCount,0) as blockTot,ifnull(h.serveErrorCount,0) as serveErr,ifnull(i.serveAceCount,0) as serveAce,ifnull(j.serveTotalCount,0) as serveTotal,ifnull(k.passErrCount,0) as passErr from Teams t, Players p left outer join (select count(1) as passTotalCount,PlayerId from MatchStats where MatchId = :mid and round=1 and stat='pass' group by PlayerId) a on p.id = a.PlayerId left outer join (select count(1) as passGoodCount,PlayerId from MatchStats where MatchId = :mid and round=1  and stat='pass' and statValue in ('1','2')   group by PlayerId ) b on b.PlayerId=p.id left outer join (select count(1) as passExcCount,PlayerId from MatchStats where MatchId = :mid and round=1  and stat='pass'  and statValue in ('1') group by PlayerId) c on p.id = c.PlayerId left outer join (select count(1) as passErrCount,PlayerId from MatchStats  where MatchId = :mid  and round=1  and stat='pass'  and statValue in ('4') group by PlayerId ) k on p.id = k.PlayerId  left outer join (select count(1) as attackTotalCount,PlayerId from MatchStats where MatchId = :mid  and round=1  and stat='attack'  group by PlayerId) d on p.id = d.PlayerId left outer join (select count(1) as attackErrCount,PlayerId from MatchStats where MatchId = :mid  and round=1  and stat='attack' and statValue in ('3') group by PlayerId )  e on p.id = e.PlayerId left outer join (select count(1) as bloCount,PlayerId from MatchStats where MatchId = :mid  and round=1  and stat='block' and statValue in ('1') group by PlayerId ) g on p.id = g.PlayerId left outer join (select count(1) as attackExcCount,PlayerId from MatchStats where MatchId = :mid  and round=1  and stat='attack' and statValue in ('1') group by PlayerId  ) f on p.id = f.PlayerId left outer join (select count(1) as serveErrorCount,PlayerId from MatchStats where MatchId = :mid  and round=1  and stat='serve' and statValue in ('4') group by PlayerId ) h on p.id = h.PlayerId left outer join (select count(1) as serveAceCount,PlayerId from MatchStats where MatchId = :mid and round=1  and stat='serve' and statValue in ('1') group by PlayerId) i on p.id = i.PlayerId left outer join (select count(1) as serveTotalCount,PlayerId from MatchStats  where MatchId = :mid  and round=1 and stat='serve' and statValue in ('1','2','3','4') group by PlayerId) j on p.id = j.PlayerId where t.id=p.TeamId and t.id= :tid group by p.id",{raw: true, type: sequelize.QueryTypes.SELECT,  replacements:{ mid: mid, tid: tid}})      }
    }
  });

  return MatchStat;
};

