function GravityZeroPotential(){
    this.gravConst = 1;
    this.staticPot = function(position){
        return 0; 
    }
    this.potential = function(balls, position){
        var pot = this.staticPot(position);
        for (var i = 0; i < balls.length; ++i){
            // Calculate the distance
            var dist = calcXZDist(balls[i].position, position) 
            // Clamp the dist at some value
            dist = Math.max(0.2, dist);
            pot -= balls[i].mass/dist;
        }
        return this.gravConst*pot;
    }
}
function AtomZeroPotential(){
    this.atomConst = 1;
    this.pushConst = 10.0;
    this.staticPot = function(position){
        var Ux = Math.max(0,(Math.abs(position.x)-240))*10;
        var Uz = Math.max(0,(Math.abs(position.z)-240))*10;
        return Ux + Uz; 
    }
    this.potential = function(balls, position){
        var pot = this.staticPot(position);
        for (var i = 0; i < balls.length; ++i){
            // Calculate the distance
            var dist = calcXZDist(balls[i].position, position) 
            // Clamp the dist at some value
            dist = Math.max(0.2, dist);
            pot += -balls[i].mass/dist + this.pushConst*balls[i].mass/dist/dist;
        }
        return this.atomConst*pot;
    }
}
function SinPotential(){
    this.atomConst = 150;
    this.pushConst = 10.0;
    this.staticPot = function(position){
        return 0; 
    }
    this.potential = function(balls, position){
        var pot = this.staticPot(position);
        pot += Math.sin(position.x/20+position.t*2);//Math.sin(position.x/50)*Math.sin(position.t);
        return this.atomConst*pot;
    }
}
// HELPER Functions
function calcXZDist(position1, position2){
    var xdist = (position1.x-position2.x);
    var zdist = (position1.z-position2.z);
    var dist2 = xdist*xdist + zdist*zdist;
    var dist = Math.sqrt(dist2)
    return dist;
}
