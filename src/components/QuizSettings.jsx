import { useEffect, useState } from "react";
import { callApi } from "../api/callApi";
import Select from "./Select";
import { startsWith } from "zod";

//  let { category, totalQuestions, difficulty, type, timeForEachQuestionInSec } =
const QuizSettings = () => {
  console.log(`Quiz Setting component render`);
  const [categories, setCategories] = useState(null);
  const [formData,setFormData] = useState({
    category:"Any Category",
    totalQuestions:5,
    difficulty:"Any Difficulty",
    type:"Any Type",
    minutes : 2,
    seconds: 0


  })
  const [loading,setLoading] = useState(false)

  const quizSettingConfig = [
  {
    label: "In which category do you want to play the quiz?",
    options: categories,
    defaultSelectedOption: "Any Category",
    labelHtmlForAndSelectId: "category",
    name: "category",
  },
  {
    label: "How difficult do you want your quiz to be?",
    options: ["Any Difficulty", "Easy", "Medium", "Hard"],
    defaultSelectedOption: "Easy",
    labelHtmlForAndSelectId: "difficulty",
    name: "difficulty",
  },
  {
    label: "Which type of questions do you want in your quiz?",
    options: ["Any Type", "Multiple Choice", "True/False"],
    defaultSelectedOption: "Any Type",
    labelHtmlForAndSelectId: "type",
    name:"type"
  },
  {
    label: "How many questions do you want in your quiz?",
    options: 20,
    numberStartsWith: 1,
    defaultSelectedOption: 5,
    labelHtmlForAndSelectId: "totalQuestions",
    name:"totalQuestions"
  },
  {
    label: "Please select the countdown time for your quiz.:Minutes",
    options: 60,
    defaultSelectedOption: 2,
    labelHtmlForAndSelectId: "minutes",
    name:"minutes"
  },
  {
    label: "seconds",
    options: 60,
    defaultSelectedOption: 0,
    labelHtmlForAndSelectId: "seconds",
    name:"seconds"
  },
];

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(formData);
    const result = await callApi("POST","/quiz/create",formData)
     setLoading(false)
    console.log(result);


  }

  useEffect(() => {
    (async () => {
      const data = await callApi("GET", "/quiz/categories");
      console.log(data);
      setCategories(data.data);
    })();
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        { categories && quizSettingConfig.map(
          ({
            label,
            defaultSelectedOption,
            labelHtmlForAndSelectId,
            name,
            options,
            numberStartsWith,
            
          },i) => (
            <Select
            key={i}
              label={label}
              defaultSelectedOption={defaultSelectedOption}
              labelHtmlForAndSelectId={labelHtmlForAndSelectId}
              name={name}
              options={options}
              numberStartsWith={numberStartsWith}
              value={formData[name]}
              setFormData={setFormData}
            />
          )
        )}
        <button disabled={loading}>{loading ? <div className="spinner"></div> : "Play Now" }</button>
      </form>
    </div>
  );
};

export default QuizSettings;
