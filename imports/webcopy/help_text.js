export default

`Translating RegEx:
(a) capture (a)

(?abc) literally abc

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

{5} exactly 5 times

{7-9} between 7 and 9 times

Lookaheads:
(?:a)(?=(?:9)) literally a if followed by 9

((?:a))(?!(?:9)) capture a if not followed by 9

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

/myRegex/i case insensitive

Currently unsupported characters \\1 referencing a capturing group \\v vertical tab [\\b] backspace \\0 NUL \\cX ctrl-X \\uDDDD for a given unicode character \\f form feed
`;
