const data = {
  carSpeed: 5,
  backgroundCarSpeed:3,
  lineSpeed:5
}

const Car = function (selector, container) {
  this.el = $(selector);
  this.container = $(container);

  this.ableToMove = {
    left: true,
    right: true,
    up: true,
    down: true
  }
}

Car.prototype.moveLeft = function () {
  if (parseInt(this.el.css('left')) > 10) {
    this.el.css('left', `-=${data.carSpeed}`);
    this.ableToMove.left = requestAnimationFrame(this.moveLeft.bind(this));
  }
}

Car.prototype.stopLeft = function () {
  cancelAnimationFrame(this.ableToMove.left);
  this.ableToMove.left = true;
}

Car.prototype.moveRight = function () {
  if (parseInt(this.el.css('left')) < this.container.width() - this.el.width() - 10) {
    this.el.css('left', `+=${data.carSpeed}`);
    this.ableToMove.right = requestAnimationFrame(this.moveRight.bind(this));
  }
}

Car.prototype.stopRight = function () {
  cancelAnimationFrame(this.ableToMove.right);
  this.ableToMove.right = true;
}

Car.prototype.moveUp = function () {
  if (parseInt(this.el.css('top')) > 10) {
    this.el.css('top', `-=${data.carSpeed}`);
    this.ableToMove.up = requestAnimationFrame(this.moveUp.bind(this));
  }
}

Car.prototype.stopUp = function () {
  cancelAnimationFrame(this.ableToMove.up);
  this.ableToMove.up = true;
}

Car.prototype.moveDown = function () {
  if (parseInt(this.el.css('top')) < this.container.height() - this.el.height() - 10) {
    this.el.css('top', `+=${data.carSpeed}`);
    this.ableToMove.down = requestAnimationFrame(this.moveDown.bind(this));
  }
}

Car.prototype.stopDown = function () {
  cancelAnimationFrame(this.ableToMove.down);
  this.ableToMove.down = true;
}


const car = new Car('#car-1', '#container');
const car2 = new Car('#car-2','#container');



$(document).on('keydown', function (e) {
  if (e.keyCode === 37 && car.ableToMove.left === true) {
    car.moveLeft();
  } else if (e.keyCode === 39 && car.ableToMove.right === true) {
    car.moveRight();
  } else if (e.keyCode === 38 && car.ableToMove.up === true) {
    car.moveUp();
  } else if (e.keyCode === 40 && car.ableToMove.down === true) {
    car.moveDown();
  } else if (e.keyCode === 65 && car2.ableToMove.left === true) {
    car2.moveLeft();
  } else if (e.keyCode === 68 && car2.ableToMove.right === true) {
    car2.moveRight();
  } else if (e.keyCode === 87 && car2.ableToMove.up === true) {
    car2.moveUp();
  } else if (e.keyCode === 83 && car2.ableToMove.down === true) {
    car2.moveDown();
  }
});

$(document).on('keyup', function (e) {
  if (e.keyCode === 37) {
    car.stopLeft();
  } else if (e.keyCode === 39) {
    car.stopRight();
  } else if (e.keyCode === 38) {
    car.stopUp();
  } else if (e.keyCode === 40) {
    car.stopDown();
  } else if (e.keyCode === 65) {
    car2.stopLeft();
  } else if (e.keyCode === 68) {
    car2.stopRight();
  } else if (e.keyCode === 87) {
    car2.stopUp();
  } else if (e.keyCode === 83) {
    car2.stopDown();
  }

});

//Animate background cars
 requestAnimationFrame(backgroundMotion);

    function backgroundMotion() {
      $('.bg-cars').children().each(function(){
        animateCars($(this));
      })
      $('.lines').children().each(function(){
        animateLine($(this));
      })   
      requestAnimationFrame(backgroundMotion);    
    }

//move cars down
function animateCars(carSelector) {
  var carTopPosition = parseInt($(carSelector).css('top'));

  if (carTopPosition > (parseInt($('#container').height()))) {
    $(carSelector).css('top', -200);
      var leftPosition = parseInt(Math.random() * (parseInt($('#container').width()) - parseInt($(carSelector).width())));
      $(carSelector).css('left', leftPosition);
  }
  else{
    $(carSelector).css('top', carTopPosition+data.backgroundCarSpeed);
  }
}

//move line down
function animateLine(lineSelector) {
  var lineTopPosition = parseInt($(lineSelector).css('top'));
  if (lineTopPosition > (parseInt($('#container').height()))) {
    $(lineSelector).css('top', -200);
  }
  else{

    $(lineSelector).css('top', lineTopPosition + data.lineSpeed);
  }
}








/***************** Collision - Amr *******************/

// The function takes two jQuery objects as arguments
// up till now if there is a collision it will output in the console
function collisionHappened(obj1, obj2) {
  let didCollide = false;

  let l1 = parseInt(obj1.css('left'));
  let r1 = parseInt(obj1.css('left')) + parseInt(obj1.css('width'));
  let t1 = parseInt(obj1.css('top'));
  let b1 = parseInt(obj1.css('top')) + parseInt(obj1.css('height'));

  let l2 = parseInt(obj2.css('left'));
  let r2 = parseInt(obj2.css('left')) + parseInt(obj2.css('width'));
  let t2 = parseInt(obj2.css('top'));
  let b2 = parseInt(obj2.css('top')) + parseInt(obj2.css('height'));

  // top-right corner of the car
  if (r1 >= l2 && r1 <= r2 && t1 >= t2 && t1 <= b2)
    didCollide = true;
  // top-left corner of the car
  if (l1 >= l2 && l1 <= r2 && t1 >= t2 && t1 <= b2)
    didCollide = true;
  // bottom-right corner of the car
  if (r1 >= l2 && r1 <= r2 && b1 >= t2 && b1 <= b2)
    didCollide = true;
  // bottom-left corner of the car
  if (l1 >= l2 && l1 <= r2 && b1 >= t2 && b1 <= b2)
    didCollide = true;

  return didCollide;
}
