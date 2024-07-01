function calculateGrade() {
    const marks = parseInt(document.getElementById(" marks").value);
    let grade;
    if (marks > 79){
        grade = "A";
    }else if (marks >= 60 && marks <= 79){
        grade = "B";
    }else if (marks >= 50 && marks <= 59){
        grade = "C";
    }else if (marks >=40 && marks <= 49){
        grade = "D";
    }else {
        grade = "E";
    }
    document.getElementById("grade").textContent=`Grade: ${grade}`;
}