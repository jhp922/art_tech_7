// Nature Interaction by 임규빈, 오세진, 박지환
// Fullscreen and scaling modification by Perplexity
// 전체 수정된 코드 (캐릭터 등장 문제 해결, 누락 함수 포함)

let state = "start"; // "start" or "game" or "credit"

let pixelFont;
let koreanFont;

// 크레딧 관련
let credit_bg_fade = 0;
let credit_fade = 0;
let creditY = 500;
let credit_frame = 0;
let creditTexts = [
  "THE END",
  "제작",
  "박지환,임규빈,오세진",
  "역할 분담",
  "기획",
  "임규빈: 애니메이션 주제, 디자인 요소 기획",
  "오세진: 인터랙션, 손 인식 기획",
  "박지환: 스토리, 레이아웃 기획",
  "",
  "디자인",
  "임규빈: 배경, 나무, 공장",
  "오세진: 물건, 손 커서",
  "박지환: 사람, 새",
  "",
  "개발",
  "임규빈: 배경 이동/페이드, 나무 인터랙션",
  "오세진: 손 인식, 물건 잡기, 손 효과",
  "박지환: 캐릭터/새 움직임, 나무 클릭"
];
let img_crykid1;
let img_crykid2;

// === 비율 스케일 관련 ===
const BASE_WIDTH = 800;
const BASE_HEIGHT = 450;
let scaleX = 1;
let scaleY = 1;

function updateScaleFactors() {
  scaleX = width / BASE_WIDTH;
  scaleY = height / BASE_HEIGHT;
}

// 캐릭터 위치
let characterX ;
let characterY ;

let background_move_n = 0;
let background_move = false;

let sence = 1;

// 구름 관련 변수
let img_cloud1,img_cloud2,img_cloud3,img_cloud4,img_cloud5,img_cloud6;
let cloud_move_falme = 0;

// 페이드 아웃 관련 변수
let fade = 0;
let fadeout_on = false;
let fadeon_on = false;

// 하늘 이미지
let img_sky;
let img_sky3;
let img_sky4;
let img_sky5;

// 공장 이미지
let img_factory1;
let img_factory2;

//연기 관련 이미지;
let img_smoke1;
let img_smoke2;
let smoke_move1 = 0;
let smoke_move2 = 0;
let smoke_move3 = 0;

let img_ground;
let img_ground2;
let img_ground3;
let img_ground4;
let img_ground5;
let img_ground6;

let img_tree_1;
let img_tree_2;
let img_tree_3;
let img_tree_4;

let img_noleaf_tree_1;
let img_noleaf_tree_2;
let img_noleaf_tree_3;

let img_cut_tree_1;

let handPose;
let video;
let hands = [];

//오브젝트
let showInstruction = true;
let axePixel, toyImg, oilImg, phoneImg;
let objectX = 0, objectY = 0;
let objectVisible = true;
let isGrabbing = false;
let offsetX = 0, offsetY = 0;
const itemDescs = [
  "CAN PLAY WITH",
  "CUT TREE",
  "INDUSTRIAL DEVELOPMENT",
  "RARE MINERAL CONSUMPTION",
];

let openHandImg, closedHandImg;
let standImgs = [], walkImgs = [];

let currentAge = 0;
let isGiven = false;
let frameToggle = false;

// 캐릭터 등장 애니메이션 관련 변수
let characterAppearAnim = false;
let characterAppearFrame = 0;
let characterAppearDuration = 32; // 32프레임(약 1.5초)
let characterAppearDone = false;

// 새 관련 변수
let birdImgs = [];
let birdX = 0;
let baseY = 0;
let showBird = false;
let frameToggle1 = false;

function preload() {
  pixelFont = loadFont('PressStart2P-Regular.ttf');
  koreanFont = loadFont('IBMPlexSansKR-Text.ttf');
  
  img_crykid1 = loadImage('우는 아이1.png');
  img_crykid2 = loadImage('우는 아이2.png');
  img_sky = loadImage('하늘.png');
  img_sky3 = loadImage('하늘3.png');
  img_sky4 = loadImage('하늘4.png');
  img_sky5 = loadImage('하늘5.png');

  img_factory1 = loadImage('공장1.png');
  img_factory2 = loadImage('공장2.png');

  img_smoke1 = loadImage('연기1.png');
  img_smoke2 = loadImage('연기2.png');

  img_ground = loadImage('땅.png');
  img_ground2 = loadImage('땅2.png');
  img_ground3 = loadImage('땅3.png');
  img_ground4 = loadImage('땅4.png');
  img_ground5 = loadImage('땅5.png');
  img_ground6 = loadImage('땅6.png');

  img_cloud1 = loadImage('구름1.png');
  img_cloud2 = loadImage('구름2.png');
  img_cloud3 = loadImage('구름3.png');
  img_cloud4 = loadImage('구름4.png');
  img_cloud5 = loadImage('구름5.png');
  img_cloud6 = loadImage('구름6.png');

  img_tree_1 = loadImage('나무1.png');
  img_tree_2 = loadImage('나무2.png');
  img_tree_3 = loadImage('나무3.png');
  img_tree_4 = loadImage('나무4.png');

  img_noleaf_tree_1 = loadImage('잎없는나무1.png');
  img_noleaf_tree_2 = loadImage('잎없는나무2.png');
  img_noleaf_tree_3 = loadImage('잎없는나무3.png');

  img_cut_tree_1 = loadImage('잘린나무1.png');

  axePixel = loadImage("axepixel.png");
  toyImg = loadImage("toy.png");
  oilImg = loadImage("oil.png");
  phoneImg = loadImage("cellphone.png");
  
  handPose = ml5.handPose();
  openHandImg = loadImage('openHand.png');
  closedHandImg = loadImage('closedHand.png');

  standImgs[0] = loadImage('child_stand.png');
  walkImgs[0]  = loadImage('child_walk.png');
  standImgs[1] = loadImage('teen_walk.png');
  walkImgs[1]  = loadImage('teen_walk2.png');
  standImgs[2] = loadImage('adult_walk.png');
  walkImgs[2] = loadImage('adult_walk2.png');
  standImgs[3] = loadImage('old_walk.png');
  walkImgs[3] = loadImage('old_walk2.png');

  birdImgs[0] = loadImage('bird1.png');
  birdImgs[1] = loadImage('bird2.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  updateScaleFactors();
  textFont(pixelFont);
  noSmooth();
  background(220);
  rectMode(CENTER);
  imageMode(CENTER);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  handPose.detectStart(video, gotHands);
  frameRate(20);

  characterX = 500 * scaleX;  //627
  characterY = 450 * scaleY;  //313

  objectX = 1500 * scaleX;
  objectY = 450 * scaleY;

  characterAppearAnim = false;
  characterAppearFrame = 0;
  characterAppearDone = false;
}

function draw() {
  if (state === "start") {
    drawStartScreen();
    return;
  }

  if (state === "credit") {
    drawCredit();
    return;
  }

  background_maker();

  if (!characterAppearDone && characterAppearAnim) {
    drawCharacterAppearAnim();
  } else {
    drawCharacter(characterX, characterY, isGiven, currentAge);
  }
  
  if(sence === 5 && fadeout_on === false && fadeon_on === false){
    showInstruction = false;
    isGiven = true;
    if(characterX <= width / 2){
      characterX += 3 * scaleX;
    }else{
      isGiven = false;
      background6();
    }
  }

  drawHands();
  if (isGiven) {
    showInstruction = false;	
    if(sence != 5){
      characterX += 5 * scaleX;
      if (characterX > width + 50 * scaleX) {
        fadeout_on = true;
      }
    }

  }
  

  if (objectVisible) {
    drawObject(objectX, objectY);
  }

  updateHandState();
  updateObjectPosition();

  if (objectVisible && isGrabbing && isNearCharacter(objectX / scaleX, objectY / scaleY)) {
    objectVisible = false;
    isGiven = true;
  }


  if(fadeout_on){
    fadeout();
  }

  if(fadeon_on){
    fadeon();
  }

  if (!fadeon_on && sence == 5 && characterX == 750 * scaleX) {
    state = "credit";
    creditY = height;
  }
  
  
  
  if (
    state === "game" &&
    (sence === 2 || sence === 3) &&
    !fadeout_on && !fadeon_on
  ) {
  if (random(1) < 0.005 && !showBird) {
    birdX = random(100 * scaleX, 700 * scaleX);
    baseY = random(100 * scaleY, 200 * scaleY);
    showBird = true;
  }

  if (showBird) {
    if (frameCount % 6 === 0) frameToggle1 = !frameToggle1;
    drawBird();
  }
}
  if (sence === 1 && showInstruction) {
    fill(255);
    stroke(0);
    strokeWeight(3 * scaleX);
    textAlign(CENTER, TOP);
    textSize(30 * scaleY);
    text("USE YOUR HAND TO\nPICK UP AN ITEM", width / 2, 10 * scaleY);
  }

  if (isGrabbing && sence >= 1 && sence <= 4) {
    const desc = itemDescs[sence - 1];
    const boxW = 350 * scaleX;
    const boxH = 100 * scaleY;
    const boxX = width / 2;
    const boxY = boxH / 2 + 20 * scaleY;

    push();
    fill(0, 180);
    noStroke();
    rectMode(CENTER);
    rect(boxX, boxY, boxW, boxH, 20 * scaleX);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(14 * scaleY);
    textWrap(CHAR);
    text(desc, boxX, boxY, boxW - 24 * scaleX, boxH - 24 * scaleY);
    pop();
  }
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateScaleFactors();

  // 연령에 따라 캐릭터 위치 재설정
  if (currentAge === 0) {
    characterX = 500 * scaleX;
    characterY = 450 * scaleY;
  } else {
    characterX = 40 * scaleX;
    characterY = 300 * scaleY;
  }

  objectX = 1500 * scaleX;
  objectY = 450 * scaleY;
}



function updateScaleFactors() {
  scaleX = width / BASE_WIDTH;
  scaleY = height / BASE_HEIGHT;
}

function drawStartScreen() {
  background1(0);
  let mainText = "NATURE";
  let subText = "PRESS SPACE TO CONTINUE";
  textAlign(CENTER, CENTER);
  textSize(64 * scaleY);
  stroke(255);
  strokeWeight(12 * scaleX);
  fill(0);
  text(mainText, width / 2, height / 2 - 40 * scaleY);
  noStroke();
  fill(0);
  text(mainText, width / 2, height / 2 - 40 * scaleY);

  if (frameCount % 60 < 30) {
    textSize(24 * scaleY);
    stroke(255);
    strokeWeight(6 * scaleX);
    fill(0);
    text(subText, width / 2, height / 2 + 30 * scaleY);
    noStroke();
    fill(0);
    text(subText, width / 2, height / 2 + 30 * scaleY);
  }
}


function drawCredit() {
  textFont(koreanFont);
  fill(0,0,0,credit_bg_fade);
  rect(300 * scaleX,225 * scaleY,600 * scaleX,450 * scaleY);
  
  fill(255);
  textAlign(LEFT, TOP);
  textSize(32 * scaleY);
  text("CREDIT", 100 * scaleX, 50 * scaleY);

  textSize(20 * scaleY);
  
  // 프레임에 따른 크레딕 변화
  if(credit_frame >= 0 && credit_frame <= 30){
    textSize(100 * scaleY);
    credit_fade += 8
    text(creditTexts[0], width / 2, creditY - 80 * scaleY);
  }
  
  if(credit_frame >= 30 && credit_frame <= 90){
    textSize(100 * scaleY);
    text(creditTexts[0], width / 2, creditY - 80 * scaleY);
  }
  
  if(credit_frame >= 90 && credit_frame <= 120){
    textSize(100 * scaleY);
    credit_fade -= 8
    text(creditTexts[0], width / 2, creditY - 80 * scaleY);
  }
  
  if(credit_frame >= 121 && credit_frame <= 150){
    textSize(50 * scaleY);
    credit_fade += 8
    text(creditTexts[1], width / 2, creditY - 80 * scaleY);
    text(creditTexts[2], width / 2, creditY - 80 * scaleY);
  }
  
  if(credit_frame >= 151 && credit_frame <= 210){
    textSize(50 * scaleY);
    text(creditTexts[1], width / 2, creditY - 80 * scaleY);
    text(creditTexts[2], width / 2, creditY - 80 * scaleY);
  }
  if(credit_frame >= 211 && credit_frame <= 240){
    textSize(50 * scaleY);
    credit_fade -= 8
    text(creditTexts[1], width / 2, creditY - 80 * scaleY);
    text(creditTexts[2], width / 2, creditY - 80 * scaleY);
  }
  
  
  if(credit_frame >= 241){
    textSize(100 * scaleY);
    credit_fade -= 8
    text(creditTexts[0], width / 2, creditY - 80 * scaleY);
  }
  
  if(credit_bg_fade < 230){
    credit_bg_fade +=5;
  }
  
  credit_frame += 1;
}

function mousePressed(){
  if (!fullscreen()) fullscreen(true);
  if(state === "start") {
    state = "game";
    characterAppearAnim = true;
    characterAppearFrame = 0;
    characterAppearDone = false;
  } else {
    isGiven = true;
  }
}

function keyPressed() {
  if (!fullscreen()) fullscreen(true);
  if (state === "start" && (key === ' ' || keyCode === ENTER)) {
    state = "game";
    characterAppearAnim = true;
    characterAppearFrame = 0;
    characterAppearDone = false;
  }
}

function drawCharacterAppearAnim() {
  let img = standImgs[currentAge];
  let x = characterX;
  let y = characterY;
  let w = 100 * scaleX;
  let h = 100 * scaleY;

  let t = characterAppearFrame / characterAppearDuration;
  let maxPixel = 18;
  let minPixel = 1;
  let pixelSize = floor(lerp(maxPixel, minPixel, t));

  let pg = createGraphics(w, h);
  pg.noSmooth();
  pg.imageMode(CENTER);
  pg.clear();
  pg.image(img, w/2, h/2, w, h);

  noSmooth();
  for (let py = 0; py < h; py += pixelSize) {
    for (let px = 0; px < w; px += pixelSize) {
      let c = pg.get(px, py);
      fill(c);
      noStroke();
      rect(x - w/2 + px, y - h/2 + py, pixelSize, pixelSize);
    }
  }

  characterAppearFrame++;
  if (characterAppearFrame >= characterAppearDuration) {
    characterAppearDone = true;
  }
}

function drawCharacter(x, y, isGiven, ageIndex) {
  if (!isGiven) {
    image(standImgs[ageIndex], x+ background_move_n * scaleX, y, 100 * scaleX, 100 * scaleY);
  } else {
    if (frameCount % 6 === 0) frameToggle = !frameToggle;
    image(frameToggle ? walkImgs[ageIndex] : standImgs[ageIndex], x + background_move_n * scaleX, y, 100 * scaleX, 100 * scaleY);
  }
}

function background_maker(){
  switch(sence){
    case 1:
      background1();
      cloud_maker();
      break;
    case 2:
      background2();
      cloud_maker();
      break;  
    case 3:
      background3();
      cloud_maker();
      break;  
    case 4:
      background4();
      break;  
    case 5:
      background5();
      break;
  }
}

function cloud_maker(){
  if(background_move_n < -800 * scaleX){
  }else{
    image(img_cloud1,200 * scaleX + background_move_n * scaleX + cloud_move_falme * scaleX,50 * scaleY,120 * scaleX,90 * scaleY);
    image(img_cloud2,400 * scaleX + background_move_n * scaleX + cloud_move_falme * scaleX,70 * scaleY,150 * scaleX,120 * scaleY);
    image(img_cloud3,600 * scaleX + background_move_n * scaleX + cloud_move_falme * scaleX,50 * scaleY,150 * scaleX,60 * scaleY);
    image(img_cloud4,800 * scaleX + background_move_n * scaleX + cloud_move_falme * scaleX,70 * scaleY,180 * scaleX,120 * scaleY);
    image(img_cloud5,1000 * scaleX + background_move_n * scaleX + cloud_move_falme * scaleX,50 * scaleY,180 * scaleX,120 * scaleY);
    image(img_cloud6,1200 * scaleX + background_move_n * scaleX + cloud_move_falme * scaleX,70 * scaleY,120 * scaleX,80 * scaleY);
  }
  cloud_move_falme += -0.2 * scaleX;
}

function background1(){
  push();
  fill(150,200,255);
  image(img_sky,400 * scaleX + background_move_n * scaleX,225 * scaleY,800 * scaleX,450 * scaleY);
  image(img_ground,400 * scaleX + background_move_n * scaleX,225 * scaleY,800 * scaleX,450 * scaleY);
  image(img_tree_1,300 * scaleX + background_move_n * scaleX,190 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_2,400 * scaleX + background_move_n * scaleX,170 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_3,500 * scaleX + background_move_n * scaleX,190 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_4,600 * scaleX + background_move_n * scaleX,190 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_1,700 * scaleX + background_move_n * scaleX,190 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_3,100 * scaleX + background_move_n * scaleX,190 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_4,200 * scaleX + background_move_n * scaleX,190 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_1,300 * scaleX + background_move_n * scaleX,190 * scaleY,150 * scaleX,270 * scaleY);

  image(img_tree_1,100 * scaleX + background_move_n * scaleX,200 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_2,30 * scaleX + background_move_n * scaleX,230 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_3,200 * scaleX + background_move_n * scaleX,270 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_4,80 * scaleX + background_move_n * scaleX,300 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_1,10 * scaleX + background_move_n * scaleX,330 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_2,270 * scaleX + background_move_n * scaleX,360 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_3,150 * scaleX + background_move_n * scaleX,390 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_4,230 * scaleX + background_move_n * scaleX,410 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_1,70 * scaleX + background_move_n * scaleX,450 * scaleY,150 * scaleX,270 * scaleY);

  image(img_tree_1,400 * scaleX + background_move_n * scaleX,450 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_4,500 * scaleX + background_move_n * scaleX,450 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_1,600 * scaleX + background_move_n * scaleX,450 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_2,700 * scaleX + background_move_n * scaleX,450 * scaleY,150 * scaleX,270 * scaleY);
  pop();
}

function background2(){
  push();
  image(img_sky,400 * scaleX + background_move_n * scaleX,225 * scaleY,800 * scaleX,450 * scaleY);
  image(img_ground2,400 * scaleX + background_move_n * scaleX,225 * scaleY,800 * scaleX,450 * scaleY);

  image(img_tree_1,0 * scaleX,450 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_1,100 * scaleX,450 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_1,200 * scaleX,450 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_4,300 * scaleX,450 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_1,400 * scaleX,450 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_4,500 * scaleX,450 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_1,600 * scaleX,450 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_2,700 * scaleX,450 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_2,800 * scaleX,450 * scaleY,150 * scaleX,270 * scaleY);

  image(img_tree_1,0 * scaleX + background_move_n * scaleX,190 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_1,300 * scaleX + background_move_n * scaleX,190 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_2,400 * scaleX + background_move_n * scaleX,170 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_3,500 * scaleX + background_move_n * scaleX,190 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_4,600 * scaleX + background_move_n * scaleX,190 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_1,700 * scaleX + background_move_n * scaleX,190 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_3,100 * scaleX + background_move_n * scaleX,190 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_4,200 * scaleX + background_move_n * scaleX,190 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_1,300 * scaleX + background_move_n * scaleX,190 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_1,800 * scaleX + background_move_n * scaleX,190 * scaleY,150 * scaleX,270 * scaleY);

  pop();
}

function background3(){
  push();
  image(img_sky3,400 * scaleX,225 * scaleY,800 * scaleX,450 * scaleY);
  image(img_ground3,400 * scaleX,225 * scaleY,800 * scaleX,450 * scaleY);

  image(img_factory1,130 * scaleX,204 * scaleY,200 * scaleX,200 * scaleY);
  image(img_factory1,600 * scaleX,204 * scaleY,200 * scaleX,200 * scaleY);

  image(img_tree_1,0 * scaleX + background_move_n * scaleX,190 * scaleY,150 * scaleX,270 * scaleY);
  image(img_cut_tree_1,100 * scaleX + background_move_n * scaleX,300 * scaleY,120 * scaleX,120 * scaleY);
  image(img_cut_tree_1,200 * scaleX + background_move_n * scaleX,280 * scaleY,120 * scaleX,120 * scaleY);  
  image(img_tree_2,400 * scaleX + background_move_n * scaleX,170 * scaleY,150 * scaleX,270 * scaleY);
  image(img_noleaf_tree_3,500 * scaleX + background_move_n * scaleX,190 * scaleY,150 * scaleX,270 * scaleY);
  image(img_noleaf_tree_2,600 * scaleX + background_move_n * scaleX,190 * scaleY,150 * scaleX,270 * scaleY);
  image(img_noleaf_tree_1,300 * scaleX + background_move_n * scaleX,190 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_1,800 * scaleX + background_move_n * scaleX,190 * scaleY,150 * scaleX,270 * scaleY);

  image(img_noleaf_tree_3,0 * scaleX,450 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_1,100 * scaleX,450 * scaleY,150 * scaleX,270 * scaleY);
  image(img_noleaf_tree_1,300 * scaleX,430 * scaleY,150 * scaleX,270 * scaleY);
  image(img_noleaf_tree_2,400 * scaleX,450 * scaleY,150 * scaleX,270 * scaleY);
  image(img_tree_4,500 * scaleX,450 * scaleY,150 * scaleX,270 * scaleY);
  image(img_noleaf_tree_3,600 * scaleX,450 * scaleY,150 * scaleX,270 * scaleY);
  image(img_cut_tree_1,700 * scaleX + background_move_n * scaleX,430 * scaleY,120 * scaleX,120 * scaleY);  
  image(img_tree_2,800 * scaleX,450 * scaleY,150 * scaleX,270 * scaleY);

  pop();
}

function background4(){
  push();
  image(img_sky4,400 * scaleX,225 * scaleY,800 * scaleX,450 * scaleY);
  image(img_ground4,400 * scaleX,225 * scaleY,800 * scaleX,450 * scaleY);

  image(img_factory1,130 * scaleX,204 * scaleY,200 * scaleX,200 * scaleY);
  image(img_factory1,600 * scaleX,204 * scaleY,200 * scaleX,200 * scaleY);
  making_smoke(370 * scaleX,110 * scaleY);
  image(img_factory2,370 * scaleX,183 * scaleY,150 * scaleX,150 * scaleY);

  image(img_noleaf_tree_3,0 * scaleX + background_move_n * scaleX,190 * scaleY,150 * scaleX,270 * scaleY);
  image(img_cut_tree_1,100 * scaleX + background_move_n * scaleX,300 * scaleY,120 * scaleX,120 * scaleY);
  image(img_cut_tree_1,200 * scaleX + background_move_n * scaleX,280 * scaleY,120 * scaleX,120 * scaleY);  
  image(img_noleaf_tree_3,500 * scaleX + background_move_n * scaleX,190 * scaleY,150 * scaleX,270 * scaleY);
  image(img_noleaf_tree_2,600 * scaleX + background_move_n * scaleX,190 * scaleY,150 * scaleX,270 * scaleY);
  image(img_noleaf_tree_1,300 * scaleX + background_move_n * scaleX,190 * scaleY,150 * scaleX,270 * scaleY);
  image(img_noleaf_tree_1,800 * scaleX + background_move_n * scaleX,190 * scaleY,150 * scaleX,270 * scaleY);

  image(img_noleaf_tree_3,0 * scaleX,450 * scaleY,150 * scaleX,270 * scaleY);
  image(img_noleaf_tree_3,100 * scaleX,450 * scaleY,150 * scaleX,270 * scaleY);
  image(img_noleaf_tree_1,300 * scaleX,430 * scaleY,150 * scaleX,270 * scaleY);
  image(img_noleaf_tree_2,400 * scaleX,450 * scaleY,150 * scaleX,270 * scaleY);
  image(img_noleaf_tree_3,600 * scaleX,450 * scaleY,150 * scaleX,270 * scaleY);
  image(img_cut_tree_1,700 * scaleX + background_move_n * scaleX,430 * scaleY,120 * scaleX,120 * scaleY);  
  image(img_noleaf_tree_2,800 * scaleX,450 * scaleY,150 * scaleX,270 * scaleY);

  pop();
}

function making_smoke(x_position,y_position){
  push();
  image(img_smoke1 ,x_position - smoke_move1 * scaleX, y_position - smoke_move1 * scaleY, 60 * scaleX, 60 * scaleY);
  smoke_move1 += 0.1 * scaleX;
  if(smoke_move1 >= 120 * scaleX){
    smoke_move1 = -6 * scaleX;
  }
  image(img_smoke2 ,x_position - 40 * scaleX - smoke_move2 * scaleX, y_position - 40 * scaleY - smoke_move2 * scaleY, 60 * scaleX, 60 * scaleY);
  smoke_move2 += 0.1 * scaleX;
  if(smoke_move2 >= 80 * scaleX){
    smoke_move2 = -46 * scaleX;
  }
  image(img_smoke1 ,x_position - 80 * scaleX - smoke_move3 * scaleX, y_position - 80 * scaleY - smoke_move3 * scaleY, 60 * scaleX, 60 * scaleY);
  smoke_move3 += 0.1 * scaleX;
  if(smoke_move3 >= 50 * scaleX){
    smoke_move3 = -86 * scaleX;
  }
  pop();
}

function background5(){
  push();
  fill(0,0,255);
  image(img_sky5,400 * scaleX + background_move_n * scaleX,225 * scaleY,800 * scaleX,450 * scaleY);
  image(img_ground5,400 * scaleX + background_move_n * scaleX,225 * scaleY,800 * scaleX,450 * scaleY);
  image(img_factory1,130 * scaleX + background_move_n * scaleX,204 * scaleY,200 * scaleX,200 * scaleY);
  image(img_factory1,600 * scaleX + background_move_n * scaleX,204 * scaleY,200 * scaleX,200 * scaleY);
  making_smoke(370 * scaleX + background_move_n * scaleX,110 * scaleY);
  image(img_factory2,370 * scaleX + background_move_n * scaleX,183 * scaleY,150 * scaleX,150 * scaleY);

  image(img_cut_tree_1,200 * scaleX + background_move_n * scaleX,400 * scaleY,100 * scaleX,100 * scaleY);
  image(img_cut_tree_1,400 * scaleX + background_move_n * scaleX,280 * scaleY,100 * scaleX,100 * scaleY);
  image(img_cut_tree_1,500 * scaleX + background_move_n * scaleX,400 * scaleY,100 * scaleX,100 * scaleY);
  image(img_cut_tree_1,700 * scaleX + background_move_n * scaleX,280 * scaleY,100 * scaleX,100 * scaleY);
  image(img_cut_tree_1,600 * scaleX + background_move_n * scaleX,400 * scaleY,100 * scaleX,100 * scaleY);
  image(img_cut_tree_1,500 * scaleX + background_move_n * scaleX,280 * scaleY,100 * scaleX,100 * scaleY);
  image(img_cut_tree_1,600 * scaleX + background_move_n * scaleX,280 * scaleY,100 * scaleX,100 * scaleY);
  image(img_cut_tree_1,700 * scaleX + background_move_n * scaleX,400 * scaleY,100 * scaleX,100 * scaleY);
  image(img_cut_tree_1,550 * scaleX + background_move_n * scaleX,340 * scaleY,100 * scaleX,100 * scaleY);
  image(img_cut_tree_1,650 * scaleX + background_move_n * scaleX,340 * scaleY,100 * scaleX,100 * scaleY);
  image(img_cut_tree_1,750 * scaleX + background_move_n * scaleX,340 * scaleY,100 * scaleX,100 * scaleY);
  pop();
}

//
function background6(){
  push();
  image(img_sky5,1400 * scaleX + background_move_n * scaleX,225 * scaleY,1200 * scaleX,450 * scaleY);
  image(img_ground6,1400 * scaleX + background_move_n * scaleX,225 * scaleY,1200 * scaleX,450 * scaleY);
  if(credit_frame > 120 && credit_frame < 820){
    background_move_n -= 1;
    if(int(credit_frame / 10) % 2 == 1){
      image(standImgs[0],1070 * scaleX - 370 * scaleX ,320 * scaleY,70 * scaleX,70 * scaleY);
    }else{
      image(walkImgs[0],1070 * scaleX - 370 * scaleX,320 * scaleY,70 * scaleX,70 * scaleY);

    }
  }else if(credit_frame > 820){
    if(int(credit_frame / 10) % 2 == 1){
      image(img_crykid1,1070 * scaleX - 370 * scaleX ,320 * scaleY,70 * scaleX,70 * scaleY);
    }else{
      image(img_crykid2,1070 * scaleX - 370 * scaleX,320 * scaleY,70 * scaleX,70 * scaleY);

    }
  }else{
    image(standImgs[0],1070 * scaleX + background_move_n * scaleX,320 * scaleY,70 * scaleX,70 * scaleY);
  }
  
  if(background_move_n > -370){
    background_move_n -= 5;
    
  }else{
    drawCredit();
  }
  
  pop();
}
//

function fadeout(){
  push();
  fade += 4;
  fill(0,0,0,fade);
  strokeWeight(0);
  rect(width/2, height/2, width, height);
  if(fade >= 255){
    fadeout_on = false;
    fadeon_on = true;
    fade = 255;
    nextCharacter();
  }
  pop();
}

function fadeon(){
  push();
  fade -= 4;
  fill(0,0,0,fade);
  strokeWeight(0);
  rect(width/2, height/2, width, height);
  if(fade <= 0){
    fadeon_on = false;
    fade = 0;
  }
  pop();
}

// function drawRecyclingBox(x, y) {
//   push();
//   noStroke();
//   const dotSize = 6 * scaleX;
//   fill(250,0,0);
//   for (let i = -3; i <= 3; i++) {
//     for (let j = -2; j <= 2; j++) {
//       rect(x + i * dotSize, y + j * dotSize, dotSize, dotSize);
//     }
//   }
//   pop();
// }

function drawHands() {
  for (let hand of hands) {
    let indexTip = hand.keypoints.find(k => k.name === "index_finger_tip");
    if (indexTip) {
      let screenX = indexTip.x / 640 * width;
      let screenY = indexTip.y / 480 * height;
      image(isGrabbing ? closedHandImg : openHandImg, screenX, screenY, 60 * scaleX, 60 * scaleY);
    }
  }
}


function updateHandState() {
  if (hands.length === 0) {
    isGrabbing = false;
    return;
  }

  let hand = hands[0];

  if (hand && hand.keypoints) {
    if (hand.handInViewConfidence && hand.handInViewConfidence < 0.75) return;
    if (hand.keypoints.length < 10) return;
  }
  
  let thumbTip = hand.keypoints.find(k => k.name === "thumb_tip");
  let indexTip = hand.keypoints.find(k => k.name === "index_finger_tip");

  if (thumbTip && indexTip) {
    let thumbX = thumbTip.x / 640 * width;
    let thumbY = thumbTip.y / 480 * height;
    let indexX = indexTip.x / 640 * width;
    let indexY = indexTip.y / 480 * height;

    let d = dist(thumbX, thumbY, indexX, indexY);
    if (d < 40) {
      if (!isGrabbing && objectVisible && isNearObject(indexX, indexY)) {
        isGrabbing = true;
        offsetX = objectX - indexX;
        offsetY = objectY - indexY;
      }
    } else {
      isGrabbing = false;
    }
  }
}


function updateObjectPosition() {
  if (!isGrabbing || !objectVisible) return;
  if (hands.length === 0) return;

  let hand = hands[0];
  let indexTip = hand.keypoints.find(k => k.name === "index_finger_tip");
  if (indexTip) {
    let indexX = indexTip.x / 640 * width;
    let indexY = indexTip.y / 480 * height;
    objectX = indexX + offsetX;
    objectY = indexY + offsetY;
  }
}


function drawObject(x, y) {
  push();
  let size1 = 100 * ((scaleX + scaleY) / 2);
  let size2 = 60 * ((scaleX + scaleY) / 2);
  if (sence === 1) {
    image(toyImg, x, y, size1, size1);
  } else if (sence === 2) {
    image(axePixel, x, y, size2, size2);
  } else if (sence === 3) {
    image(oilImg, x, y, size2, size2);
  } else if (sence === 4) {
    image(phoneImg, x, y, size2, size2);
  }
  pop();
}


function nextCharacter() {
  sence += 1;
  switch(sence){
    case 1:
      currentAge = 0;
      break;
    case 2:
    case 3:
      currentAge = 1;
      break;
    case 4:
      currentAge = 2;
      break;
    case 5:
      currentAge = 3;
      break;
  }
  
  characterX = 40 * scaleX;
  objectX = 1500 * scaleX;
  objectY = 450 * scaleY;

  isGiven = false;
  objectVisible = true;
  characterAppearDone = false;
  characterAppearFrame = 0;
}

function isNearObject(x, y) {
  let d = dist(x, y, objectX, objectY);
  
  return d < 100; // 이 값이 작으면 인식이 빡빡함
}



function isNearCharacter(x, y) {
  // objectX, objectY(비디오 픽셀 기준)와 characterX, characterY(화면 기준) 비교
  // 화면 좌표계로 변환 필요
  return dist(x * scaleX, y * scaleY, characterX, characterY) < 100 * scaleX;
}

function gotHands(results) {
  hands = results;
}


//--------새 움직임 함수
function drawBird(){
  let birdY = baseY + sin(frameCount * 0.1) * 20 * scaleY;

  // 크기를 60x60으로 줄임
  image(
    frameToggle1 ? birdImgs[0] : birdImgs[1],
    birdX, birdY,
    60 * scaleX, 60 * scaleY
  );
}

