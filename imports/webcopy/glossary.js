export default

`Glossary:
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
'literally "a string to match"' -> (?:a string to match)
'multi line' /yourRegex/m
'must end' $
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
'starts with' ^
'tab' \\t
'twice',
'until' -> capture (anything once or more) until "." -> (.+?)(?:\.)
'uppercase letter' [A-Z]
'uppercase letter from M to P' [M-P]
'whitespace' \\s
`;
