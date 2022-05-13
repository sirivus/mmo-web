/* global jsfxr */

/* global COLOR_VALUES COLOR_TRAP */ // from network.js

let GAME_TIME = 256;

let SOUND_MOVE = `url(${jsfxr([0,0.002,0.0234,0.1937,0.7505,0.2288,,0.2736,0.0139,-0.1929,-0.2634,-0.818,-0.532,,,,-0.3047,0.8316,0.7164,-0.0983,,0.1088,0.0009,0.5])})`;
let SOUND_TRAP = `url(${jsfxr([1,0.06,0.3,0.2,0.08,0.18,,,,,,,,,,,,,1,,,0.09,,0.5])})`;
let SOUND_HACK = `url(${jsfxr([1,,0.19,0.13,0.12,0.22,,-0.02,,,,0.02,,,,,-0.0799,0.08,1,,,0.12,,0.5])})`;
let SOUND_LOSE = `url(${jsfxr([ 0,0.0107,0.4818,0.1177,0.1103,0.5301,,-0.001,-0.2314,,0.8409,0.6064,-0.8357,-0.2814,-0.1833,,-0.1204,-0.0006,0.9992,0.2134,0.7968,0.9975,-0.8724,0.5 ])})`;
let SOUND_CLICK = `url(${jsfxr([0,,0.1906,,0.0556,0.4761,,,,,,,,0.1562,,,,,1,,,0.1,,0.5])})`;
let SOUND_WIN = `url(${jsfxr([1,,0.3447,,0.4712,0.2109,,0.1984,,0.1398,0.5774,,,,,,,,1,,,,,0.5])})`;

// game state
let time = GAME_TIME;  // current time
let ticking; // if time is already ticking
let isGameOver; /* exported isGameOver */
let isWin;
let cancelMove;

let network;
let sectorCodes;
let prison;

let currentNode;
let moves = -1; // not to count first 'move' when game starts

/* exported enterNode */
function enterNode(node) {
  currentNode = node;
  moves++;

  // render inside of the box only for current node
  document.querySelectorAll('.node-inside').forEach(n => n.setAttribute('visible', false));
  node.el.querySelector('.node-inside').setAttribute('visible', true);

  if (node.isTrap) {
    node.el.querySelector('.node-box').components[isGameOver ? 'sound__lose' : 'sound__trap'].playSound();
    reduceTime(32);
  }

  drawTerminals();
}

/* exported animate */
function animate(draw, duration) {
  let start = performance.now();
  let canceled = false;

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    let progress = timeFraction;

    if (!canceled) draw(progress); // draw it

    if (!canceled && timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });

  return () => { canceled = true; };
}

function createEntity(name, attrs) {
  const entity = document.createElement(name);

  for (const key in attrs) {
    let value = attrs[key];
    if (key === 'position') {
      value = (value.x || 0) + " " + (value.y || 0) + " " + (value.z || 0);
    }
    entity.setAttribute(key, value);
  }

  return entity;
}

/* exported getBox */
function getBox(pos) {
  return createEntity('a-box', {
    class: 'wall',
    src: '#G',
    position: pos,
    color: '#FFF',
    height: 4,
    width: 4,
    depth: 4
  });
}

// side is 1 or -1 (for 2 sides of the node)
function getTerminal(pos, node, side = 1) {
  let terminal = createEntity('a-entity', {
    position: { x: pos.x - side * 0.5, y: pos.y, z: pos.z - side * 0.5 },
    rotation: '0 ' + (side * 90 - 45) + ' 0'
  });

  // node terminal text
  terminal.appendChild(createEntity('a-plane', {
    position: { y: -0.4 },
    rotation: '-10 0 0',
    height: 0.5,
    width: 0.5,
    src: `#T${node.isTrap ? 'T' : node.sector}`
  }));

  if (!node.isTrap) {
    // help action
    terminal.appendChild(createEntity('a-plane', {
      'class': 'node-action-help',
      position: { x: -0.30, y: -0.2 },
      rotation: '-10 15 0',
      height: 0.1,
      width: 0.4,
      src: '#AE',
      material: 'transparent: true;',
      'fuse-on-hover': '',
      'scale-on-hover': '',
      'help-on-click': '',
      'text-on-hover': '',
      'sound__click': { src: SOUND_CLICK }
    }));

    // hack action
    terminal.appendChild(createEntity('a-plane', {
      'class': 'node-action-hack',
      position: { x: -0.31, y: -0.35 },
      rotation: '-10 15 0',
      height: 0.1,
      width: 0.4,
      src: '#AA',
      material: 'transparent: true;',
      'fuse-on-hover': '',
      'scale-on-hover': '',
      'hack-on-click': '',
      'text-on-hover': '',
      'sound__hack': { src: SOUND_HACK }
    }));

    // hint
    let hint = createEntity('a-entity', {
      'class': 'hint',
      position: { y: -0.2, z: -0.1 },
      visible: false
    });

    // hint text
    hint.appendChild(createEntity('a-plane', {
      position: { y: 0.375 },
      height: 0.5,
      width: 0.5,
      src: `#H`,
      material: 'transparent:true',
    }));

    // hint arrow
    hint.appendChild(createEntity('a-plane', {
      position: { y: 0.0625 },
      height: 0.125,
      width: 0.125,
      src: `#HA`,
      material: 'transparent:true',
    }));

    terminal.appendChild(hint);
  }

  return terminal;
}

/* exported getNode */
function getNode(pos, node) {
  let nodeEl = createEntity('a-entity', {
    'class': 'node',
  });

  // node box
  nodeEl.appendChild(createEntity('a-box', {
    'class': 'node-box',
    src: `#N${node.sector}`,
    position: pos,
    height: 1.5,
    width: 1.5,
    depth: 1.5,
    rotation: '0 45 0',
    'move-on-click': '',
    'scale-on-hover': '',
    'text-on-hover': '',
    'fuse-on-hover': '',
    'sound__move': { src: SOUND_MOVE, on: 'click' },
    'sound__trap': { src: SOUND_TRAP },
    'sound__lose': { src: SOUND_LOSE }
  }));

  let inside = createEntity('a-entity', {
    'class': 'node-inside'
  });

  // node inside bottom frame
  inside.appendChild(createEntity('a-plane', {
    position: { x: pos.x, y: pos.y - 0.7, z: pos.z },
    color: node.isTrap ? COLOR_TRAP : COLOR_VALUES[network.colors[node.sector]],
    rotation: '-90 45 0',
    material: 'transparent:true',
    src: '#F',
    height: 1.46,
    width: 1.46
  }));

  // terminals
  inside.appendChild(getTerminal(pos, node));
  inside.appendChild(getTerminal(pos, node, -1));

  nodeEl.appendChild(inside);

  nodeEl.data = node;

  return nodeEl;
}


// terminal text
// - code
// - is time ticking
// - time
// - hover (hack) (or other actions?)
// - sector color (?)
function getTerminalText(time, code, action) {
  let locating = getTimerText(time);

  let access = `> access code\n  ${code}`;
  let hacked = `> hack\n  ACCESS DENIED!`;
  let win = `> hack\n\n  ACCESS GRANTED\n\n> sudo rm -rf /\n> kill -9 -1`;
  let prompt = '\n\n> ' + (action || '');
  return (ticking && !isWin ? locating + '\n\n' : '') +
         (currentNode.isHacked ? hacked : isWin ? win : access) +
         (isWin ? '' : prompt);
}

function getTimerText(time) {
  let min = ~~(time / 60);
  let sec = time % 60;

  let formatted = `0${min}:${sec<10?'0':''}${sec}`; // MM:SS

  let percent = ~~((GAME_TIME - time) * 100 / GAME_TIME); // percent of time going up
  // progress bar line like: [=======  ]
  let progress = '='.repeat(~~(percent / 10) + (percent < 100 ? 1 : 0))
               + ' '.repeat(10 - ~~(percent / 10) + (percent < 10 ? 1 : 0));

  let locating = `LOCATING INTRUDER\n${percent}% [${progress}]\n            ${formatted}`;

  return locating;
}

function getTrapText(time) {
  let locating = getTimerText(time);
  return (ticking ? locating + '\n\n' : '') +
   '    INTRUDER  \n' +
   (isGameOver ? '   ELIMINATED' : '    DETECTED  ');
}

function drawTerminals(action) {
  sectorCodes.forEach((code, i) => {
    drawText(TEXTURES[`T${i}`], getTerminalText(time, code, action), COLOR_VALUES[network.colors[i]], 48);
  });

  drawText(TEXTURES[`TT`], getTrapText(time), COLOR_TRAP);
}

/* exported drawNodes */
function drawNodes(action) {
  sectorCodes.forEach((code, i) => {
    drawText(TEXTURES[`N${i}`], '>' + (action || ''), COLOR_VALUES[network.colors[i]], 112);
  });
}

function reduceTime(amount) {
  time = time - amount;
  if (time < 0) { time = 0; }

  drawTerminals();
}

function tick() {
  if (isWin) return;

  time--;

  if (time < 0) { time = 0; }
  drawTerminals();

  if (!time) {
    gameOver();
  } else {
    setTimeout(tick, currentNode.isTrap ? 500 : 1000);
  }
}

/* exported initTimer */
function initTimer() {
  if (ticking) return;

  ticking = true;

  drawTerminals();
  tick();
}

function gameOver() {
  if (cancelMove) cancelMove();
  isGameOver = true;

  document.getElementById('camera').setAttribute('position', "0 0 0");
  paintWalls(COLOR_TRAP);
  enterNode(prison);
}

/* global scoreToCode */
function showWinScreen() {
  let code = scoreToCode(time, moves);

  let blueScreenOfWin = [
    "              ERROR" ,
    "",
    "A fatal exception " + code + " has" ,
    "occured in the network sectors:",
    sectorCodes.join(" ") + ".",
    "",
    "All processes terminated.",
    "",
    "Contact your system administator",
    "or technical support for further",
    "assistance.",
    "",
    "TIME_TO_LOCATE_INTRUDER: " + `0${~~(time / 60)}:${(time % 60)<10?'0':''}${time % 60}`,
    "INTRUDER_SWITCHES_COUNT: " + moves,
    "NETWORK_TOP_HACKER_CODE: " + code,
    "",
    "YOU WIN!"
  ].join('\n');
  drawText(TEXTURES['H'], blueScreenOfWin, '', 24);
  let screen = createEntity('a-plane', {
    width: 2,
    height: 2,
    position: { y: 1, z: -3 },
    src: '#H',
    material: 'transparent:true',
  });
  document.getElementById('camera').appendChild(screen);

  screen = createEntity('a-plane', {
    width: 2,
    height: 2,
    position: { y: 1, z: 3 },
    src: '#H',
    material: 'transparent:true',
    rotation: '0 180 0'
  });
  document.getElementById('camera').appendChild(screen);
}

/* exported win */
/* global randomInt */
function win() {
  isWin = true;
  let camera = document.getElementById('camera');
  camera.setAttribute('sound', { src: SOUND_WIN });
  camera.components.sound.playSound();

  drawTerminals();

  // show sky and remove floor and ceiling
  document.getElementById('scene').appendChild(createEntity('a-sky', { color: '#00F'} ));
  document.querySelectorAll('.sky').forEach(p => p.parentNode.removeChild(p));

  document.querySelectorAll('.node-action-hack').forEach(p => p.parentNode.removeChild(p));
  document.querySelectorAll('.node-action-help').forEach(p => p.parentNode.removeChild(p));
  paintWalls('#00F');

  function removeAll(selector, delay, callback) {
    let nodes = [].filter.call(document.querySelectorAll(selector), n => n.getAttribute('visible'));
    if (nodes.length) {
      nodes[randomInt(nodes.length)].setAttribute('visible', false);
      nodes[randomInt(nodes.length)].setAttribute('visible', false);
      setTimeout(() => removeAll(selector, delay, callback), delay);
    } else {
      callback();
    }
  }

  removeAll('.wall', 20, () => removeAll('.node', 50, showWinScreen));
}

function drawText(ctx, text, bgColor, size = 48, textColor = 'white') {
  text = text.split('\n');

  ctx.clearRect(0,0,512,512);
  if (bgColor) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0,0,512,512);
  }
  ctx.lineWidth = 1;
  ctx.fillStyle = textColor;
  ctx.font = `${size}px Monaco,Consolas,monospace`;
  text.forEach((line,i) => ctx.fillText(line, 10, (i+1) * size * 1.2));

  if (bgColor && size > 30) {
    ctx.strokeStyle = bgColor;
    text.forEach((line,i) => ctx.strokeText(line, 10, (i+1) * size * 1.2));
  }

  ctx.strokeStyle = 'rgba(0,0,0,0.3)';
  text.forEach((line,i) => ctx.strokeText(line, 10, (i+1) * size * 1.2));
}

let TEXTURES = {};

function paintWalls(color = '#FFF') {
  let ctx = TEXTURES['G'];
  ctx.fillStyle = 'black';
  ctx.strokeStyle = color;
  ctx.fillRect(0,0,256,256);

  for (let i = 0; i < 6; i++) {
    let y = i*51 + 0.5;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(256,y);
    ctx.stroke();
  }
}

/* exported initTextures */
function initTextures() {
  let assets = document.querySelector('a-assets');

  let createTexture = (id, width, height) => {
    let canvas = document.createElement('canvas');
    canvas.id = id;
    canvas.width = width;
    canvas.height = height;

    TEXTURES[id] = canvas.getContext('2d');
    assets.appendChild(canvas);

    return TEXTURES[id];
  };

  // wall grid texture
  let ctx = createTexture('G', 256, 256);
  paintWalls();

  // node inside frame texture
  ctx = createTexture('F', 128, 128);
  ctx.strokeStyle = '#FFF';
  ctx.clearRect(0,0,128,128);
  ctx.strokeRect(0.5,0.5,127,127);

  // hack and help actions textures
  drawText(createTexture('AA', 512, 128), '>hack', '', 90);
  drawText(createTexture('AE', 512, 128), '>help', '', 90);

  // hint arrow and hint text
  ctx = createTexture('HA', 128, 128);
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(64, 64);
  ctx.lineTo(128, 0);
  ctx.fill();

  let hint = [
    '> access code',
    '',
    'Four ACCESS_CODEs from terminals',
    'in different sectors can be used',
    'by NAVIGATOR to map the network',
    'and locate the TARGET node.',
    '',
    '> hack',
    '',
    'HACK the TARGET node to destroy',
    'the corporate network and win.',
    '',
    'But beware - hacking wrong nodes',
    'will make you easier to locate',
    'and you will be lost in CYBERSPACE',
    'when the time runs out!'
  ].join('\n');

  drawText(createTexture('H', 512, 512), hint, 'rgba(255,255,255,0.8)', 24, '#333');

  // init node box sides and terminals for all sectors and traps
  [
    'N0', 'N1', 'N2', 'N3',
    'T0', 'T1', 'T2', 'T3', 'TT'
  ].forEach(id => createTexture(id, 512, 512));

  drawNodes();
}
