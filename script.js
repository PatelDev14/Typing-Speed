
const typingText = document.querySelector('.typing-text p')
const input = document.querySelector('.wrapper .input-field')
const time = document.querySelector('.time span b')
const mistakes = document.querySelector('.mistake span')
const wpm = document.querySelector('.wpm span')
const cpm = document.querySelector('.cpm span')
const btn = document.querySelector('button')


let timer;
let maxTime= 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake =0;
let isTyping = false;


function loadParagraph(){
    const paragraph= [ "The chair sat in the corner where it had been for over 25 years. The only difference was there was someone actually sitting in it. How long had it been since someone had done that? Ten years or more he imagined. Yet there was no denying the presence in the chair now.", "It all started with the computer. Had he known what was to follow, he would have never logged on that day. But the truth was there was no way to know what was about to happen. So Dave pressed the start button, the computer booted up, the screen came alive, and everything Dave knew to be true no longer was.", "At that moment he had a thought that he'd never imagine he'd consider. I could just cheat, he thought, and that would solve the problem. He tried to move on from the thought but it was persistent. It didn't want to go away and, if he was honest with himself, he didn't want it to.", "He lifted the bottle to his lips and took a sip of the drink. He had tasted this before, but he couldn't quite remember the time and place it had happened. He desperately searched his mind trying to locate and remember where he had tasted this when the bicycle ran over his foot.", "Although Scott said it didn't matter to him, he knew deep inside that it did. They had been friends as long as he could remember and not once had he had to protest that something Joe apologized for doing didn't really matter. Scott stuck to his lie and insisted again and again that everything was fine as Joe continued to apologize. Scott already knew that despite his words accepting the apologies that their friendship would never be the same.", "She needed glasses. It wasn't that she couldn't see without them, but what she could see with them. When she wore glasses, her eyes focused so deeply that she could see not only the physical but also beyond. It was like a superpower. But she needed glasses.", "One foot in front of the other, One more step, and then one more. Jack's only thoughts were to keep moving no matter how much his body screamed to stop and rest. He's lost almost all his energy and his entire body ached beyond belief, but he forced himself to take another step. Then another. And then one more.", "Sleep deprivation causes all sorts of challenges and problems. When one doesn’t get enough sleep one’s mind doesn’t work clearly. Studies have shown that after staying awake for 24 hours one’s ability to do simple math is greatly impaired. Driving tired has been shown to be as bad as driving drunk. Moods change, depression, anxiety, and mania can be induced by lack of sleep. As much as people try to do without enough sleep it is a wonder more crazy things don’t happen in this world."];

const randomIndex = Math.floor(Math.random()*paragraph.length);
typingText.innerHTML='';
for(const char of paragraph[randomIndex]){
console.log(char);
typingText.innerHTML+= `<span>${char}</span>`;
}
typingText.querySelectorAll('span')[0].classList.add('active');
document.addEventListener('keydown',()=>input.focus());
typingText.addEventListener("click",()=>{
    input.focus()})
}


function initTyping() {
    const characters = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(input.value.length - 1);

    if (charIndex < characters.length && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }

        // Checking if the user pressed backspace
        if (input.value.length < charIndex) {
            if (characters[charIndex - 1].classList.contains('incorrect')) {
                mistake--; // Decrementing mistake count if removing an incorrect character
            }
            charIndex--; // Moving back one character
            characters[charIndex].classList.remove('correct', 'incorrect');
            characters[charIndex + 1].classList.remove('active');
            characters[charIndex].classList.add('active');
        } 
        // Normal typing
        else {
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add('correct');
                // Don't increment mistake if correcting a previous mistake
                if (characters[charIndex].classList.contains('incorrect')) {
                    characters[charIndex].classList.remove('incorrect');
                    mistake--; // Decrement mistake count when correcting
                }
            } else {
                if (!characters[charIndex].classList.contains('incorrect')) {
                    mistake++; // Only increment mistake if it wasn't already incorrect
                }
                characters[charIndex].classList.add('incorrect');
            }
            characters[charIndex].classList.remove('active');
            charIndex++;
            if (charIndex < characters.length) {
                characters[charIndex].classList.add('active');
            }
        }

        // Ensure mistake count doesn't go below 0
        mistake = Math.max(0, mistake);
        mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;
    } else {
        clearInterval(timer);
        input.value = '';
    }
}

function initTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText=timeLeft;
        let wpmVal = Math.round(((charIndex - mistake)/5) /(maxTime - timeLeft)*60);
        wpm.innerText = wpmVal;
    }
    else{
        clearInterval(timer);
    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText= timeLeft;
    input.value='';
    charIndex = 0;
    mistake =0;
    isTyping = false;
    wpm.innerText=0;
    cpm.innerText=0;
    mistakes.innerText=0;
}


input.addEventListener("input",initTyping);
btn.addEventListener("click",reset);
loadParagraph();