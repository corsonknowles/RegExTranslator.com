# RegExTranslator.com

## Background

Regular expression are incredibly useful and powerful. Unfortunately, they can be very difficult for even experienced programmers to parse. The intent of **RegEx Translator** is to turn regular expressions into something more readable.

## Core Functionality
- [ ] RegEx to SRL
- [ ] English to SRL
- [ ] SRL to English
- [ ] web implementation for SRL to RegEx (an existing technology)
- [ ] pattern translation
- [ ] Component for RegEx matching text
- [ ] Large text database to generate example matches for a given regular expression
- [ ] Common words to ignore (English words and insertion syntax for common languages, e.g. the initial and trailing slashes )
- [ ] Algorithmic RegEx parser
- [ ] Common RegEx patterns, like phone numbers, addresses and so on
- [ ] RegEx multi-language support
- [ ] User accounts and user customizations
- [ ] Logic for aggregating user contributions and common customizations


## Wireframes
![Wireframes](docs/regextranslator_wireframes.png)

Compare [Google Translate](https://translate.google.com)


## Technologies
- Node.js with Meteor.js
- MongoDB
- React
- Redux
- SRL


### External APIS
https://words.bighugelabs.com/api.php

## First weekend

- [ ] Wireframe showing the 5 key components of the app
- [ ] Meteor backend up and running
- [ ] Repo running on all team member's machines
- [ ] Master branch protected, with feature-branch workflow in place
- [ ] Heroku hosting with custom domain configured
- [ ] Heroku live updating from masterbranch on GitHub

## Members and Responsibilities

- David Corson-Knowles
- Adam Jacobson
- Rod Shokrian
- Andy Booth

## Timeline

*** Data Structure
The bulk of the translation burden can be handled with a translation hash, a list of key-value pairs that matches RegEx expressions to English language translations. Since translation from RegEx must be 1-to-1, it will have a simpler hash. Translation from English into RegEx can take multiple potential phrasings, so the translation hash will be much more extensive. Fortunately the structure of the hash still provides clear translation for simple expressions.

*** Control Flow
In addition, we will need to build several variables to track state as we iterate through the string to translate an expression. For instance, the meaning of characters changes while inside square brackets. With a state variable, we can set the insideSquareBrackets boolean to true when we pass a valid bracket and set it to false once more when we pass the closing bracket. We can handle deeper nesting by iterating a count variable and then decrementing it as each corresponding closing bracket is reached.
Meanwhile, we can also check that characters are being escaped (with a backslash '\') in a similar fashion. This would also prevent escaped square brackets from being misinterpreted.

[regextranslator.com](http://regextranslator.com)
```
sampleTranslations = {
  phone_numbers: " ^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$ ",
  email_address: " ^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$ "
  A_or_B: " (A|B) "


}
```
[Favorite Regex](http://www.catonmat.net/blog/my-favorite-regex/)
