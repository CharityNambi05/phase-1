const r2 = ('readline'). createInterface({
    input: process.stdin,
    output: process.stdout,
});

function checkSpeed(speed) {
    const speedLimit =70;
    if (speed < speedLimit) {
        console.log ("ok");
    } else {
        const demeritPoints =Math.floor((speed - speedlimit)/5);
        console.log ('points:${demeritpoints}');
        if (demeritpoints > 15){
            console.log ("license suspended");
        }
    }
}

r2.question("please enter car speed per km/h");(speed) => {
    checkSpeed(parseInt(speed));
    r2.close();
}