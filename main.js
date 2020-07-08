chairs = new class chairs {
    seats={};
    addagent(agent) {
        for (other in this.seats) {
//            console.log(other);
            seats[other].brain[agent.name]=0;
            agent.brain[seats[other].name]=0;
        }
        this.seats[agent.name]=agent;
    }
}()

id=0;
class agent {
  brain={};
  stomach=0;
  strat=null;
  record=function(name,action) {
    brain[name]+=action*2-1;
  }
  name=null;
  constructor(strat) {
    if (strat!==undefined) {
        this.strat=strat;
    }
    this.name=id++;
  }
}

chairs.addagent(new agent());
chairs.addagent(new agent());

var strategy={};
strategy.ccc=function(mem) {
  return 1;
}
strategy.ddd=function(mem) {
  return 0;
}

payoff=[[[-1,-1],[-1,1]],[[1,-1],[1,1]]]

function vs(a,b){
  ago=a.strat(a.brain[b.name]);
  bgo=b.strat(b.brain[a.name]);
  aget=payoff[ago][bgo];
  bget=payoff[bgo][ago];
  a.stomach+=aget;
  b.stomach+=bget;
  a.record(b.id,bgo)
  b.record(b.id,bgo)
}



Kenneyon - You
