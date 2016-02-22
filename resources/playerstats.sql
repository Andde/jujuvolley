
select p.name,a.PlayerId ,ifnull(round((b.passGoodCount||'.00'/a.passTotalCount*100),2),0) as passEff,ifnull(round((c.passExcCount||'.00'/a.passTotalCount*100),2),0) as passExtEff,ifnull(round((f.attackExcCount||'.00'/d.attackTotalCount*100),2),0) as attackEff,ifnull(a.passTotalCount,0) as passTotal,ifnull(b.passGoodCount,0) as passGood,ifnull(c.passExcCount,0) as passExc,ifnull(d.attackTotalCount,0) as attackTotal,ifnull(e.attackErrCount,0) as attackErr,ifnull(f.attackExcCount,0) as attackExc,ifnull(g.bloCount,0) as blockTot,ifnull(h.serveErrorCount,0) as serveErr,ifnull(i.serveAceCount,0) as serveAce,ifnull(j.serveTotalCount,0) as serveTotal from (select count(1) as passTotalCount,PlayerId from MatchStats where MatchId= :mid  and PlayerId= :pid  and round=1  and stat='pass') a, (select count(1) as passGoodCount,PlayerId from MatchStats where MatchId= :mid  and PlayerId= :pid  and round=1  and stat='pass'  and statValue in ('1','2')) b ,(select count(1) as passExcCount,PlayerId from MatchStats where MatchId= :mid  and PlayerId= :pid  and round=1  and stat='pass'  and statValue in ('1')) c,(select count(1) as attackTotalCount,PlayerId from MatchStats where MatchId= :mid  and PlayerId= :pid  and round=1  and stat='attack') d, (select count(1) as attackErrCount,PlayerId from MatchStats where MatchId= :mid  and PlayerId= :pid  and round=1  and stat='attack'  and statValue in ('3'))  e ,(select count(1) as bloCount,PlayerId from MatchStats where MatchId= :mid  and PlayerId= :pid  and round=1  and stat='block'  and statValue in ('1')) g ,(select count(1) as attackExcCount,PlayerId from MatchStats where MatchId= :mid  and PlayerId= :pid  and round=1  and stat='attack'  and statValue in ('1')) f,(select count(1) as serveErrorCount,PlayerId from MatchStats where MatchId= :mid  and PlayerId= :pid  and round=1  and stat='serve'  and statValue in ('4')) h,(select count(1) as serveAceCount,PlayerId from MatchStats where MatchId= :mid  and PlayerId= :pid  and round=1  and stat='serve'  and statValue in ('1')) i,(select count(1) as serveTotalCount,PlayerId from MatchStats where MatchId= :mid  and PlayerId= :pid  and round=1  and stat='serve'  and statValue in ('1','2','3','4')) j, Players p  where a.PlayerId = p.id
;

//Hae pelajaan tilastot 

select * from playerStats_view where MatchId= :mid and PlayerId = :pid

create view playerStats_view as
select 
  distinct count(p.id) as sum
  ,p.id as PlayerId
  , p.name as PlayerName
  , m.stat as statAction
  , m.statValue
  , m.MatchId
  , s.sum as statTotal
from    (select 
    distinct count(p.id) as sum, m.stat,m.MatchId,m.PlayerId
    from Players p 
    left outer join MatchStats m on m.PlayerId=p.id 
    group by  p.id, p.name, m.stat, m.MatchId
    )  s,
Players p 
left outer join MatchStats m on m.PlayerId=p.id 
where p.id = s.PlayerId and s.PlayerId=m.PlayerId 
and s.stat = m.stat and s.MatchId = m.MatchId
group by  p.id, p.name, m.stat, m.statValue, m.MatchId
;

select ifnull(round((b.passGoodCount||'.00'/a.passTotalCount*100),2),0) as passEff,ifnull(round((c.passExcCount||'.00'/a.passTotalCount*100),2),0) as passExtEff,ifnull(round((f.attackExcCount||'.00'/d.attackTotalCount*100),2),0) as attackEff,ifnull(a.passTotalCount,0) as passTotal,ifnull(b.passGoodCount,0) as passGood,ifnull(c.passExcCount,0) as passExc,ifnull(d.attackTotalCount,0) as attackTotal,ifnull(e.attackErrCount,0) as attackErr,ifnull(f.attackExcCount,0) as attackExc,ifnull(g.bloCount,0) as blockTot,ifnull(h.serveErrorCount,0) as serveErr,ifnull(i.serveAceCount,0) as serveAce,ifnull(j.serveTotalCount,0) as serveTotal,ifnull(k.passErrCount,0) as passErr from (select count(1) as passTotalCountfrom MatchStats where MatchId= :mid  and round=1  and stat='pass'  ) a, (select count(1) as passGoodCount from MatchStats where MatchId= :mid  and round=1  and stat='pass'  and statValue in ('1','2')    ) b ,(select count(1) as passExcCount from MatchStats where MatchId= :mid  and round=1  and stat='pass'  and statValue in ('1')  ) c,(select count(1) as passErrCount from MatchStats where MatchId= :mid  and round=1  and stat='pass'  and statValue in ('4')  ) k,   (select count(1) as attackTotalCount from MatchStats where MatchId= :mid  and round=1  and stat='attack'  ) d, (select count(1) as attackErrCount from MatchStats where MatchId= :mid  and round=1  and stat='attack'  and statValue in ('3')  )  e ,(select count(1) as bloCount from MatchStats where MatchId= :mid  and round=1  and stat='block'  and statValue in ('1')  ) g ,(select count(1) as attackExcCount from MatchStats where MatchId= :mid  and round=1  and stat='attack'  and statValue in ('1')  ) f,(select count(1) as serveErrorCount from MatchStats where MatchId= :mid  and round=1  and stat='serve'  and statValue in ('4')  ) h,(select count(1) as serveAceCount from MatchStats where MatchId= :mid  and round=1  and stat='serve'  and statValue in ('1')) i,(select count(1) as serveTotalCount from MatchStats where MatchId= :mid  and round=1  and stat='serve'  and statValue in ('1','2','3','4') j
;

select p.id,p.name 
from Players p
;

select p.is
,p.name
,ifnull(round((b.passGoodCount||'.00'/a.passTotalCount*100),2),0) as passEff
,ifnull(round((c.passExcCount||'.00'/a.passTotalCount*100),2),0) as passExtEff
,ifnull(round((f.attackExcCount||'.00'/d.attackTotalCount*100),2),0) as attackEff
,ifnull(a.passTotalCount,0) as passTotal
,ifnull(b.passGoodCount,0) as passGood
,ifnull(c.passExcCount,0) as passExc
,ifnull(d.attackTotalCount,0) as attackTotal
,ifnull(e.attackErrCount,0) as attackErr
,ifnull(f.attackExcCount,0) as attackExc
,ifnull(g.bloCount,0) as blockTot
,ifnull(h.serveErrorCount,0) as serveErr
,ifnull(i.serveAceCount,0) as serveAce
,ifnull(j.serveTotalCount,0) as serveTotal
,ifnull(k.passErrCount,0) as passErr
from Players p 
left outer join (select count(1) as passTotalCount,PlayerId from MatchStats where MatchId= 2 and round=1 and stat='pass' and PlayerId=3) a on p.id = a.PlayerId
left outer join (select count(1) as passGoodCount,PlayerId from MatchStats where MatchId= 2 and round=1  and stat='pass' and PlayerId=3  and statValue in ('1','2')    ) b on b.PlayerId=p.id
left outer join (select count(1) as passExcCount,PlayerId from MatchStats where MatchId= 2 and round=1  and stat='pass' and PlayerId=3  and statValue in ('1') ) c on p.id = c.PlayerId
left outer join (select count(1) as passErrCount,PlayerId from MatchStats  where MatchId= 2  and round=1  and stat='pass' and PlayerId=3  and statValue in ('4')  ) k on p.id = k.PlayerId  
left outer join (select count(1) as attackTotalCount,PlayerId from MatchStats where MatchId= 2  and round=1  and stat='attack' and PlayerId=3  ) d on p.id = d.PlayerId 
left outer join (select count(1) as attackErrCount,PlayerId from MatchStats where MatchId= 2  and round=1  and stat='attack' and PlayerId=3  and statValue in ('3')  )  e on p.id = e.PlayerId 
left outer join (select count(1) as bloCount,PlayerId from MatchStats where MatchId= 2  and round=1  and stat='block' and PlayerId=3  and statValue in ('1')  ) g on p.id = g.PlayerId 
left outer join (select count(1) as attackExcCount,PlayerId from MatchStats where MatchId= 2  and round=1  and stat='attack' and PlayerId=3  and statValue in ('1')  ) f on p.id = f.PlayerId 
left outer join (select count(1) as serveErrorCount,PlayerId from MatchStats where MatchId= 2  and round=1  and stat='serve' and PlayerId=3  and statValue in ('4')  ) h on p.id = h.PlayerId 
left outer join (select count(1) as serveAceCount,PlayerId from MatchStats where MatchId= 2 and round=1  and stat='serve' and PlayerId=3  and statValue in ('1')) i on p.id = i.PlayerId 
left outer join (select count(1) as serveTotalCount,PlayerId from MatchStats  where MatchId= 2  and round=1 and stat='serve' and PlayerId=3  and statValue in ('1','2','3','4')) j on p.id = j.PlayerId 
where p.id= 3
;


