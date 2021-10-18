var gQuests = [
    { id: 1, opts: [], correctOptIndex: 0 },
    { id: 2, opts: [], correctOptIndex: 1 },
    { id: 3, opts: [], correctOptIndex: 1 }
];

var gCurrQuestIdx = 0;
var isGameStarted = false;


function initGame() {
    createQuests();

}

function startGame(elBtn) {
    elBtn.innerText = 'game started!';
    isGameStarted = true;
    renderQuest();
}

function createQuests() {
    gQuests[0].opts.push('statue of liberty');
    gQuests[0].opts.push('statue of vin disel');
    gQuests[0].correctOptIndex = 0;
    gQuests[1].opts.push('eifel tower');
    gQuests[1].opts.push('pyramids of gize');
    gQuests[1].correctOptIndex = 1;
    gQuests[2].opts.push('pinguin');
    gQuests[2].opts.push('polar bear');
    gQuests[2].correctOptIndex = 1;
}

function renderQuest() {
    if (isGameStarted) {
        var strHtml = '';
        strHtml += ` <img src="starter game.png"> <img src="${gCurrQuestIdx + 1}.jpg" >`;

        var elFrame = document.querySelector('.frame');
        elFrame.innerHTML = strHtml;
        strHtml = '';
        var currOpts = gQuests[gCurrQuestIdx].opts;
        for (var i = 0; i < currOpts.length; i++) {
            strHtml += `<div class="question" onclick="checkAnswer(${i})"> ${currOpts[i]} </div>`
        }
        var elQuestionFrame = document.querySelector('.questions');
        elQuestionFrame.innerHTML = strHtml;
    }
}




function checkAnswer(optIdx) {
    if (isGameStarted) {
        var answer = gQuests[gCurrQuestIdx].opts[optIdx];
        var correctIndex = gQuests[gCurrQuestIdx].correctOptIndex;
        var correctAnswer = gQuests[gCurrQuestIdx].opts[correctIndex];
        if (answer === correctAnswer) {
            gCurrQuestIdx++;
            if (gCurrQuestIdx === gQuests.length)
                victory();
            else
                renderQuest();
        }


    }
}

function victory() {
    alert('YOU HAVE WON!!');
    var elStarterButton = document.querySelector('.starter');
    elStarterButton.innerText = 'Restart!';
    gCurrQuestIdx = 0;
}

