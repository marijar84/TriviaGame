

$(document).ready(function () {

    var questionList = [];
    var setTimeOutAnswer;
    var interval = 3000;

    var changeQuestion;
    var intervalQuestion = 10000;

    var time;
    var intervalTime = 1000;
    var countTime = 13;

    var countQuestion = 0;

    var i = 0;   
    
    changeQuestion = setInterval(drawQuestion, intervalQuestion);
    time = setInterval(timeQuestion, intervalTime);

    //Data game
    function initializeData() {
        questionList = [
            {
                text: "The most populous city in the world is",
                answer: "Tokyo",
                options: ["Rusia", "Oslo", "Tokyo"],
            },
            {
                text: "The language spoken by the people by Pakistan is",
                answer: "Sindhi",
                options: ["English", "Spanish", "Sindhi"],
            },
            {
                text: "TCountry that has the highest in Barley Production",
                answer: "Russia",
                options: ["USA", "China", "Russia"],
            },
            {
                text: "Mount Everest is located in",
                answer: "Nepal",
                options: ["Nepal", "Bhutan", "New Delhi"],
            },
            {
                text: "The most populous city in the world is",
                answer: "Tokyo",
                options: ["Rusia", "Oslo", "Copenhagen", "Tokio"],
            },
            {
                text: "The most populous city in the world is",
                answer: "Tokyo",
                options: ["Rusia", "Oslo", "Copenhagen", "Tokio"],
            },
            {
                text: "The most populous city in the world is",
                answer: "Tokyo",
                options: ["Rusia", "Oslo", "Copenhagen", "Tokio"],
            },
            {
                text: "The most populous city in the world is",
                answer: "Tokyo",
                options: ["Rusia", "Oslo", "Copenhagen", "Tokio"],
            },
            {
                text: "The most populous city in the world is",
                answer: "Tokyo",
                options: ["Rusia", "Oslo", "Copenhagen", "Tokio"],
            }];
    }

    function timeQuestion(){
        countTime--;
        $("#time").text(countTime);

        if(countTime = 0){
            drawQuestion();
        }
    }


    function drawQuestion() {
        var question = questionList[countQuestion].text;
        var answer1 = questionList[countQuestion].options[0];
        var answer2 = questionList[countQuestion].options[1];
        var answer3 = questionList[countQuestion].options[2];

        $("#questionlabel").text(question);
        $("#labelAsnwer1").text(answer1);
        $("#customRadio1").attr("value", answer1);
        $("#labelAsnwer2").text(answer2);
        $("#customRadio2").attr("value", answer2);
        $("#labelAsnwer3").text(answer3);
        $("#customRadio3").attr("value", answer3); 
        
        countQuestion++;
    }

    function initialize() {
        $("#time").text(countTime);
        clearInterval(intervalAnswer);
    }

    initializeData();
    drawQuestion();

    $("body").on('change', ".custom-radio", function (e) {
        var userSelected = e.target.value;
        var rightAnswer = questionList[countQuestion].answer;


        console.log(userSelected);
        console.log(rightAnswer);


        if (userSelected === questionList[countQuestion].answer) {
            console.log("Good Answer");
            visibleAnswer(true);
        }
        else {
            console.log("wrong answer");
            visibleAnswer(false);
        }
    });

    function timeOutAnswer(isAnswer) {
        console.log(i++);
        if(isAnswer){

        }
        else{

        }
        $("#popup").css("visibility", "hidden");
        clearInterval(setTimeOutAnswer);
    }
   

    function visibleAnswer(isAnswer) {
        console.log("Repeat");
        $("#popup").css("visibility", "visible");

        setTimeOutAnswer = setInterval(timeOutAnswer, interval);

        if (isAnswer) {
            $("#answerSelected").text("Congratulations");
            $("#initialtitle").text("You choose the right answer");
        }
        else {
            $("#answerSelected").text("Ooooppsss sorry!");
            $("#initialtitle").text("Bad answer");
        }
        setTimeOutAnswer = setTimeout(timeOutAnswer, interval);
    }
});