const sum = function() {
  let result = 0;
  for (i = 0; i < arguments.length; i++) {
    result += arguments[i];
  };

  return result;
}

sum(1, 2, 3, 4) === 10;
sum(1, 2, 3, 4, 5) === 15;

const sum = function (...args) {
  let result = 0;
  for (i = 0; i < args.length; i++) {
    result += args[i];
  };

  return result;
}