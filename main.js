//WORLD
chairs = new class chairs {
  seats=new Map();
  life=null;
  death=null;
  payoff=null;
  lifetime=null
  constructor () {
    this.payoff=[[-1,1],[-1,1]];
    this.life=10000000000000000;
    this.death=-10000000000000000;
    this.lifetime=10;
  }
  addagent(agent) {
    //console.log(agent);
    for (var [seat,other] of this.seats) {
      //console.log("hi");
      other.brain[agent.name]=0;
      agent.brain[other.name]=0;
    }
    agent.brain[agent.name]=0;
    this.seats[agent.name]=agent;
  }
  killagent(name){
    for (var [seat,other] of this.seats) {
      if (seat==name)
        continue;
      other.brain.delete(name);
    }
    seats.delete(name)
  }
  vs(a,b){
    ago=a.strat(b.name);
    bgo=b.strat(a.name);
    aget=this.payoff[ago][bgo];
    bget=this.payoff[bgo][ago];
    a.stomach+=aget;
    b.stomach+=bget;
    console.log(a.stomach);
    console.log(b.stomach);
    a.record(b.name,bgo);
    b.record(a.name,ago);
  }
  lifedeath(agent) {
    if (agent.stomach<this.death*this.lifetime)
      return -1;
    if (agent.stomach>this.life*this.lifetime)
      return 1;
    return 0;
  }
  circle() {
    for (var part in this.seats) {
      var witness=lifedeath(agent);
      if (witness==0)
        continue;
      if (witness==-1) {
        this.killagent(part);
      }
      if (witness==1) {
        this.addagent(this.seats[part].strat);
      }
    }
  }
  pvp() {
    ordered=Array.from(seats);
    size=ordered.length;
    for (var i=0; i<size; i++)
      for (var j=0; j<i; j++)
        this.vs(ordered[i][1],ordered[j][1]);
  }
  everybody() {
    }
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

function vs(a,b){
  ago=a.strat(b.name);
  bgo=b.strat(a.name);
  aget=chairs.payoff[ago][bgo];
  bget=chairs.payoff[bgo][ago];
  a.stomach+=aget;
  b.stomach+=bget;
  //console.log(a.stomach);
  //console.log(b.stomach);
  a.record(b.name,bgo);
  b.record(a.name,ago);
}

//chairs.addagent(new agent());
chairs.addagent(new agent(strategy.ips));
chairs.addagent(new agent(strategy.iop));
chairs.addagent(new agent(strategy.iop));
chairs.everybody();
//ARTIFICIAL ANGEL OF DEATH I DO NOT WANT TO CREATE
//
// I was just about to test the vs function with ddd and ccc, and check the brains of the objects to see if they are functioning correctly .
//
// ddc ccd cd ccc ddd
//MAKE NIGGER DETECTOR! PLACE IN THE US
//
//make hate detector....
