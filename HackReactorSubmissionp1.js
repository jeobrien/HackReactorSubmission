/* For my submission project I want to demonstrate that I have worked on my understanding
of using functions as values and also using pre-defined functions available for the
Javascript Standard objects, and finally also using libraries like Underscore.js.

My code snippet will analyse an input text and output some information:
- a list of all the words from the passage in alphabetical order
- the word count
- the top five most frequently used words
- the vowel count

This p1 file contains the first draft, which doesn't use functional programming,
 standard built-in Object methods (bar sort), or the Underscore library. */

// I'm going to pull apart this depressing passage from Macbeth:

var text = "To-morrow, and to-morrow, and to-morrow, \
Creeps in this petty pace from day to day, \
To the last syllable of recorded time; \
And all our yesterdays have lighted fools \
The way to dusty death. Out, out, brief candle! \
Life's but a walking shadow, a poor player \
That struts and frets his hour upon the stage \
And then is heard no more. It is a tale \
Told by an idiot, full of sound and fury \
Signifying nothing.";

// 1. First, I create an array of the words minus any special characters using regex
function wordsOnly(text) {
    var words = text.match(/[a-zA-Z\-]+/g);
 
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].toLowerCase();
    }
    return words;
}

// 2. Here's another function, also using regex, to count the vowels
function vowelCount(str) { 
  var vowels = str.match(/[aeiou]/g);
  return vowels.length;
}

// 3. Then I write a function to return an object containing each word and it's count
function wordCounts(words) {
    var frequencies = {},
        currentWord = null;
    // loop through the words array, pushing each word onto the frequencies object 
    for(var i = 0; i < words.length; i++) {
        currentWord = words[i];
        frequencies[currentWord] =
          	// if it already exists, add 1, if not create the entry 
            (frequencies[currentWord] || 0) + 1;
    }
    return frequencies;
}
// 4. Next I want to sort the words in the passage alphabetically

function sortedList(wordCounts) {
    var words = [];
 	// push the keys (the words, not the count) into an array
    for (var key in wordCounts) {
        if (wordCounts.hasOwnProperty(key)) {
            words.push(key);
        }
    }
  	// The JS array prototype comes with a predefined sort method
    return words.sort();
}
// 5. Now I can use the frequencies & sorting functions to find out the top five words

function topFive(wordCounts) {
    var frequencies = [],
        result = [];
 	// Loop through the frequencies list (using output from wordCounts)
    for (var key in wordCounts) {
        if (wordCounts.hasOwnProperty(key)) {
          	// Add the words and their counts into an array
            frequencies.push([key, wordCounts[key]]);
        }
    }
 	// Sort the frequencies array, using the optional predefined sort function parameter
    frequencies = frequencies.sort(function(freq1, freq2) {
      	// Return 1 if freq1 occurs less, -1 if more, or 0 if equal count
        return (freq1[1] < freq2[1]) ? 1 : (freq1[1] > freq2[1] ? - 1 : 0);
    });
 	// push the first five from frequencies into an array of results
    for (var i = 0; i < 5; i++) {
        result[i] = frequencies[i];
    }
    return result;
}

// 6. Lastly, this analyse text function outputs the list, the count, the top five words. 
function textAnalyser(text) {
    var words = wordsOnly(text),
    	vowels = vowelCount(text),
        frequencies = wordCounts(words),
        used = sortedList(frequencies),
        top5 = topFive(frequencies);
 
    console.log("Word count = ", words.length);
    console.log("Vowel count = ", vowels);
    console.log("List of used words = ", used);
    console.log("Top 5 most used words = ", top5);
}
 
console.log(textAnalyser(text));
