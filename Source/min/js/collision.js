(function(){var a;a=function(){function a(a,b){this.entity=a,this.box=b}return a.prototype.leftWall=function(){return this.entity.x<this.box.x?(this.entity.x=0,!0):!1},a.prototype.rightWall=function(){return this.entity.x<this.box.x+this.box.w?(this.entity.x=this.box.x,!0):!1},a.prototype.topWall=function(){return this.entity.y<this.box.y?(this.entity.y=0,!0):!1},a.prototype.bottomWall=function(){return this.entity.y>this.box.y+this.box.h?(this.entity.y=this.box.y+this.box.h,!0):!1},a.prototype.checkWall=function(){var a;return a={left:this.leftWall(),right:this.rightWall(),top:this.topWall(),bottom:this.bottomWall()}},a}()}).call(this);