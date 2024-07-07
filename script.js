let start_btn = document.getElementById("start");
let reset_btn = document.getElementById("reset");

start_btn.addEventListener('click', () => {
    let hh = parseInt(document.getElementById("hour").value) || 0;
    let mm = parseInt(document.getElementById("minute").value) || 0;
    let ss = parseInt(document.getElementById("second").value) || 0;

    let miliSecond = (hh * 60 * 60 * 1000) + (mm * 60 * 1000) + (ss * 1000);
    console.log(miliSecond);

    let stop_watch_section = document.createElement('div');
    stop_watch_section.className = 'stopwatch_panel';
    stop_watch_section.innerHTML = `
        <div class="timmer">
            <span class="close">
                <button class="close_btn">X</button>
            </span>
            <div id="time_display">HH:MM:SS:ms</div>
            <div><button class="pause_btn">Pause</button></div>
        </div>`;

    document.body.appendChild(stop_watch_section);

    let close_btn = stop_watch_section.querySelector('.close_btn');
    close_btn.addEventListener('click', () => {
        clearInterval(t);
        document.body.removeChild(stop_watch_section);
    });

    let pause_btn = stop_watch_section.querySelector('.pause_btn');
    pause_btn.addEventListener('click', () => {
        if (pause_btn.textContent === "Pause") {
            clearInterval(t);
            pause_btn.textContent = "Resume";
        } else {
            t = setInterval(set_time, 10);
            pause_btn.textContent = "Pause";
        }
    });

    function set_time() {
        if (miliSecond <= 0) {
            clearInterval(t);
            playBeep();
            return;
        }
        miliSecond -= 10;

        let hours = Math.floor(miliSecond / (1000 * 60 * 60));
        let minutes = Math.floor((miliSecond % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((miliSecond % (1000 * 60)) / 1000);
        let milliseconds = miliSecond % 1000;

        let time_display = stop_watch_section.querySelector('#time_display');
        time_display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
    }

    function playBeep() {
        let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let oscillator = audioCtx.createOscillator();
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // frequency in hertz
        oscillator.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.5); // beep for 0.5 seconds
    }

    let t = setInterval(set_time, 10);
    set_time(); // Initial call to display the time immediately
});

reset_btn.addEventListener('click', () => {
    document.getElementById("hour").value = "";
    document.getElementById("minute").value = "";
    document.getElementById("second").value = "";
});
