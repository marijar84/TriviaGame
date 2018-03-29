$(document).ready(function () {

    var questionList = [];

    var setTimeOutAnswer;
    var interval = 3000;

    var time;
    var intervalTime = 1000;
    var countTime = 13;

    var countQuestion = 0;

    var countWin = 0;
    var countLoose = 0;

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
                options: ["English", "Sindhi", "Spanish"],
            },
            {
                text: "Country that has the highest in Barley Production",
                answer: "Russia",
                options: ["USA", "China", "Russia"],
            },
            {
                text: "Mount Everest is located in",
                answer: "Nepal",
                options: ["Nepal", "Bhutan", "New Delhi"],
            },
            {
                text: "What is the capital city of Spain?",
                answer: "Madrid",
                options: ["Barcelona", "Madrid", "Bilbao"],
            },
            {
                text: "In 2011, which country hosted a Formula 1 race for the first time?",
                answer: "India",
                options: ["India", "Paris", "Rome"],
            },
            {
                text: "How many valves does a trumpet have?",
                answer: "Three",
                options: ["Two", "Three", "Four"],
            },
            {
                text: "When did Margaret Thatcher become Prime Minister?",
                answer: "1979",
                options: ["1980", "1976", "1979"],
            },
            {
                text: "Who invented TV?",
                answer: "George Carey",
                options: ["Thomas Alva Edison", "George Carey", "Nicola Tesla"],
            }];
    }

    function timeQuestion() {
        if (countQuestion != questionList.length) {
            countTime--;
            $("#time").text(countTime);

            if (countTime == 1) {
                countLoose++;
                visibleAnswer(false, true);
            }
        }
        else{
            clearInterval(time);
        }
    }


    function drawQuestion() {
        if (countQuestion == questionList.length) {
            clearTimeout(time);
            clearTimeout(setTimeOutAnswer);
            time = null;
            setTimeOutAnswer = null;
            $("#container_start").css("visibility", "visible");
            $("#container_question").css("visibility", "hidden");
            $("#start").text("Restart");

            $("#correctAnswer").text("Correct Answer: " + countWin);
            $("#incorrectAnswer").text("Incorrect Answer: " + countLoose);
            $("#result").css("visibility", "visible");

        } else {
            var question = questionList[countQuestion].text;
            var answer1 = questionList[countQuestion].options[0];
            var answer2 = questionList[countQuestion].options[1];
            var answer3 = questionList[countQuestion].options[2];

            $("#questionlabel").text(question);
            $("#labelAsnwer1").text(answer1);
            $("#labelAsnwer1").css('background', '#ffffff');
            $("#customRadio1").prop('checked', false);
            $("#customRadio1").attr("value", answer1);

            $("#labelAsnwer2").text(answer2);
            $("#labelAsnwer2").css('background', '#ffffff');
            $("#customRadio2").attr("value", answer2);
            $("#customRadio2").prop('checked', false);

            $("#labelAsnwer3").text(answer3);
            $("#labelAsnwer3").css('background', '#ffffff');
            $("#customRadio3").attr("value", answer3);
            $("#customRadio3").prop('checked', false);
        }
    }

    $("body").on('change', ".custom-radio", function (e) {
        var userSelected = e.target.value;
        var rightAnswer = questionList[countQuestion].answer;

        if (userSelected === questionList[countQuestion].answer) {
            countWin++;
            visibleAnswer(true, false);
        }
        else {
            countLoose++;
            visibleAnswer(false, false);
        }
    });

    $("body").on('click', "#start", function (e) {
        console.log("Question");
        countQuestion = 0;
        countWin = 0;
        countLoose = 0;
        $("#container_question").css("visibility", "visible");
        $("#container_start").css("visibility", "hidden");
        $("#result").css("visibility", "hidden");

        initializeData();
        drawQuestion();

        time = setTimeout(timeQuestion, intervalTime);
    });

    function rightAnswer() {
        var label1 = $("#labelAsnwer1").text();
        var label2 = $("#labelAsnwer2").text();
        var label3 = $("#labelAsnwer3").text();

        var answer = questionList[countQuestion].answer;

        if (label1 === answer) {
            $("#labelAsnwer1").css('background', '#00ab6f');
        } else if (label2 === answer) {
            $("#labelAsnwer2").css('background', '#00ab6f');
        } else if (label3 === answer) {
            $("#labelAsnwer3").css('background', '#00ab6f');
        }
    }

    function nextAnswer() {

        clearTimeout(setTimeOutAnswer);
        setTimeOutAnswer = null;

        countTime = 13;
        $("#time").text = countTime;

        $("#popup").css("visibility", "hidden");

        countQuestion++;

        drawQuestion();

        time = setInterval(timeQuestion, intervalTime);
    }


    function visibleAnswer(isAnswer, isTimeOut) {
        console.log("Repeat");
        $("#popup").css("visibility", "visible");

        clearTimeout(time);
        time = null;

        if (isTimeOut) {
            $("#answerSelected").text("Ooooppsss sorry!");
            $("#initialtitle").text("Time is out");

            rightAnswer();
        } else {

            if (isAnswer) {
                $("#answerSelected").text("Congratulations!");
                $("#initialtitle").text("You choose the right answer");
            }
            else {
                $("#answerSelected").text("Ooooppsss sorry!");
                $("#initialtitle").text("Bad answer");

                rightAnswer();
            }
        }
        setTimeOutAnswer = setTimeout(nextAnswer, interval);
    }
});