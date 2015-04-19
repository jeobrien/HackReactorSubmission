/* For part 3 I'll show how you could use the Underscore.js library in parts of the
code to abstract some of the lower level implementation details. */

// 1. Here's textWords rewritten with _.map:
function wordsOnly(text) {
    return _.map(text.match(/[a-zA-Z\-]+/g), function(word) {
        return word.toLowerCase();
    });
}

// 2. and sortedList with _.sortBy and _.keys >> using underscore eliminates the
// need to first create an array because sortBy takes arrays as well as objects
function sortedList(wordCounts) {
    return _.sortBy(_.keys(wordCounts));
}

// 3. A new topWords with my version of _.first, specifying to take the first five. This way you avoid 
// 'hard-coding' the number 5 in.
function topWords(wordCounts) {
  var frequencies = [],
        result = [];
 	// Loop through the frequencies list (using output from wordCounts)
    for (var key in wordCounts) {
        if (wordCounts.hasOwnProperty(key)) {
          	// Add the words and their counts into an array
            frequencies.push([wordCounts[key], key]);
        }
    }
  return myFirst(frequencies.sort(), 3);
}

function myFirst(array, number) {
  if (arguments.length < 2) {
    return array[0];
  }
  else {
    return array.slice(0,number);
  }
}

// 3. topWords with my rewritten .forEach, and .filter (using forEach)

function myForEach(collection, callback) {
  if (Array.isArray(collection)) {
    for (var i = 0; i < collection.length; i++) {
      callback(collection[i]);
    }
  }
  else {
    for (var key in collection) {
      callback(collection[key], key);
    }
  }
}

function filterWithForEach (collection, predicate) {
  if (Array.isArray(collection)) {
    var newArray = [];
    myForEach(collection, function (element) {
      if (predicate(element)) {
        newArray.push(element);
      }
    });
    return newArray;
  }
  else {
    var newCollection = {}; 
    myForEach(collection, function (element, key) {
      if (predicate(element)) {
        newCollection[key] = element;
      }
    });
    return newCollection;
  }
}
