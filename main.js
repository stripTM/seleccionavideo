const videosWrap = document.querySelector(".videos");
const resetButton = admin.querySelector("input[value=reset]");
const closeButton = admin.querySelector(".close");
let videos = [];
let timeoutID = null;

// Cargar los vídeos del servidor
const load = function () {
    ready = false;
    fetch('api.php').then(function (response) {
        // Convert to JSON
        return response.json();
    }).then(function (res) {
        if (res && res.videos) {
            // Asignar las fotos por primera vez
            videos = [];
            res.videos.forEach(
                item => {
                    let li = document.createElement("li");
                    li.classList.add("video");

                    let video = document.createElement("video");
                    video.autoplay = true;
                    video.loop = true;
                    video.muted = true;
                    video.addEventListener('loadeddata',
                        e => { e.target.play(); }
                    );
                    video.setAttribute("src", item.src);
                    video.setAttribute("type", "video/mp4");

                    video.addEventListener('click', selectVideo);
                    videos.push(video);

                    li.appendChild(video);
                    videosWrap.appendChild(li);
                });
        }


        ready = true;
        if (res.refreshTime) {
            //timeoutID = setTimeout(update, Number(res.refreshTime));
        }
    });
}
const selectVideo = function (e) {
    const videoSelected = e.target;
    // Parar y ocultar
    videos.forEach(
        video => {
            if (video.src !== videoSelected.src) {
                video.pause();
                video.parentElement.classList.add("hide");
            }
        });

    videoSelected.parentElement.classList.add("visible");
    videoSelected.currentTime = 0;
    videoSelected.loop = false;
    videoSelected.muted = false;
    videoSelected.play();
}

const reset = function (e) {
    ready = false;
    // request options
    const data = new URLSearchParams();
    data.append('a', 'reset');
    const options = {
        method: 'POST',
        body: data
    }
    // send POST request
    fetch('api.php', options)
        .then(res => res.json())
        .then(res => {
            videos.forEach(
                video => {
                    video.autoplay = true;
                    video.loop = true;
                    video.muted = true;
                    video.parentElement.classList.remove("hide");
                    video.parentElement.classList.remove("visible");
                    //video.pause();
                    video.play();
                }
            );
            ready = true;
        });
    e.preventDefault();
}

const update = function (e) {
    ready = false;
    fetch('api.php')
        .then(res => res.json())
        .then(res => {
            videos.forEach(
                video => {
                    // TODO
                });
            if (res.refreshTime) {
                //timeoutID = setTimeout(update, Number(res.refreshTime));
            }
            ready = true;
        });
}



// Formulario de administración
admin.addEventListener('click', (e) => e.target.classList.toggle('active'));
admin.addEventListener('submit', (e) => e.preventDefault());
resetButton.addEventListener('click', reset);
closeButton.addEventListener('click', (e) => admin.classList.remove('active'));

load();
