class obstacle {

    constructor(x,y,w,h,grp) {
        this.obstacle = new Sprite(x,y,w,h);
        grp.add(this.obstacle);
    }

    movement(speed, gravity, movement) {
        this.obstacle.velocity.x = -(speed);
        this.obstacle.velocity.y = gravity;
        this.obstacle.collider = movement;
    }
}