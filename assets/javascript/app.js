$(document).ready(function () {
    //Question List
    var questionList = [];

    //Timeout when the user select an answer
    var setTimeOutAnswer;
    var interval = 3000;

    //Timeout for time remaining
    var time;
    var intervalTime = 1000;
    var countTime = 13;

    //To know what is the question
    var countQuestion = 0;

    //To count when the user select correct or incorrect answer
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

    //Allows to count the time remaining
    function timeQuestion() {
        //If is different is because the user have not responded all questions
        if (countQuestion != questionList.length) {
            countTime--;
            $("#time").text(countTime);

            //If countTime is zero is because the time finished
            if (countTime == 1) {
                countLoose++;
                visibleAnswer(false, true);
            }
        }
        //The responded all question, and we have to stop timer
        else {
            clearInterval(time);
        }
    }

    //Allows to draw the question with answers
    function drawQuestion() {
        //The user responded all question and we have to clean the timer and data
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

        }
        //Shows the user the next question
        else 
        {
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

    //click event in radio button
    $("body").on('change', ".custom-radio", function (e) {
        var userSelected = e.target.value;
        var rightAnswer = questionList[countQuestion].answer;

        //Validate is the user selected the right answer
        if (userSelected === questionList[countQuestion].answer) {
            //Count win increment in 1, because the answer is correct
            countWin++;
            //The first parameter is when the answer is correct
            //The second parameter is when th time finished
            visibleAnswer(true, false);
        }
        else {
            //Count loose increment in 1, because the answer is incorrect
            countLoose++;
             //The first parameter is when the answer is incorrect
            //The second parameter is when th time finished
            visibleAnswer(false, false);
        }
    });

    $("body").on('click', "#start", function (e) {
        //Initialize data again because is th first time
        countQuestion = 0;
        countWin = 0;
        countLoose = 0;
        countTime = 13;
        $("#container_question").css("visibility", "visible");
        $("#container_start").css("visibility", "hidden");
        $("#result").css("visibility", "hidden");

        initializeData();
        drawQuestion();

        time = setInterval(timeQuestion, intervalTime);
    });

    //Allows to validate which is the correct answuer and show the user    
    function rightAnswer() {
        //Get Text for each label
        var label1 = $("#labelAsnwer1").text();
        var label2 = $("#labelAsnwer2").text();
        var label3 = $("#labelAsnwer3").text();

        //Get the answer 
        var answer = questionList[countQuestion].answer;

        //Validate the answer and select the answer in html page
        if (label1 === answer) {
            $("#labelAsnwer1").css('background', '#00ab6f');
        } else if (label2 === answer) {
            $("#labelAsnwer2").css('background', '#00ab6f');
        } else if (label3 === answer) {
            $("#labelAsnwer3").css('background', '#00ab6f');
        }
    }

    //Allows to show the next question, this is happend when time finished
    function nextAnswer() {

        //Clear popup timer
        clearTimeout(setTimeOutAnswer);
        setTimeOutAnswer = null;

         //Hidde popup
         $("#popup").css("visibility", "hidden");

        //Set count in 13 again
        countTime = 13;
        $("#time").text = countTime;       

        //Increment in 1 to show the next question
        countQuestion++;

        //Draw question
        drawQuestion();

        //Clear and set question timer
        clearTimeout(time);
        time = setInterval(timeQuestion, intervalTime);
    }

    //Validates when the user select the answer
    function visibleAnswer(isAnswer, isTimeOut) {
        $("#popup").css("visibility", "visible");

        //Clear question timer
        clearTimeout(time);
        time = null;

        //When the time finished
        if (isTimeOut) {
            $("#answerSelected").text("Ooooppsss sorry!");
            $("#initialtitle").text("Time is out");

            //Show the correct answer
            rightAnswer();
        } else {
            //When the user select answer
            //Answer is correct, set text
            if (isAnswer) {
                $("#answerSelected").text("Congratulations!");
                $("#initialtitle").text("You choose the right answer");
            }
            //Answer is incorrect, set text
            else {
                $("#answerSelected").text("Ooooppsss sorry!");
                $("#initialtitle").text("Bad answer");

                rightAnswer();
            }
        }
        setTimeOutAnswer = setTimeout(nextAnswer, interval);
    }
});