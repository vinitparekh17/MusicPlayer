console.log("Jai shree ram");
console.log("Welcome to music player");

let songs = [
    { songName: "Arijit Singh -khairiyat", filePath: "songs/0.mp3", coverPath: "img/0.jpg" },
    { songName: "Arijit Singh -Enna Sona", filePath: "songs/1.mp3", coverPath: "img/1.jpg" },
    { songName: "Arijit Singh -Soch Na Sake", filePath: "songs/2.mp3", coverPath: "img/2.jpg" },
    { songName: "Arijit Singh -Channa Mereya", filePath: "songs/3.mp3", coverPath: "img/3.jpg" },
    { songName: "Arijit Singh -Hawayein", filePath: "songs/4.mp3", coverPath: "img/4.jpg" },
    { songName: "Arijit Singh -Agar Tum Sath Ho", filePath: "songs/5.mp3", coverPath: "img/5.jpg" },
    { songName: "Arijit Singh -Hamdard", filePath: "songs/6.mp3", coverPath: "img/6.jpg" },
    { songName: "Arijit Singh -Phir Kabhi", filePath: "songs/7.mp3", coverPath: "img/7.jpg" },
    { songName: "Arijit Singh -Galti Se Mistake", filePath: "songs/8.mp3", coverPath: "img/8.jpg" },
    { songName: "Arijit Singh -Kabira", filePath: "songs/9.mp3", coverPath: "img/9.jpg" },
    { songName: "Arijit Singh -Naina", filePath: "songs/10.mp3", coverPath: "img/10.jpg" },
    { songName: "DJ Gimi-O x habibi", filePath: "songs/11.mp3", coverPath: "img/11.jpg" },
    { songName: "French Montana -Unforgettable", filePath: "songs/12.mp3", coverPath: "img/12.jpg" },
    { songName: "LSD -Genius", filePath: "songs/13.mp3", coverPath: "img/13.jpg" },
    { songName: "Sean Paul -No Lie", filePath: "songs/14.mp3", coverPath: "img/14.jpg" },
    { songName: "Sean Paul -Go down deh", filePath: "songs/15.mp3", coverPath: "img/15.jpg" },
    { songName: "Danger twins -Thing of Beauty", filePath: "songs/16.mp3", coverPath: "img/16.jpg" },
    { songName: "Tick Tick Boom", filePath: "songs/17.mp3", coverPath: "img/17.jpg" },
    { songName: "Burak Yeter - Tuesday", filePath: "songs/18.mp3", coverPath: "img/18.jpg" },
    { songName: "Dua Lipa - Love Again", filePath: "songs/19.mp3", coverPath: "img/19.jpg" },
]
let songIndex = 0;
let playbtn = document.querySelector("#play");
let previousBtn = document.querySelector("#previous");
let nextBtn = document.querySelector("#next");
let progressElement = document.querySelector("#proccessBar");
let songTitle = document.querySelector("#song-name");
let songBanner = document.querySelector("#banner");
let audioElement = new Audio("./songs/0.mp3");
let songItems = Array.from(document.getElementsByClassName('sbtn'));
let songIcons = Array.from(document.getElementsByClassName('i'));
// console.log(songItems);

// console.log(audioElement);

// play pause button 
function playPause() {
    if (audioElement.paused) {
        audioElement.play();
        playbtn.classList.add("fa-pause");
        playbtn.classList.remove("fa-play");
        songBanner.classList.add("animate");
        songIcons[songIndex].classList.add('fa-cicle-pause')
        songIcons[songIndex].classList.remove('fa-cicle-play')
        console.log(songIndex);
    } else {
        audioElement.pause();
        playbtn.classList.remove("fa-pause");
        playbtn.classList.add("fa-play");
        songBanner.classList.remove("animate")
    }
}

function keyEvent(key) {
    switch (key) {
        case " ":
            if (audioElement.paused) {
                audioElement.play();
                playbtn.classList.add("fa-pause");
                playbtn.classList.remove("fa-play");
                songBanner.classList.add("animate");
            } else {
                audioElement.pause();
                playbtn.classList.remove("fa-pause");
                playbtn.classList.add("fa-play");
                songBanner.classList.remove("animate")
            }
            break;
        case "Enter":
            if (audioElement.paused) {
                audioElement.play();
                playbtn.classList.add("fa-pause");
                playbtn.classList.remove("fa-play");
                songBanner.classList.add("animate");
            } else {
                audioElement.pause();
                playbtn.classList.remove("fa-pause");
                playbtn.classList.add("fa-play");
                songBanner.classList.remove("animate")
            }
            break;
        default:
            return;
    }
}

// update progressbar 
function progressTime() {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressElement.value = progress;
}
// change progressBar
function changeProgress() {
    audioElement.currentTime = ((progressElement.value * audioElement.duration) / 100)
}

// next button 
function nextFunction() {
    if (songIndex == songs.length -1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    songTitle.textContent = songs[songIndex].songName;
    songBanner.src = songs[songIndex].coverPath;
    songBanner.classList.add('animate');
    playbtn.classList.add('fa-pause');
    playbtn.classList.remove('fa-play');
    audioElement.play();
}

function previousFunction() {
    if (songIndex <= 0) {
        songIndex = songs.length -1;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    songTitle.textContent = songs[songIndex].songName;
    songBanner.src = songs[songIndex].coverPath;
    songBanner.classList.add('animate');
    playbtn.classList.add('fa-pause');
    playbtn.classList.remove('fa-play');
    audioElement.play();
}

// play songs by it's thumbnail section

// maintaining default icon
const allPlay = () => {
    songIcons.map(e => {
        e.classList.add('fa-circle-play')
        e.classList.remove('fa-circle-pause')
    })
}
// changing song by id
songItems.map(element => {
    element.addEventListener("click", e => {
        allPlay();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        songIndex = parseInt(element.id);
        songTitle.textContent = songs[songIndex].songName;
        songBanner.classList.add('animate')
        audioElement.src = songs[songIndex].filePath;
        songBanner.src = songs[songIndex].coverPath;
        audioElement.currentTime = 0;
        audioElement.play();
        playbtn.classList.add("fa-pause");
        playbtn.classList.remove("fa-play");
    })
})

// event listneners
playbtn.addEventListener("click", playPause);
audioElement.addEventListener("timeupdate", progressTime);
progressElement.addEventListener("change", changeProgress);
document.addEventListener("keydown", e => keyEvent(e.key));
nextBtn.addEventListener("click", nextFunction);
previousBtn.addEventListener("click", previousFunction);    

