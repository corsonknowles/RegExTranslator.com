export default

`
\\d digit

\\w whitespace

\\W no whitespace

\\s matches a single whitespace character.

\\S matches a single character other than whitespace.

\\t matches a horizontal tab character

\\r matches a carriage return.

\\n matches a new line or linefeed.

\\ a backslash is for characters that usually have special handling, you can escape that character and it will be treated literally. For example \\d would match a digit, while \\\d will match a string that has a backslash followed by the letter d.

x|y the pipe is an or operator in RegEx, it will match either x or y

^ the caret means start with, it matches the beginning of input.

$ is the complement of the caret and indicates the string to be matched must end.

 matches a word boundary. It is most often used to insert characters before or after words. It has no length, since it is a concept rather than a character.

B matches a non-word boundary.

(x) surrounding part of your query in quotes creates a capturing group. It matches x and remembers the match.

Currently unsupported characters \\1 referencing a capturing group

\\v vertical tab [\\b] backspace \\0 matches NUL \\cX matches ctrl-X \\uDDDD matches a given unicode character \\f matches a form feed
`;
