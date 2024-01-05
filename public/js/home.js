var inactivityTime = function () {
    var time;
    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;

    function logsOut() {
        logout();
    }

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(logMeOut, 10000000);
    }
};

window.onload = function () {
    inactivityTime();
};