import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { callApi } from "../api/callApi";

const QuizResult = () => {
  const [data, setData] = useState(null);


//   const fetchData = async () => {
//     try {
//         const result = await callApi("GET","/quiz/result/6925b6d40ee267d5c0a46298")
//     console.log(result);
//     } catch (error) {
//         console.log(error);
        
//     }
//   }
//   fetchData()
  useEffect(() => {
    (async () => {
      const result = await callApi(
        "GET",
        "/quiz/result/6925b6d40ee267d5c0a46298"
      );
      console.log("hereeeee");
      console.log(result);
    })();
  }, []);
  return <div>{<p>hi</p>}</div>;
};

export default QuizResult;
