export default

`
'any character' \\w
'any of (a, b, c)' (a|b|c)
'anything' .
'at least 8 times' {8,}
'backslash' \\
'between 3 and 7 times' {3,7}
'capture a' (a)
'case insensitive' /myRegex/i
'digit' \\d
'digit from 3 to 5' [3-5]
'either of (x, y, z)' (x|y|z)
'exactly once' {1}
'exactly twice' {2}
'exactly 4 times' {4}
'if followed by' -> capture (digit) if followed by (any character) -> /([0-9])(?=\\w)/
'if not followed by' -> capture (letter) if not followed by (digit) /([a-z])(?![0-9])/
'letter' [a-z]
'letter from g to m' [g-m]
'literally "a string to match"' -> a string to match
'must end' $
'multi line' /yourRegex/m
'never or more' *
'new line' \\n
'no character' \\W
'no whitespace' \\S
'number from' -> number from 4 to 6 -> [4-6]
'once' {1}
'one of "defg1234"' [defg1234]
'optional' ?
'once or more' +
'raw "[a-zA-Z]"' -> [a-zA-Z]
'tab' \\t
'twice',
'starts with' ^
'until' -> capture (anything once or more) until "." -> (.+?)(?:\.)
'uppercase letter' [A-Z]
'uppercase letter from M to P' [M-P]
'whitespace' \\s

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

\\ a backslash is for characters that usually have special handling, you can escape that character and it will be treated literally. For example \\d would match a digit, while \\\d will match a string that has a backslash followed by the letter d.

Flags:
/yourRegex/m multi line

/myRegex/i 'case insensitive'

Currently unsupported characters \\1 referencing a capturing group \\v vertical tab [\\b] backspace \\0 matches NUL \\cX matches ctrl-X \\uDDDD matches a given unicode character \\f matches a form feed
'any character',


`;
