export default

`Thank you for your interest in RegExTranslator.
You can edit this text to see example matches for your regular expressions below.

Here are some common text types you can explore matches with:
the lowercase letters [a-z] group abcdefghijklmnopqrstuvwxyz
and the capital letters [A-Z] ABCDEFGHIJKLMNOPQRSTUVWXYZ
digits [0-9] 0123456789
common keyboard special characters [!-/] !"#$%&'()*+,-./

Command-Z will undo typing and command-Y will redo typing in most browsers.

Guide to Special Characters in RegEx: . matches any single character, except line terminators \\n (newline) \\r (carriage return) \\u2028 (unicode line separator) \\u2029 (unicode paragraph separator)

\\d matches any digit. [0-9] works identically.

\\w matches any alphanumeric character, including underscores. Works the same as [A-Za-z0-9_]

\\W  matches any character that is not a word character. Same as [^A-Za-z0-9_]

\\s matches a single whitespace character.

\\S matches a single character other than whitespace.

\\t matches a horizontal tab character

\\r matches a carriage return.

\\n matches a new line or linefeed.

\\ a backslash is for characters that usually have special handling, you can escape that character and it will be treated literally. For example \\d would match a digit, while \\\d will match a string that has a backslash followed by the letter d.

x|y the pipe is an or operator in RegEx, it will match either x or y

^ the caret means start with, it matches the beginning of input.

$ is the complement of the caret and indicates the string to be matched must end.

\\b matches a word boundary. It is most often used to insert characters before or after words. It has no length, since it is a concept rather than a character.

\\B matches a non-word boundary.

(x) surrounding part of your query in quotes creates a capturing group. It matches x and remembers the match.

Currently unsupported characters \\1 referencing a capturing group \\v vertical tab [\\b] backspace \\0 matches NUL \\cX matches ctrl-X \\uDDDD matches a given unicode character \\f matches a form feed
`;
