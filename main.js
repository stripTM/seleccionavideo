const videosWrap = document.querySelector(".videos");
const closeButton = admin.querySelector(".close");
let videos = [];

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
            //timeoutID = setTimeout(load, Number(res.refreshTime));
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

videos.forEach(
    video => {
        video.addEventListener('click', selectVideo);
        //video.pause();
    }
)

// Formulario de administración
admin.addEventListener('click', (e) => e.target.classList.toggle('active'));
admin.addEventListener('submit', (e) => e.preventDefault());
closeButton.addEventListener('click', (e) => admin.classList.remove('active'));

load();
