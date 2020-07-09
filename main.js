chairs = new class chairs {
    seats={};
    addagent(agent) {
        console.log(agent);
        for (var other in this.seats) {
            console.log("hi");
            this.seats[other].brain[agent.name]=0;
            agent.brain[this.seats[other].name]=0;
        }
        this.seats[agent.name]=agent;
    }
    killagent(name){
        for (var other in this.seats) {
            if (other==name) continue;
            this.seats[other].brain.delete(name);
        }
        seats.delete(name)
    }
}()

id=0;
class agent {
  brain={};
  stomach=0;
  strat=null;
  record=function(name,action) {
    this.brain[name]+=action*2-1;
  }
  name=null;
  constructor(strat) {
    if (strat!==undefined) {
        this.strat=strat;
    }
    this.name=id++;
  }
}

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
  a.record(b.name,bgo)
  b.record(b.name,bgo)
}

//chairs.addagent(new agent());
chairs.addagent(new agent(strategy.ddd));
chairs.addagent(new agent(strategy.ccc));
vs(mean, nice)
//
//
// I was just about to test the vs function with ddd and ccc, and check the brains of the objects to see if they are functioning correctly .
//
//
