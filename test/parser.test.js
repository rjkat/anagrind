const fs = require('fs');
const path = require('path');
const parser = require('../@confuzzle/confuz-parser/parser');
const TEST_ENO = parser.sampleCrossword();
const confuz = require('../@confuzzle/confuz-crossword/confuz');
const ShareablePuz = require('../@confuzzle/puz-sharing').ShareablePuz;

test('basic parsing', () => {
  const cw = parser.parse(TEST_ENO);
  expect(cw.meta.author).toBe('RK');
});

test('scramble round trip', () => {
    const cw = parser.parse(TEST_ENO);
    const scrambled = confuz.fromCrossword(cw, {scramble: true});
    const parsed = parser.parse(scrambled);
    expect(parsed.meta.author).toBe('RK');
    const unscrambled = confuz.fromCrossword(parsed, {scramble: false});
    const parsed2 = parser.parse(unscrambled);
    expect(parsed2.meta.author).toBe('RK');
});

test('compression', () => {
    const source = path.join(__dirname, 'puzfiles', 'nyt_weekday_with_notes.puz');
    const buf = fs.readFileSync(source);
    const puz = ShareablePuz.from(buf);
    const eno = confuz.fromPuz(puz);
    const compressed = confuz.compressURL(eno);
    const parsed = parser.parse(confuz.decompressURL(compressed));
    expect(parsed.meta.author).toBe("Natan Last / Will Shortz");
});

test('url compression', () => {
    const source = path.join(__dirname, 'puzfiles', 'nyt_weekday_with_notes.puz');
    const buf = fs.readFileSync(source);
    const puz = ShareablePuz.from(buf);
    const puz2 = ShareablePuz.fromURL(puz.toURL());
    const eno = confuz.fromPuz(puz2);
    const parsed = parser.parse(eno);
    expect(parsed.meta.author).toBe("Natan Last / Will Shortz");
});

test('eno to emoji', () => {
    const puz = confuz.toPuz(TEST_ENO);
    const puz2 = ShareablePuz.fromEmoji(puz.toEmoji());
    const eno = confuz.fromPuz(puz2);
    const parsed = parser.parse(eno);
    expect(parsed.meta.author).toBe('RK');
});
