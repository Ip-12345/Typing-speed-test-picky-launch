const typingtext = document.querySelector('.typing-text p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span');
const mistake = document.querySelector('.mistake span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');

//setvalues
let timer;
let maxtime = 60;
let timeleft = maxtime;
let istyping = false;
let charindex = 0;
let mistakes = 0;

function loadpara() {
    const para = ["Avoid daydreaming about the years to come.", "You are the most important person in your whole life.",
        "Always be true to who you are, and ignore what other people have to say about you.", 
        "Only demonstrate your strength when it's really required.","Rip digger and evolve the core.", 
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus quas nam aperiam tempora.",
        "Welcome to the picky's typing test"];
    
    const randomIndex= Math.floor(Math.random()*para.length);
    typingtext.innerHTML='';
    for(const char of para[randomIndex]){
        typingtext.innerHTML += `<span>${char}</span>`;
    }
    typingtext.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown', () => input.focus());
    typingtext.addEventListener('click', () => input.focus());
}

function inittyping(){
    const char = typingtext.querySelectorAll('span');
    const typedchar = input.value.charAt(charindex);
    if(charindex < char.length && timeleft > 0){
        if(!istyping){
            timer = setInterval(inittime, 1000);
            istyping = true;
        }

        if(char[charindex].innerText === typedchar){
            char[charindex].classList.add('correct');
        }
        else{
            mistakes++;
            char[charindex].classList.add('incorrect');
        }
        charindex++;
        char[charindex].classList.add('active');
        mistake.innerHTML = mistakes;
        cpm.innerText = charindex - mistakes;
    }
    else{
        clearInterval(timer);
        input.value = '';
    }
}

function inittime(){
    if(timeleft>0){
        timeleft--;
        time.innerText = timeleft;
        const wpmval = Math.round(((charindex - mistakes)/5) /(maxtime - timeleft)*60);
        wpm.innerText = wpmval;
    }
    else{
        clearInterval(timer);
    }
}

function reset(){
    loadpara();
    clearInterval(timer);
    timeleft = maxtime;
    let charindex = 0;
    let mistakes = 0;
    let istyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistake.innerText = 0;
    time.innerText = timeleft;
    input.value = '';
}

input.addEventListener("input", inittyping);
btn.addEventListener('click', reset);
loadpara();