export default

`Welcome to RegExTranslator. You can edit this text to see example matches for your regular expressions below.

Here are some common text types you can explore matches with:

The lowercase letters [a-z] group abcdefghijklmnopqrstuvwxyz
The capital letters [A-Z] ABCDEFGHIJKLMNOPQRSTUVWXYZ
Digits [0-9] 0123456789
Common punctuation and special characters [!-/] !"#$%&'()*+,-./

Command-Z will undo typing and command-Y will redo typing in most browsers.

Guide to Special Characters in RegEx:

. The dot matches any single character, except line terminators
\\n (newline) \\r (carriage return) \\u2028 (unicode line separator) \\u2029 (unicode paragraph separator)

\\d matches any digit. [0-9] works identically.

\\w matches any alphanumeric character, including underscores. Works the same as [A-Za-z0-9_]

\\W matches any character that is not a word character. Same as [^A-Za-z0-9_]

\\s matches a single whitespace character.

\\S matches a single character other than whitespace.

\\t matches a horizontal tab character

\\n matches a new line or linefeed.

\\ a backslash is for characters that usually have special handling, you can escape that character and it will be treated literally. For example \\d would match a digit, while \\\d will match a string that has a backslash followed by the letter d.

x|y the pipe is an or operator in RegEx, it will match either x or y

^ the caret means start with, it matches the beginning of input.

$ is the complement of the caret and indicates the string to be matched must end.

Character support we are building soon:
\\D matches a character that is not a digit

\\b matches a word boundary. It is most often used to insert characters before or after words. It has no length, since it is a concept rather than a character.

\\B matches a non-word boundary.

\\v vertical tab

\\r carriage return

(x) surrounding part of your query in quotes creates a capturing group. It matches x and remembers the match.

{3} a number in braces looks for the element beforehand to be repeated that number of times.

{2-7} you can also specify a range

{4,} or an open-ended range

Currently unsupported characters \\1 referencing a capturing group [\\b] backspace \\0 matches NUL \\cX matches ctrl-X \\uDDDD matches a given unicode character \\f matches a form feed
`;
