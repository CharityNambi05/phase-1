const r1 = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

function studentGrade(mark) {
    if (mark > 79) {
        return 'A'
    } else if (mark >= 60) {
        return 'B'
    } else if (mark >= 50) {
        return 'C'
    } else if (mark >= 40) {
        return 'D'
    } else {
        return 'E'
    }
}

r1.question("please enter the student mark ", function (input) {
    const mark = Number(input)
    if (isNaN(mark) || mark > 100 || mark < 0) {
        console.log('invalid mark')
    } else {
        const grade = studentGrade(mark)
        console.log('the grade is ' + grade)
    }
    r1.close()
})