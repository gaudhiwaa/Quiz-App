// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Button,
//   Card,
//   CardContent,
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   Radio,
//   RadioGroup,
//   Typography,
//   makeStyles,
// } from "@mui/material";

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 800,
//     margin: "auto",
//     marginTop: 20,
//   },
//   header: {
//     marginBottom: 20,
//   },
//   question: {
//     marginBottom: 10,
//   },
//   answer: {
//     marginTop: 10,
//   },
//   button: {
//     margin: "auto",
//     marginTop: 20,
//     display: "block",
//   },
// });

// const Yes = () => {
//   const classes = useStyles();
//   const [quizData, setQuizData] = useState(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userAnswers, setUserAnswers] = useState([]);

//   useEffect(() => {
//     const fetchQuizData = async () => {
//       const response = await axios.get(
//         "https://opentdb.com/api.php?amount=10&type=multiple"
//       );
//       setQuizData(response.data.results);
//     };
//     fetchQuizData();
//   }, []);

//   const handleNextQuestion = () => {
//     setCurrentQuestionIndex(currentQuestionIndex + 1);
//   };

//   const handlePreviousQuestion = () => {
//     setCurrentQuestionIndex(currentQuestionIndex - 1);
//   };

//   const handleAnswerSelect = (event) => {
//     const updatedUserAnswers = [...userAnswers];
//     updatedUserAnswers[currentQuestionIndex] = event.target.value;
//     setUserAnswers(updatedUserAnswers);
//   };

//   const renderQuestion = (question) => {
//     const answers = [...question.incorrect_answers, question.correct_answer];
//     answers.sort(() => Math.random() - 0.5);

//     return (
//       <Card className={classes.root} variant="outlined">
//         <CardContent>
//           <Typography className={classes.question} variant="h6">
//             {question.question}
//           </Typography>
//           <FormControl component="fieldset">
//             <FormLabel component="legend">Select Answer:</FormLabel>
//             <RadioGroup
//               aria-label="quiz"
//               name="quiz"
//               value={userAnswers[currentQuestionIndex] || ""}
//               onChange={handleAnswerSelect}
//             >
//               {answers.map((answer, index) => (
//                 <FormControlLabel
//                   key={index}
//                   value={answer}
//                   control={<Radio />}
//                   label={answer}
//                 />
//               ))}
//             </RadioGroup>
//           </FormControl>
//         </CardContent>
//       </Card>
//     );
//   };

//   const renderQuiz = () => {
//     const currentQuestion = quizData[currentQuestionIndex];

//     return (
//       <>
//         <Typography className={classes.header} variant="h4" align="center">
//           Quiz App
//         </Typography>
//         {renderQuestion(currentQuestion)}
//         <Button
//           className={classes.button}
//           variant="contained"
//           disabled={currentQuestionIndex === 0}
//           onClick={handlePreviousQuestion}
//         >
//           Previous
//         </Button>
//         {currentQuestionIndex === quizData.length - 1 ? (
//           <Button
//             className={classes.button}
//             variant="contained"
//             color="primary"
//             onClick={() => console.log(userAnswers)}
//           >
//             Finish
//           </Button>
//         ) : (
//           <Button
//             className={classes.button}
//             variant="contained"
//             color="primary"
//             onClick={handleNextQuestion}
//           >
//             Next
//           </Button>
//         )}
//       </>
//     );
//   }}
  

//   export default Yes
