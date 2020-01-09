const data = {
  carSpeed: 5,
  backgroundCarSpeed:3,
  lineSpeed:5
}

const Car = function (selector) {
  this.el = $(selector);
  this.ableToMove = {
    left: true,
    right: true,
    up: true,
    down: true
  }
}

Car.prototype.moveLeft = function () {
  this.el.css('left', `-=${data.carSpeed}`);
  this.ableToMove.left = requestAnimationFrame(this.moveLeft.bind(this));

}

Car.prototype.stopLeft = function () {
  cancelAnimationFrame(this.ableToMove.left);
  this.ableToMove.left = true;
}

Car.prototype.moveRight = function () {
  this.el.css('left', `+=${data.carSpeed}`);
  this.ableToMove.right = requestAnimationFrame(this.moveRight.bind(this));
}

Car.prototype.stopRight = function () {
  cancelAnimationFrame(this.ableToMove.right);
  this.ableToMove.right = true;
}

Car.prototype.moveUp = function () {
  this.el.css('top', `-=${data.carSpeed}`);
  this.ableToMove.up = requestAnimationFrame(this.moveUp.bind(this));
}

Car.prototype.stopUp = function () {
  cancelAnimationFrame(this.ableToMove.up);
  this.ableToMove.up = true;
}

Car.prototype.moveDown = function () {
  this.el.css('top', `+=${data.carSpeed}`);
  this.ableToMove.down = requestAnimationFrame(this.moveDown.bind(this));
}

Car.prototype.stopDown = function () {
  cancelAnimationFrame(this.ableToMove.down);
  this.ableToMove.down = true;
}


const car = new Car('#car');
const car2 = new Car('#car2');

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






