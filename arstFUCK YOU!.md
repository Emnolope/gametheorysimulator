//WORLD
chairs = new class chairs {
  seats={};
  addagent(agent) {
    //console.log(agent);
    for (var other in this.seats) {
      //console.log("hi");
      this.seats[other].brain[agent.name]=0;
      agent.brain[this.seats[other].name]=0;
    }
    agent.brain[agent.name]=0;
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
  record=null;
  name=null;
  constructor(strat) {
    if (strat!==undefined) {
      this.record=strat.think;
      this.strat=strat.act;
    }
    this.name=id++;
  }
}

var strategy={};
//nice
strategy.ccc={
  think:function(name,action) {
    this.brain[name]+=action*2-1;
  },
  act:function(name) {
    return 1;
  }
}
//mean
strategy.ddd={
  think:function(name,action) {
  },
  act:function(name) {
    return 0;
  }
}
//tit 4 tat/copycat
strategy.t4t={
  think:function(name,action) {
    this.brain[name]=1-action;
  },
  act:function(name) {
    return 1-this.brain[name];
  }
}
//cynical tit 4 tat
strategy.t3t={
  think:function(name,action) {
    this.brain[name]=action;
  },
  act:function(name) {
    return this.brain[name];
  }
}
//spiteful/grudger
strategy.spg={
  think:function(name,action) {
    if (action==0)
      this.brain[name]=-1;
  },
  act:function(name) {
    return 1+this.brain[name];
  }
}
//integral of coop
strategy.iop={
  think:function(name,action) {
    this.brain[name]+=action*2-1;
  },
  act:function(name) {
    return (this.brain[name]>=0)?1:0
  }
}
//integral of bad
strategy.ips={
  think:function(name,action) {
    this.brain[name]+=action*2-1;
  },
  act:function(name) {
    return (this.brain[name]>0)?1:0
  }
}
strategy.ccd={
  think:function(name,action) {
    this.brain[this.name]+=1;
  },
  act:function(name) {
    return parseInt(1-(this.brain[this.name]%3)/2);
  }
}
strategy.cdd={
  think:function(name,action) {
    this.brain[this.name]+=1;
  },
  act:function(name) {
    return Math.max(2-this.brain[this.name],1);
  }
}
strategy.cnd={
  think:function(name,action) {
    this.brain[this.name]+=1;
  },
  act:function(name) {
    return Math.max(1-this.brain[this.name]%3,0);
  }
}
strategy.ran={
  think:function(name,action) {
  },
  act:function(name){
     return parseInt(Math.random()+0.5);
  }
}
strategy.ppt={
  think:function(name,action) {
    //I care for not what happens to me in this carnal world.
  },
  act:function(name) {
    return Number(prompt("Huh??!"));
  }
}

payoff=[[-1,1],[-1,1]]

function vs(a,b){
  ago=a.strat(b.name);
  bgo=b.strat(a.name);
  console.log(ago);
  console.log(bgo);
  aget=payoff[ago][bgo];
  bget=payoff[bgo][ago];
  a.stomach+=aget;
  b.stomach+=bget;
  a.record(b.name,bgo);
  b.record(a.name,ago);
}

//chairs.addagent(new agent());
chairs.addagent(new agent(strategy.ips));
chairs.addagent(new agent(strategy.ppt));
vs(chairs.seats[0],chairs.seats[1]);
//
// I was just about to test the vs function with ddd and ccc, and check the brains of the objects to see if they are functioning correctly .
//
// ddc ccd cd ccc ddd

![](https://i.imgur.com/gOGi2hY.png)
