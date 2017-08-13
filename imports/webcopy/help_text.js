export default

`Translating RegEx:
(a) capture (a)

[abc] one of "abc"

[^abc] raw [^abc]

[a-z] letter

[A-Z] uppercase letter

"plain text string" -> literally "plain text string"

^ starts with

? optional

$ must end

. anything

+ once or more

* never or more

{8,} at least 8 times

Character classes:
\\d digit

\\w any character

\\W no character

\\s whitespace

\\S no whitespace

\\t tab

\\r carriage return

\\n new line

\\ use a backslash for characters that usually have special handling. You can escape that character and it will be treated literally. For example \\d will match a digit, while \\\\d will match a string that has a backslash followed by the letter d.

Flags:
/yourRegex/m multi line

/myRegex/i 'case insensitive'

Currently unsupported characters \\1 referencing a capturing group \\v vertical tab [\\b] backspace \\0 matches NUL \\cX matches ctrl-X \\uDDDD matches a given unicode character \\f matches a form feed
`;
