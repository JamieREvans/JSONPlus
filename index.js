function nestedString(object, key) {
  // just return the object if the key is empty; probably came from array of strings
  if (key.length > 0) {
    var keys = key.split('.');
    while (keys.length > 0) {
      // remove the key from the array for any recursive calls
      var firstKey = keys.shift();
      object = object[firstKey];
      if (!object) return undefined;
      // grab all matching values from array
      if (object.constructor === Array) {
        var stringArray = [];
        for (var index in object) {
          var singleObject = object[index];
          // recursively get nested strings from the array
          var value = nestedString(singleObject, keys.join('.'));
          if (value) {
            stringArray.push(value);
          }
        }
        return stringArray.join(' ');
      }
    }
  }
  return object;
}

function copy(object) {
  return JSON.parse(JSON.stringify(object));
}

module.exports.nestedString = nestedString;
module.exports.copy = copy;
