/* This second file rewrites the wordCounts and topFive functions using
some of the Javascript Standard Object methods. */


// 1. wordCounts rewritten with the .forEach method, and I have written out 
// my version of forEach as well

// 1.1 My version of forEach
function myForEach(collection, callback) {
  if (Array.isArray(collection)) {
    for (var i = 0; i < collection.length; i++) {
      callback(collection[i]);
    }
  }
  else {
    for (var key in collection) {
      callback(collection[key]);
    }
  }
}
// 1.2 wordCounts using my version of forEach
function wordCounts(words) {
  var frequencies = {};
  myForEach(words, function (word) {
    frequencies[word] = (frequencies[word] || 0) + 1;
  });
  return frequencies;
}

// 1.3 wordCounts using the standard forEach
function wordCounts(words) {
  var frequencies = {};
  
  words.forEach(function (word) {
    frequencies[word] = (frequencies[word] || 0) + 1;
  });
  return frequencies;
}



// 2. wordCounts rewritten with .reduce, and again I have written out
// my version of reduce as well.

// 2.1 My version of reduce using my version of forEach
function myReduce(array,callback,initialValue){
  if (arguments.length < 3) {
    sum = array[0];
  }
  else {
    sum = initialValue;
  }
  myForEach(array, function (element) {
    sum = callback(sum, element);
  });
  return sum;
}

// 2.2 wordCounts using my version of reduce
function wordCounts(words) {
  return myReduce(words, function (frequencies, word) {
    frequencies[word] = (frequencies[word] || 0) + 1;
    return frequencies;
  }, {});
}

// 2.3 wordCounts using the standard reduce
function wordCounts(words) {
  return words.reduce(function(frequencies, word) {
    frequencies[word] = (frequencies[word] || 0) + 1;
    return frequencies;
  }, {});
}

// 3. topFive could be rewritten using .keys and .map
// I also have rewritten a version of map to show how it works

// 3.1 My version of map using my forEach as well
function myMap(collection, callback) {
  if (Array.isArray(collection)) {
    var newArray = [];
    for (var i = 0; i < collection.length; i++) {
      newArray.push(callback(collection[i]));
    }
    return newArray;
  }
  else {
    var newList = {};
    for (var key in collection) {
      newList[key] = callback(collection[key]);
    }
    return newList;
  }
}

// 3.2 Here is the object loop in topFive using keys and myMap
var frequencies = myMap(Object.keys(wordCounts), function (key) {
return [key, wordCounts[key]];
});

console.log(frequencies);

