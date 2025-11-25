import { useEffect, useRef, useState } from "react";
import { callApi } from "../api/callApi";
import correctIcon from "../assets/correct.svg"
import wrongIcon from "../assets/wrong.svg"

const Quiz = () => {
  const [quizData, setQuizData] = useState({
    quizId: null,
    totalQuestions: null,
    currentQuestionNumber: null,
  });
  const [question, setQuestion] = useState(null);
  
  ///////
  const [correctAndUserChosenOption,setCorrectAndUserChosenOption] = useState({
    userChosenOption:null,
    correctOption:null,
  })
useEffect(() => {
    if(question?.isAttempt){
    // if(question.isCorrect){
      console.log("sahi ");
      console.log("here");
      setCorrectAndUserChosenOption({correctOption:question.correctAnswer,userChosenOption:question.userChosenOption})

    // }
//     else{
// console.log("galat");

//     }
  }
},[question])


console.log({correctAndUserChosenOption});



  const getNextQuestion = () => {
    setQuizData((prevState) => ({
      ...prevState,
      currentQuestionNumber: prevState.currentQuestionNumber + 1,
    }));
  };
  const getPreviousQuestion = () => {
    setQuizData((prevState) => ({
      ...prevState,
      currentQuestionNumber: prevState.currentQuestionNumber - 1,
    }));

  };

  // const showCorrectOrWrongQuestionAttemptedState = (option) => {
  //   console.log(`option :::::${option}`);
  //   console.log("running showCorrectOrWrongQuestionAttemptedState");
  //   const {isCorrect} = setCorrectAndUserChosenOption
  //   if(isCorrect === true && userChosenOption === option){
  //     return "correct"

  //   }else if(isCorrect === false && userChosenOption === option){
  //     return "wrong"

  //   }


  // }
  const handleOptionsClick = async (option) => {
    console.log("user clicked on this option : ",option);
    const data = await callApi("POST", `/quiz/check-ans/${quizData.currentQuestionNumber}`, {
      userSelectedOption: option,
      quizId:quizData.quizId,
    });
    console.log(`data from api call /quiz/check/ans/${quizData.currentQuestionNumber}`,data);
    console.log("data.isCorrect",data.isCorrect);
    // return 
    // //correct case
    // if(data.isCorrect){
    //   setCorrectAndUserChosenOption({
    // userChosenOption:option,
    // correctOption:option,
    // isCorrect:true
    //   })
    //   // setCorrectAndUserChosenOption({isCorrect:true,userChosenOption:option})
    
    // }else{
    //   setCorrectAndUserChosenOption({isCorrect:false,userChosenOption:option,correctOption:data.correctAnswer})

    // }
  };

  useEffect(() => {
    (async () => {
      const data = await callApi("GET", "/quiz/start");

      setQuizData({
        quizId: data.data.quizId,
        totalQuestions: data.data.totalQuestions,
        currentQuestionNumber:1,
      });
    })();
  }, []);
  useEffect(() => {
    if (!quizData.quizId) return;
    (async () => {
      const data = await callApi(
        "POST",
        `/quiz/question/${quizData.currentQuestionNumber}`,
        {
          quizId: quizData.quizId,
        }
      );
      setQuestion(data.data);
    })();
  }, [quizData]);
  return (
    <div>
      {question && (
        <div>
          <div>
            <p>{question.questionNumber}</p>
            <p>{question.question}</p>
          </div>
          <div className="options-container">
            {question.options.map((option, i) => (
              <div key={i} className={`option-container ${correctAndUserChosenOption.correctOption === option ? "correct" : correctAndUserChosenOption.userChosenOption === option ? "wrong" : ""} `} >
               <p onClick={() => {handleOptionsClick(option)}}> {option}</p>

              </div>
            ))}
          </div>
          <div>
            <div>
              <button
                onClick={getPreviousQuestion}
                className={
                  quizData.currentQuestionNumber === 1 ? "disabled" : ""
                }
                disabled={quizData.currentQuestionNumber === 1}
              >
                Previous
              </button>
            </div>
            {quizData.totalQuestions <= quizData.currentQuestionNumber ? (
              <div>
                <button>Result</button>
              </div>
            ) : (
              ""
            )}

            <div>
              <button
                onClick={getNextQuestion}
                className={
                  quizData.totalQuestions <= quizData.currentQuestionNumber
                    ? "disabled"
                    : ""
                }
                disabled={
                  quizData.totalQuestions <= quizData.currentQuestionNumber
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
