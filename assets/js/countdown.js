const countdownObject = document.getElementById('countdown');

const until = 1641965040000

const countdown = setInterval(() => {
    let now = Date.now()
    let diff = until - now

    console.log(diff);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = f(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const minutes = f(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = f(Math.floor((diff % (1000 * 60)) / 1000));
    const milliseconds = f2(Math.floor((diff % (1000 * 60)) / 10)).substr(2);

    countdownObject.innerHTML = diff > 0 ? `${days}d ${hours}h ${minutes}m ${seconds}s ${milliseconds}ms` : '0d 0h 0m 0s 0ms';

    if (diff < 0) {
        clearInterval(countdown);
        countdownObject.innerHTML = '0d 0h 0m 0s 0ms';
        countdownObject.style.color = 'red';
    }
}, 10);

function f(n) {
    return n.toString().padStart(2, '0');
}

function f2(n) {
    return n.toString().padStart(4, '0');
}