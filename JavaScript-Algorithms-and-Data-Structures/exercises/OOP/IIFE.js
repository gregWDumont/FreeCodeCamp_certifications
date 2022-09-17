// This pattern is known as an immediately invoked function expression or IIFE.

(function () {
    console.log("A cozy nest is ready");
  })();

// An immediately invoked function expression (IIFE) is often used to group related functionality into a single object or module.

// BEFORE

let isCuteMixin = function(obj) {
    obj.isCute = function() {
      return true;
    };
  };
  let singMixin = function(obj) {
    obj.sing = function() {
      console.log("Singing to an awesome tune");
    };
  };

// AFTER

let funModule = (function () {
    return {
      isCuteMixin: function(obj) {
        obj.isCute = function() {
          console.log("Singing to an awesome tune");
          };
      },
      singMixin: function(obj) {
        obj.sing = function() {
          console.log("Singing to an awesome tune");
          };
      }
    }
  })();