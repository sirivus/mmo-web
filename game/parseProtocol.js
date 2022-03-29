function parseProtocol(url) {
  const parsedURL = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(url);
  /*
  const parsedURL = 
/^(\w+) (https)    
\:\/\/ (://) 

([^\/]+)(developer.mozilla.org) 
\/(.*)$/ (en-US/docs/Web/JavaScript)

  https://developer.mozilla.org/en-US/docs/Web/JavaScript
  'https',
  'developer.mozilla.org',
  'en-US/docs/Web/JavaScript',

  .exec(url); //(method) RegExp.exec(string: string): RegExpExecArray
Executes a search on a string using a regular expression pattern, and returns an array containing the results of that search.

@param string — The String object or string literal on which to perform the search.
  */
  if (!parsedURL) {
    return false;
  }
  console.log(parsedURL);
  // ["https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  // "https", "developer.mozilla.org", "en-US/docs/Web/JavaScript"]

  const [, protocol, fullhost, fullpath] = parsedURL;
  return protocol;
}

console.log(
  parseProtocol("https://developer.mozilla.org/en-US/docs/Web/JavaScript")
);
// "https"


//``///////////

////
/*
lhs-MacBook-Pro:webpack-demo lh$ node ../learning.js
[
  'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  'https',
  'developer.mozilla.org',
  'en-US/docs/Web/JavaScript',
  index: 0,
  input: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  groups: undefined
]
https

// from webdev tools

Array(4) [ "https://developer.mozilla.org/en-US/docs/Web/JavaScript", "https", "developer.mozilla.org", "en-US/docs/Web/JavaScript" ]
​
0: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
​
1: "https"
​
2: "developer.mozilla.org"
​
3: "en-US/docs/Web/JavaScript"
​
groups: undefined
​
index: 0
​
input: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
​
length: 4
​
<prototype>: Array []
*/