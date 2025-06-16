// Nature Interaction by 임규빈, 오세진, 박지환
// Fullscreen and scaling modification by Perplexity

let state = "start"; // "start" or "running" or "credit"

let pixelFont;
let koreanFont; 

// 크레딧 관련
let credit_bg_fade = 0;
let creditY = 500;
let credit = 0;
let credit_frame = 0;
let creditTexts = [
  "THE END", 
  "제작",
  "박지환,임규빈,오세진", 
  "AI 사용비율",
  "이미지",
  "10%",
  "코드",
  "40%",
  "",
  "ai를 참고하여 제작한 콘텐츠",
  "ml5 핸드포즈관련 코드, 캐릭터 생성 효과 코드, fullscreen 관련 코드",
  "1,2,3,4 장면의 사람 이미지,건네주는 물건일부(도끼,기름통,핸드폰)",
  "사용한 기능",
  "ml5.js handPose() 손인식,createGraphics() 픽셀화 애니메이션,\nframeToggle 캐릭터 걷기 애니메이션,loadFont() 폰트 파일 로딩,\nloadImage() 이미지 파일 로딩,preload() 이미지 및 폰트 미리 불러오기",
  "소감",
  "박지환",
  "자바로 구현하고자 하는 기능을 구현시키는 것을 넘어서 각자 만든 코드를 통합하고 전체 코드를 수정하는 작업이 생각보다 힘들었지만,\n그래도 기획 의도대로 구현한 프로그램을 보니 개발 작업에서 성취감을 많이 느낄 수 있었습니다. 프로그래밍 관련해서 지식이 부족하다보니\nai의 도움을 꽤 받았는데, 사용하면 할 수록 ai를 어떤 방식으로 써야할지 느끼게 되었습니다. 아쉬운 점이라면 깃허브를 통한 프로젝트 통합을\n해 본 경험이 없어 코드의 완성도는 떨어지지만\n 이 프로젝트가 오히려 성찰하고 배워가는 좋은 경험이 되었다고 생각합니다.",
  "오세진",
  "이번 프로젝트는 p5.js와 ml5.js의 handpose 모델을 활용하여 '환경 파괴'라는 주제를 다루는 인터랙티브 아트 프로젝트입니다.\n 키보드나 마우스 대신 '손으로 집는'  제스처를 사용하여 사용자의 몰입도를 높였으며, 캐릭터 등장 애니메이션 같은 디테일한 연출로 작품의 완성도를 높였습니다.\n 진행하면서 어려웠던 점은 픽셀 아트로 제작된 모든 요소의 위치를 자연스럽게 배치하기 위해 좌표를 일일이 수작업으로 조정하는 데 많은 시간을 소요했으며,\n 심지어 처음에는 고정된 크기로 개발했다가 전체 화면으로 전환하는 과정에서 또 위치값을 바꿔야하는 큰 어려움을 겪었습니다.\n 모든 좌표를 windowsize에 맞게 수정하며 수많은 오류를 해결해야 했습니다.\n 팀원들의 코드를 하나로 통합시키면서 완성된 작품으로 구현하며 큰 성취감을 느꼈습니다.\n 특히 픽셀 단위의 조정과 전체 화면 전환 과정에서 겪은 어려움은 향후 더 복잡한 프로젝트를 수행하는 데 있어 큰 도움이 될 것 같습니다.\n 이 경험은 기술을 활용한 인터랙티브 콘텐츠 활용 능력을 길러주기 위한 중요한 발사대 역할이 되었다고 생각합니다.",
  "임규빈",
  "조원들과 함께 환경을 보호하자를 주제로 코드를 만드는 팀프로젝트를 하게 되었습니다.\n 직접 그림를 그리고 코드를 쓰는 작업이 다소 힘들었지만 직접하면서 그림 실력과 자바스크립트의 툴과 문법들을 알아가게 되었습니다.\n 이번 팀 활동에서 코드 병합을 맡은 조원이 많이 힘들어 하는 모습을 보고 팀으로 코드를 짜게 될때는 코드를 보기 좋게 짜야한다는 조언을 얻어가게 되었습니다.",
];
let img_crykid1;
let img_crykid2;

// === 비율 스케일 관련 ===
const BASE_WIDTH = 800;
const BASE_HEIGHT = 450;
let scaleX = 1;
let scaleY = 1;

// 캐릭터 위치
let characterX ;
let characterY ;

let background_move_n = 0;
let background_move = false;

let sence = 1;

// 구름 관련 변수
let img_cloud1,img_cloud2,img_cloud3,img_cloud4,img_cloud5,img_cloud6;
let cloud_move = [200,400,600,800,1000,1200];

// 페이드 아웃 관련 변수
let fade = 0;
let fadeout_on = false;
let fadeon_on = false;
let message = ["당신이 준 물건들",
              "도끼질이 멈추지 않았고, 숲은 사라졌습니다.",
              "기름은 불을 지폈고, 그 연기는 하늘을 가렸습니다.",
              "휴대폰은 세계를 연결했지만, 채굴은 생태계를 단절시켰습니다."
              ];

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
  "A toy brings joy... but at what cost?",
  "The axe shapes progress—and clears life.",
  "Oil powers industry, and poisons air.",
  "This phone connects us,\nbut disconnects us from nature.",
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

// 잎 없는 나무 3그루 클릭 여부
let treeCut = [false, false, false]; 
let treeCut4 = [false, false, false]; 



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

  axePixel = loadImage("axe.png");
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

function setCharacterPositionByAge() {
  if (currentAge === 0) {
    // 유아기: 둥근 황토길 중심
    characterX =  350 * scaleX;
    characterY = 300 * scaleY;
  } else {
    // 나머지 캐릭터는 왼쪽에서 등장
    characterX = 50 * scaleX;
    characterY = 300 * scaleY;
  }
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

  setCharacterPositionByAge();

  objectX = 150 * scaleX;
  objectY = 300 * scaleY;

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
    state === "running" &&
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

if ((sence === 3 || sence === 4) && !fadeout_on && !fadeon_on) {
  const targets = (sence === 3) ? treeCut : treeCut4;
  if (!targets[0]) drawTreePulse(375 * scaleX, 325 * scaleY);
  if (!targets[1]) drawTreePulse(575 * scaleX, 325 * scaleY);
  if (!targets[2]) drawTreePulse(675 * scaleX, 325 * scaleY);
}


}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateScaleFactors();
  setCharacterPositionByAge();

  objectX = 650 * scaleX;
  objectY = 300 * scaleY;
}





function updateScaleFactors() {
  scaleX = width / BASE_WIDTH;
  scaleY = height / BASE_HEIGHT;
}

function drawStartScreen() {
  background1(0);
  let mainText = "Nature\nInteraction";
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
    text(subText, width / 2, height / 2 + 60 * scaleY);
    noStroke();
    fill(0);
    text(subText, width / 2, height / 2 + 60 * scaleY);
  }
}


function drawCredit() {
  textFont(koreanFont);
  fill(0,0,0,credit_bg_fade);
  rect(300 * scaleX,225 * scaleY,600 * scaleX,450 * scaleY);
  
  textAlign(CENTER, CENTER);
  textSize(20 * scaleY);
  fill(255,255,255,credit_bg_fade);
  text("CREDIT", 80 * scaleX, 20 * scaleY);
  
  switch(credit){
    case 0:
      textSize(100 * scaleY);
      text(creditTexts[0], 300 * scaleX, 200 * scaleY);
      textSize(30 * scaleY);
      text(creditTexts[1], 300 * scaleX, 300 * scaleY);
      text(creditTexts[2], 300 * scaleX, 350 * scaleY);
      break;
    case 1:
      textSize(50 * scaleY);
      text(creditTexts[3], 300 * scaleX, 200 * scaleY);
      textSize(30 * scaleY);
      text(creditTexts[4], 200 * scaleX, 300 * scaleY);
      text(creditTexts[5], 200 * scaleX, 350 * scaleY);
      text(creditTexts[6], 400 * scaleX, 300 * scaleY);
      text(creditTexts[7], 400 * scaleX, 350 * scaleY);
      break;
    case 2:
      textSize(40 * scaleY);
      text(creditTexts[9], 300 * scaleX, 50 * scaleY);
      textSize(20 * scaleY);
      text(creditTexts[10], 300 * scaleX, 150 * scaleY);
      text(creditTexts[11], 300 * scaleX, 190 * scaleY);
      textSize(40 * scaleY);
      text(creditTexts[12], 300 * scaleX, 250 * scaleY);
      textSize(15 * scaleY);
      text(creditTexts[13], 300 * scaleX, 320 * scaleY);
      break;
    case 3:
      textSize(40 * scaleY);
      text(creditTexts[14], 300 * scaleX, 50 * scaleY);
      textSize(20 * scaleY);
      text(creditTexts[15], 300 * scaleX, 100 * scaleY);
      text(creditTexts[17], 300 * scaleX, 180 * scaleY);
      text(creditTexts[19], 300 * scaleX, 330 * scaleY);
      textSize(8 * scaleY);
      text(creditTexts[16], 300 * scaleX, 150 * scaleY);
      text(creditTexts[18], 300 * scaleX, 260 * scaleY);
      text(creditTexts[20], 300 * scaleX, 380 * scaleY);
      break;
  }
  
  if(credit_bg_fade < 230){
    credit_bg_fade +=5;
  }
  credit_frame += 1;
}

function mousePressed(){
  if (state === "start") {
    state = "running";
    characterAppearAnim = true;
    characterAppearFrame = 0;
    characterAppearDone = false;
  } else {
    isGiven = true;
  }

  if (state === "running" && (sence === 3 || sence === 4)) {
    treeClicked();
  }

  if(credit_bg_fade > 50){
    credit += 1;
  }
}


function keyPressed() {
  if (keyCode === ESCAPE) {
    // 아무 동작도 하지 않음: ESC 누르면 그냥 무시
    return;
  }

  if (!fullscreen()) {
    fullscreen(true);
    return;
  }

  if (state === "start" && (key === ' ' || keyCode === ENTER)) {
    state = "running";
    characterAppearAnim = true;
    characterAppearFrame = 0;
    characterAppearDone = false;
  }

  if(credit_bg_fade > 50){
    credit += 1;
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
    image(img_cloud1,cloud_move[0] * scaleX + background_move_n * scaleX ,50 * scaleY,120 * scaleX,90 * scaleY);
    image(img_cloud2,cloud_move[1] * scaleX + background_move_n * scaleX ,70 * scaleY,150 * scaleX,120 * scaleY);
    image(img_cloud3,cloud_move[2] * scaleX + background_move_n * scaleX ,50 * scaleY,150 * scaleX,60 * scaleY);
    image(img_cloud4,cloud_move[3] * scaleX + background_move_n * scaleX ,70 * scaleY,180 * scaleX,120 * scaleY);
    image(img_cloud5,cloud_move[4] * scaleX + background_move_n * scaleX ,50 * scaleY,180 * scaleX,120 * scaleY);
    image(img_cloud6,cloud_move[5] * scaleX + background_move_n * scaleX ,70 * scaleY,120 * scaleX,80 * scaleY);
  }

  for(let i = 0; i < 6; i++){
    cloud_move[i] += -0.2 * scaleX;
    if(cloud_move[i] < -200){
      cloud_move[i] = 1000
    }
  }
  
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

function background3() {
  push();
  image(img_sky3, 400 * scaleX, 225 * scaleY, 800 * scaleX, 450 * scaleY);
  image(img_ground3, 400 * scaleX, 225 * scaleY, 800 * scaleX, 450 * scaleY);

  image(img_factory1, 130 * scaleX, 204 * scaleY, 200 * scaleX, 200 * scaleY);
  image(img_factory1, 600 * scaleX, 204 * scaleY, 200 * scaleX, 200 * scaleY);

  image(img_tree_1, 0, 190 * scaleY, 150 * scaleX, 270 * scaleY);
  image(img_cut_tree_1, 100 * scaleX, 300 * scaleY, 120 * scaleX, 120 * scaleY);
  image(img_cut_tree_1, 200 * scaleX, 280 * scaleY, 120 * scaleX, 120 * scaleY);  

  image(img_tree_2, 400 * scaleX, 170 * scaleY, 150 * scaleX, 270 * scaleY);
  if (!treeCut[0]) image(img_noleaf_tree_1, 300 * scaleX, 190 * scaleY, 150 * scaleX, 270 * scaleY);
  if (!treeCut[1]) image(img_noleaf_tree_3, 500 * scaleX, 190 * scaleY, 150 * scaleX, 270 * scaleY);
  if (!treeCut[2]) image(img_noleaf_tree_2, 600 * scaleX, 190 * scaleY, 150 * scaleX, 270 * scaleY);
  image(img_tree_1, 800 * scaleX, 190 * scaleY, 150 * scaleX, 270 * scaleY);

  image(img_noleaf_tree_3, 0, 450 * scaleY, 150 * scaleX, 270 * scaleY);
  image(img_tree_1, 100 * scaleX, 450 * scaleY, 150 * scaleX, 270 * scaleY);
  image(img_noleaf_tree_1, 300 * scaleX, 430 * scaleY, 150 * scaleX, 270 * scaleY);
  image(img_noleaf_tree_2, 400 * scaleX, 450 * scaleY, 150 * scaleX, 270 * scaleY);
  image(img_tree_4, 500 * scaleX, 450 * scaleY, 150 * scaleX, 270 * scaleY);
  image(img_noleaf_tree_3, 600 * scaleX, 450 * scaleY, 150 * scaleX, 270 * scaleY);
  image(img_cut_tree_1, 700 * scaleX, 430 * scaleY, 120 * scaleX, 120 * scaleY);  
  image(img_tree_2, 800 * scaleX, 450 * scaleY, 150 * scaleX, 270 * scaleY);

  pop();
}


function background4() {
  push();
  image(img_sky4, 400 * scaleX, 225 * scaleY, 800 * scaleX, 450 * scaleY);
  image(img_ground4, 400 * scaleX, 225 * scaleY, 800 * scaleX, 450 * scaleY);

  image(img_factory1, 130 * scaleX, 204 * scaleY, 200 * scaleX, 200 * scaleY);
  image(img_factory1, 600 * scaleX, 204 * scaleY, 200 * scaleX, 200 * scaleY);
  making_smoke(370 * scaleX, 110 * scaleY);
  image(img_factory2, 370 * scaleX, 183 * scaleY, 150 * scaleX, 150 * scaleY);

  image(img_noleaf_tree_3, 0 * scaleX + background_move_n * scaleX, 190 * scaleY, 150 * scaleX, 270 * scaleY);
  image(img_cut_tree_1, 100 * scaleX + background_move_n * scaleX, 300 * scaleY, 120 * scaleX, 120 * scaleY);
  image(img_cut_tree_1, 200 * scaleX + background_move_n * scaleX, 280 * scaleY, 120 * scaleX, 120 * scaleY);

  if (!treeCut4[0]) image(img_noleaf_tree_1, 300 * scaleX + background_move_n * scaleX, 190 * scaleY, 150 * scaleX, 270 * scaleY);
  if (!treeCut4[1]) image(img_noleaf_tree_3, 500 * scaleX + background_move_n * scaleX, 190 * scaleY, 150 * scaleX, 270 * scaleY);
  if (!treeCut4[2]) image(img_noleaf_tree_2, 600 * scaleX + background_move_n * scaleX, 190 * scaleY, 150 * scaleX, 270 * scaleY);

  image(img_noleaf_tree_1, 800 * scaleX + background_move_n * scaleX, 190 * scaleY, 150 * scaleX, 270 * scaleY);

  image(img_noleaf_tree_3, 0 * scaleX, 450 * scaleY, 150 * scaleX, 270 * scaleY);
  image(img_noleaf_tree_3, 100 * scaleX, 450 * scaleY, 150 * scaleX, 270 * scaleY);
  image(img_noleaf_tree_1, 300 * scaleX, 430 * scaleY, 150 * scaleX, 270 * scaleY);
  image(img_noleaf_tree_2, 400 * scaleX, 450 * scaleY, 150 * scaleX, 270 * scaleY);
  image(img_noleaf_tree_3, 600 * scaleX, 450 * scaleY, 150 * scaleX, 270 * scaleY);
  image(img_cut_tree_1, 700 * scaleX + background_move_n * scaleX, 430 * scaleY, 120 * scaleX, 120 * scaleY);
  image(img_noleaf_tree_2, 800 * scaleX, 450 * scaleY, 150 * scaleX, 270 * scaleY);

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
  if(credit_frame > 60 && credit_frame < 410){
    background_move_n -= 2;
    if(int(credit_frame / 10) % 2 == 1){
      image(standImgs[0],1120 * scaleX - 370 * scaleX ,320 * scaleY,70 * scaleX,70 * scaleY);
    }else{
      image(walkImgs[0],1120 * scaleX - 370 * scaleX,320 * scaleY,70 * scaleX,70 * scaleY);

    }
  }else if(credit_frame > 410){
    if(int(credit_frame / 10) % 2 == 1){
      image(img_crykid1,1120 * scaleX - 370 * scaleX ,320 * scaleY,70 * scaleX,70 * scaleY);
    }else{
      image(img_crykid2,1120 * scaleX - 370 * scaleX,320 * scaleY,70 * scaleX,70 * scaleY);

    }
  }else{
    image(standImgs[0],1120 * scaleX + background_move_n * scaleX,320 * scaleY,70 * scaleX,70 * scaleY);
  }
  
  if(background_move_n > -370){
    background_move_n -= 5;
    
  }else{
    drawCredit();
  }
  
  pop();
}
//

function fadeout() {
  push();
  fade += 8;
  fill(0, 0, 0, fade);
  noStroke();
  rect(width / 2, height / 2, width, height);

  textFont(koreanFont);
  fill(255, 255, 255, fade);         // 완전 흰색으로 변경
  textAlign(CENTER, CENTER);
  textSize(20 * scaleY);             // 글자 크기 줄임
  textWrap(CHAR);
  text(message[sence - 1], width / 2, height / 2, 600 * scaleX); // 줄바꿈 포함, 가로 제한

  if (fade >= 255) {
    fadeout_on = false;
    fadeon_on = true;
    fade = 255;
    nextCharacter();
  }
  pop();
}


function fadeon() {
  push();
  fade -= 8;
  fill(0, 0, 0, fade);
  noStroke();
  rect(width / 2, height / 2, width, height);

  textFont(koreanFont);
  fill(255, 255, 255, fade);         // 흰색 유지
  textAlign(CENTER, CENTER);
  textSize(20 * scaleY);             // 글자 크기 줄임
  textWrap(CHAR);
  text(message[sence - 2], width / 2, height / 2, 600 * scaleX); // 줄바꿈 포함

  if (fade <= 0) {
    fadeon_on = false;
    fade = 0;
  }
  pop();
}


function drawHands() {
  for (let hand of hands) {
    let indexTip = hand.keypoints.find(k => k.name === "index_finger_tip");
    if (indexTip) {
      let screenX = width - (indexTip.x / 640 * width);
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
    let thumbX = width - (thumbTip.x / 640 * width);
    let thumbY = thumbTip.y / 480 * height;
    let indexX = width - (indexTip.x / 640 * width);
    let indexY = indexTip.y / 480 * height;
    let d = dist(thumbX, thumbY, indexX, indexY);
    if (d < 70) {
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
    let indexX = width - (indexTip.x / 640 * width);
    let indexY = indexTip.y / 480 * height;
    objectX = indexX + offsetX;
    objectY = indexY + offsetY;
  }
}


function isNearObject(x, y) {
  let d = dist(x, y, objectX, objectY);

  return d < 100; // 이 값이 작으면 인식이 빡빡함
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

  switch (sence) {
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

  setCharacterPositionByAge();

  // 물건은 항상 캐릭터보다 오른쪽에 생성
  objectX = 650 * scaleX;
  objectY = 300 * scaleY;

  isGiven = false;
  objectVisible = true;
  characterAppearDone = false;
  characterAppearFrame = 0;
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

  image(
    frameToggle1 ? birdImgs[0] : birdImgs[1],
    birdX, birdY,
    60 * scaleX, 60 * scaleY
  );
}

function treeClicked() {
  if (sence !== 3 && sence !== 4) return;

  let targets = (sence === 3) ? treeCut : treeCut4;

  if (!targets[0] &&
      mouseX > 300 * scaleX && mouseX < 450 * scaleX &&
      mouseY > 190 * scaleY && mouseY < 460 * scaleY) {
    targets[0] = true;
  }

  if (!targets[1] &&
      mouseX > 500 * scaleX && mouseX < 650 * scaleX &&
      mouseY > 190 * scaleY && mouseY < 460 * scaleY) {
    targets[1] = true;
  }

  if (!targets[2] &&
      mouseX > 600 * scaleX && mouseX < 750 * scaleX &&
      mouseY > 190 * scaleY && mouseY < 460 * scaleY) {
    targets[2] = true;
  }
}


function drawTreePulse(x, y) {
  let r = 20 + sin(frameCount * 0.3) * 10;
  noFill();
  stroke(255, 215, 0, 180);
  strokeWeight(3);
  ellipse(x, y, r * scaleX, r * scaleY);
}




