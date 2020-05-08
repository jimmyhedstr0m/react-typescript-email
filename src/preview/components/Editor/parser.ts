export default function w3CodeColor(text: string, mode?: string) {
  let lang = (mode || 'html');
  const elmntTxt = text || '';
  const tagcolor = '#2a2a2a';
  const tagnamecolor = '#fa4383';
  const attributecolor = '#a06fcb';
  const attributevaluecolor = '#FF4649';
  const commentcolor = '#888888';
  const cssselectorcolor = '#fa4383';
  const csspropertycolor = '#2a2a2a';
  const csspropertyvaluecolor = '#00a7a9';
  const cssdelimitercolor = '#2a2a2a';
  const cssimportantcolor = '#fa4383';
  const jscolor = '#2a2a2a';
  const jskeywordcolor = '#00a7a9';
  const jsstringcolor = '#FF4649';
  const jsnumbercolor = '#a06fcb';
  const jspropertycolor = '#2a2a2a';

  class Extract {
    public arr: string[];
    public rest: string;

    constructor(str: string, start: string | RegExp, end: string, func: (value: string) => string, repl: string) {
      let s;
      let e;
      let d = '';
      const a = [];
      while (str.search(start) > -1) {
        s = str.search(start);
        e = str.indexOf(end, s);
        if (e === -1) { e = str.length; }
        if (repl) {
          a.push(func(str.substring(s, e + (end.length))));
          str = str.substring(0, s) + repl + str.substr(e + (end.length));
        } else {
          d += str.substring(0, s);
          d += func(str.substring(s, e + (end.length)));
          str = str.substr(e + (end.length));
        }
      }
      this.rest = d + str;
      this.arr = a;
    }
  }

  function htmlMode(txt: string) {
    let rest = txt;
    let done = '';
    let comment;
    let startpos;
    let endpos;
    let note;
    let i;
    comment = new Extract(rest, '&lt;!--', '--&gt;', commentMode, 'W3HTMLCOMMENTPOS');
    rest = comment.rest;
    while (rest.indexOf('&lt;') > -1) {
      note = '';
      startpos = rest.indexOf('&lt;');
      if (rest.substr(startpos, 9).toUpperCase() === '&LT;STYLE') { note = 'css'; }
      if (rest.substr(startpos, 10).toUpperCase() === '&LT;SCRIPT') { note = 'javascript'; }
      endpos = rest.indexOf('&gt;', startpos);
      if (endpos === -1) { endpos = rest.length; }
      done += rest.substring(0, startpos);
      done += tagMode(rest.substring(startpos, endpos + 4));
      rest = rest.substr(endpos + 4);
      if (note === 'css') {
        endpos = rest.indexOf('&lt;/style&gt;');
        if (endpos > -1) {
          done += cssMode(rest.substring(0, endpos));
          rest = rest.substr(endpos);
        }
      }
      if (note === 'javascript') {
        endpos = rest.indexOf('&lt;/script&gt;');
        if (endpos > -1) {
          done += jsMode(rest.substring(0, endpos));
          rest = rest.substr(endpos);
        }
      }
    }
    rest = done + rest;
    for (i = 0; i < comment.arr.length; i++) {
      rest = rest.replace('W3HTMLCOMMENTPOS', comment.arr[i]);
    }
    return rest;
  }

  function tagMode(txt: string) {
    let rest = txt;
    let done = '';
    let startpos;
    let endpos;
    let result;
    while (rest.search(/(\s|<br>)/) > -1) {
      startpos = rest.search(/(\s|<br>)/);
      endpos = rest.indexOf('&gt;');
      if (endpos === -1) { endpos = rest.length; }
      done += rest.substring(0, startpos);
      done += attributeMode(rest.substring(startpos, endpos));
      rest = rest.substr(endpos);
    }
    result = done + rest;
    result = '<span style=color:' + tagcolor + '>&lt;</span>' + result.substring(4);
    if (result.substr(result.length - 4, 4) === '&gt;') {
      result = result.substring(0, result.length - 4) + '<span style=color:' + tagcolor + '>&gt;</span>';
    }
    return '<span style=color:' + tagnamecolor + '>' + result + '</span>';
  }

  function attributeMode(txt: string) {
    let rest = txt;
    let done = '';
    let startpos;
    let endpos;
    let singlefnuttpos;
    let doublefnuttpos;
    let spacepos;
    while (rest.indexOf('=') > -1) {
      endpos = -1;
      startpos = rest.indexOf('=');
      singlefnuttpos = rest.indexOf('\'', startpos);
      doublefnuttpos = rest.indexOf('"', startpos);
      spacepos = rest.indexOf('&nbsp;', startpos + 2);
      if (spacepos > -1 && (spacepos < singlefnuttpos || singlefnuttpos === -1) &&
        (spacepos < doublefnuttpos || doublefnuttpos === -1)) {
        endpos = rest.indexOf('&nbsp;', startpos);
      } else if (doublefnuttpos > -1 && (doublefnuttpos < singlefnuttpos || singlefnuttpos === -1)
        && (doublefnuttpos < spacepos || spacepos === -1)) {
        endpos = rest.indexOf('"', rest.indexOf('"', startpos) + 1);
      } else if (singlefnuttpos > -1 && (singlefnuttpos < doublefnuttpos || doublefnuttpos === -1)
        && (singlefnuttpos < spacepos || spacepos === -1)) {
        endpos = rest.indexOf('\'', rest.indexOf('\'', startpos) + 1);
      }
      if (!endpos || endpos === -1 || endpos < startpos) { endpos = rest.length; }
      done += rest.substring(0, startpos);
      done += attributeValueMode(rest.substring(startpos, endpos + 1));
      rest = rest.substr(endpos + 1);
    }
    return '<span style=color:' + attributecolor + '>' + done + rest + '</span>';
  }

  function attributeValueMode(txt: string) {
    return '<span style=color:' + attributevaluecolor + '>' + txt + '</span>';
  }

  function commentMode(txt: string) {
    return '<span style=color:' + commentcolor + '>' + txt + '</span>';
  }

  function cssMode(txt: string) {
    let rest = txt;
    let done = '';
    let s;
    let e;
    let comment;
    let i;
    let midz;
    let c;
    let cc;
    comment = new Extract(rest, /\/\*/, '*/', commentMode, 'W3CSSCOMMENTPOS');
    rest = comment.rest;
    while (rest.search('{') > -1) {
      s = rest.search('{');
      midz = rest.substr(s + 1);
      cc = 1;
      c = 0;
      for (i = 0; i < midz.length; i++) {
        if (midz.substr(i, 1) === '{') { cc++; c++; }
        if (midz.substr(i, 1) === '}') { cc--; }
        if (cc === 0) { break; }
      }
      if (cc !== 0) { c = 0; }
      e = s;
      for (i = 0; i <= c; i++) {
        e = rest.indexOf('}', e + 1);
      }
      if (e === -1) { e = rest.length; }
      done += rest.substring(0, s + 1);
      done += cssPropertyMode(rest.substring(s + 1, e));
      rest = rest.substr(e);
    }
    rest = done + rest;
    rest = rest.replace(/{/g, '<span style=color:' + cssdelimitercolor + '>{</span>');
    rest = rest.replace(/}/g, '<span style=color:' + cssdelimitercolor + '>}</span>');
    for (i = 0; i < comment.arr.length; i++) {
      rest = rest.replace('W3CSSCOMMENTPOS', comment.arr[i]);
    }
    return '<span style=color:' + cssselectorcolor + '>' + rest + '</span>';
  }

  function cssPropertyMode(txt: string) {
    let rest = txt;
    let done = '';
    let s;
    let e;
    let n;
    let loop;
    if (rest.indexOf('{') > -1) { return cssMode(rest); }
    while (rest.search(':') > -1) {
      s = rest.search(':');
      loop = true;
      n = s;
      while (loop === true) {
        loop = false;
        e = rest.indexOf(';', n);
        if (rest.substring(e - 5, e + 1) === '&nbsp;') {
          loop = true;
          n = e + 1;
        }
      }
      if (e === -1) { e = rest.length; }
      done += rest.substring(0, s);
      done += cssPropertyValueMode(rest.substring(s, (e || 0) + 1));
      rest = rest.substr((e || 0) + 1);
    }
    return '<span style=color:' + csspropertycolor + '>' + done + rest + '</span>';
  }

  function cssPropertyValueMode(txt: string) {
    let rest = txt;
    let done = '';
    let s;
    let result;

    rest = '<span style=color:' + cssdelimitercolor + '>:</span>' + rest.substring(1);
    while (rest.search(/!important/i) > -1) {
      s = rest.search(/!important/i);
      done += rest.substring(0, s);
      done += cssImportantMode(rest.substring(s, s + 10));
      rest = rest.substr(s + 10);
    }
    result = done + rest;
    if (result.substr(result.length - 1, 1) === ';' && result.substr(result.length - 6, 6) !== '&nbsp;'
      && result.substr(result.length - 4, 4) !== '&lt;' && result.substr(result.length - 4, 4) !== '&gt;'
      && result.substr(result.length - 5, 5) !== '&amp;') {
      result = result.substring(0, result.length - 1) + '<span style=color:' + cssdelimitercolor + '>;</span>';
    }
    return '<span style=color:' + csspropertyvaluecolor + '>' + result + '</span>';
  }

  function cssImportantMode(txt: string) {
    return '<span style=color:' + cssimportantcolor + ';font-weight:bold;>' + txt + '</span>';
  }

  function jsMode(txt: string) {
    let rest = txt;
    let done = '';
    const esc = [];
    let i;
    let cc;
    let tt = '';
    let sfnuttpos;
    let dfnuttpos;
    let compos;
    let comlinepos;
    let keywordpos;
    let mypos;
    let dotpos;
    let y;
    for (i = 0; i < rest.length; i++) {
      cc = rest.substr(i, 1);
      if (cc === '\\') {
        esc.push(rest.substr(i, 2));
        cc = 'W3JSESCAPE';
        i++;
      }
      tt += cc;
    }
    rest = tt;
    y = 1;
    while (y === 1) {
      sfnuttpos = getPos(rest, '\'', '\'', jsStringMode);
      dfnuttpos = getPos(rest, '"', '"', jsStringMode);
      compos = getPos(rest, /\/\*/, '*/', commentMode);
      comlinepos = getPos(rest, /\/\//, '<br>', commentMode);
      // numpos = getNumPos(rest, jsNumberMode);
      keywordpos = getKeywordPos('js', rest, jsKeywordMode);
      dotpos = getDotPos(rest, jsPropertyMode);
      if (Math.max(sfnuttpos[0], dfnuttpos[0], compos[0], comlinepos[0], keywordpos[0], dotpos[0]) === -1) {
        break;
      }

      mypos = getMinPos(sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, dotpos);
      if (mypos[0] === -1) { break; }
      if (mypos[0] > -1) {
        done += rest.substring(0, mypos[0]);
        done += mypos[2](rest.substring(mypos[0], mypos[1]));
        rest = rest.substr(mypos[1]);
      }
    }
    rest = done + rest;
    for (i = 0; i < esc.length; i++) {
      rest = rest.replace('W3JSESCAPE', esc[i]);
    }
    return '<span style=color:' + jscolor + '>' + rest + '</span>';
  }

  function jsStringMode(txt: string) {
    return '<span style=color:' + jsstringcolor + '>' + txt + '</span>';
  }

  function jsKeywordMode(txt: string) {
    return '<span style=color:' + jskeywordcolor + '>' + txt + '</span>';
  }

  function jsNumberMode(txt: string) {
    return '<span style=color:' + jsnumbercolor + '>' + txt + '</span>';
  }

  function jsPropertyMode(txt: string) {
    return '<span style=color:' + jspropertycolor + '>' + txt + '</span>';
  }

  function getDotPos(txt: string, func: (value: any) => any): any[] {
    const arr = ['.', '<', '&nbsp;', ';', '(', '+', ')', '[', ']', ',', '&', ':', '{', '}', '/', '-', '*', '|', '%'];
    let x;
    let i;
    let j;
    let s;
    let e;
    let cc: string;
    s = txt.indexOf('.');
    if (s > -1) {
      x = txt.substr(s + 1);
      for (j = 0; j < x.length; j++) {
        cc = x[j];
        for (i = 0; i < arr.length; i++) {
          if (cc.indexOf(arr[i]) > -1) {
            e = j;
            return [s + 1, e + s + 1, func];
          }
        }
      }
    }
    return [-1, -1, func];
  }

  function getMinPos(...args: any[]) {
    let i: number;
    let arr = [];
    for (i = 0; i < args.length; i++) {
      if (args[i][0] > -1) {
        if (arr.length === 0 || args[i][0] < arr[0]) { arr = args[i]; }
      }
    }
    if (arr.length === 0) { arr = args[i]; }
    return arr;
  }

  function getKeywordPos(type: string, txt: string, func: (value: any) => any): any[] {
    let words: string[] = [];
    let i: number;
    let pos: number;
    let rpos = -1;
    let rpos2 = -1;
    let patt;
    if (type === 'js') {
      words = ['abstract', 'arguments', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete',
        'do', 'double', 'else', 'enum', 'eval', 'export', 'extends', 'false', 'final', 'finally', 'float', 'for', 'function', 'goto', 'if', 'implements', 'import',
        'in', 'instanceof', 'int', 'interface', 'let', 'long', 'NaN', 'native', 'new', 'null', 'package', 'private', 'protected', 'public', 'return', 'short', 'static',
        'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'true', 'try', 'typeof', 'let', 'void', 'volatile', 'while', 'with', 'yield'];
    }
    for (i = 0; i < words.length; i++) {
      pos = txt.indexOf(words[i]);
      if (pos > -1) {
        patt = /\W/g;
        if (txt.substr(pos + words[i].length, 1).match(patt) && txt.substr(pos - 1, 1).match(patt)) {
          if (pos > -1 && (rpos === -1 || pos < rpos)) {
            rpos = pos;
            rpos2 = rpos + words[i].length;
          }
        }
      }
    }
    return [rpos, rpos2, func];
  }

  function getPos(txt: string, start: string | RegExp, end: string, func: (value: any) => any): any[] {
    const s: number = txt.search(start);
    let e: number = txt.indexOf(end, s + (end.length));
    if (e === -1) { e = txt.length; }
    return [s, e + (end.length), func];
  }

  if (!lang) { lang = 'html'; }
  if (lang === 'html') { return htmlMode(elmntTxt); }
  if (lang === 'css') { return cssMode(elmntTxt); }
  if (lang === 'js') { return jsMode(elmntTxt); }

  return elmntTxt;
}
