console.log("Jai shree ram");
console.log("Welcome to music player");

let songs = [
    { songName: "Arijit Singh -khairiyat", filePath: "songs/romance/r0.mp3", coverPath: "../img/romance/r0.jpg" },
    { songName: "Arijit Singh -Enna Sona", filePath: "songs/romance/r1.mp3", coverPath: "../img/romance/r1.jpg" },
    { songName: "Arijit Singh -Soch Na Sake", filePath: "songs/romance/r2.mp3", coverPath: "../img/romance/r2.jpg" },
    { songName: "Arijit Singh -Channa Mereya", filePath: "songs/romance/r3.mp3", coverPath: "../img/romance/r3.jpg" },
    { songName: "Arijit Singh -Hawayein", filePath: "songs/romance/r4.mp3", coverPath: "../img/romance/r4.jpg" },
    { songName: "Arijit Singh -Agar Tum Sath Ho", filePath: "songs/romance/r5.mp3", coverPath: "../img/romance/r5.jpg" },
    { songName: "Arijit Singh -Hamdard", filePath: "songs/romance/r6.mp3", coverPath: "../img/romance/r6.jpg" },
    { songName: "Arijit Singh -Phir Kabhi", filePath: "songs/romance/r7.mp3", coverPath: "../img/romance/r7.jpg" },
    { songName: "Arijit Singh -Galti Se Mistake", filePath: "songs/romance/r8.mp3", coverPath: "../img/romance/r8.jpg" },
    { songName: "Arijit Singh -Kabira", filePath: "songs/romance/r9.mp3", coverPath: "../img/romance/r9.jpg" },
    { songName: "Arijit Singh -Naina", filePath: "songs/romance/r10.mp3", coverPath: "../img/romance/r10.jpg" },
    { songName: "Arijit Singh -Kedarnath ", filePath: "songs/romance/r11.mp3", coverPath: "../img/romance/r11.jpg" },
]
let songIndex = 0;
let playbtn = document.querySelector("#play");
let previousBtn = document.querySelector("#previous");
let nextBtn = document.querySelector("#next");
let progressElement = document.querySelector("#proccessBar");
let songTitle = document.querySelector("#song-name");
let songBanner = document.querySelector("#banner");
let audioElement = new Audio("./songs/romance/r0.mp3");
let songItems = Array.from(document.getElementsByClassName('sbtn'));
let songIcons = Array.from(document.getElementsByClassName('i'));

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
    console.log(songIndex);
    if (songIndex == 0) {
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

