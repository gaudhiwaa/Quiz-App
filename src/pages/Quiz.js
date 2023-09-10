// import { Box } from '@mui/material';
// import React from 'react';
// import { useParams } from "react-router-dom";

// const Quiz = () => {
//     const { id } = useParams();
//   return (
//     <Box>
//      HAI {id}
//     </Box>
//   );
// };

// export default Quiz;
import MyContext from "../util/MyContext";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  Typography,
  Container,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import quiz from "../data/quiz.json";
import QuizRoundedLogo from "../img/QuizRoundedLogo";
import ClockRoundedLogo from "../img/ClockRoundedLogo";
import RatingRoundedLogo from "../img/RatingRoundedLogo";
import { useNavigate } from "react-router-dom";

function Quiz({}) {
  // https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple
  // categoryNum, difficulty masukin ke dalam route
  const { id, category } = useParams();
  const { search } = useLocation();
  const [quizData, setQuizData] = useState(undefined);
  const [quizPages, setQuizPages] = useState(-1);
  const params = new URLSearchParams(search);
  const navigate = useNavigate()
  

  const categoryId = params.get("category");
  const difficulty = params.get("difficulty");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    const targetObject = quiz[category].find((obj) => obj.id === parseInt(id));
    setQuizData(targetObject);
    async function fetchQuestions() {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=multiple`
      );
      const data = await response.json();
      setQuestions(data.results);
    }
    fetchQuestions();
  }, []);

  useEffect(() => {
    const storedAnswer = localStorage.getItem(`question-${currentQuestion}`);
    if (storedAnswer) {
      setSelectedAnswer(storedAnswer);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (timeLeft === 0) {
      return;
    }

    if (quizPages !== -1) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timeLeft, quizPages]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      localStorage.setItem(`question-${currentQuestion}`, selectedAnswer);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }
  };

  const handlePreviousQuestion = () => {
    localStorage.setItem(`question-${currentQuestion}`, selectedAnswer);
    setCurrentQuestion(currentQuestion - 1);
    setSelectedAnswer(null);
  };

  const handleAnswerSelection = (event) => {
    
    const selected = event.target.value;
    setSelectedAnswer(selected);
    const isCorrect = selected === currentQuizQuestion.correct_answer;

    if (selectedAnswer !== null) {
        
      const wasCorrect = selectedAnswer === currentQuizQuestion.correct_answer;
      if (isCorrect && !wasCorrect) {
        setScore(score + 1);
        
      } else if (!isCorrect && wasCorrect) {
        setScore(score - 1);
      }
    } else if (isCorrect) {
      setScore(score + 1);
    //   setEmptyScore(emptyScore - 1)
    } 

    localStorage.setItem(`question-${currentQuestion}`, selected);
  };

  if (questions.length === 0) {
    return (
      <MyContext.Consumer>
        {(context) => (
          <Box
            sx={{
              width: context.windowSize.width,
              height: context.windowSize.height,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(122.76deg, #3550DC -35.72%, #27E9F7 172.73%)",
            }}
          >
            <Typography
              sx={{ fontSize: "20px", fontWeight: "600", color: "white" }}
            >
              Loading ...
            </Typography>
          </Box>
        )}
      </MyContext.Consumer>
    );
  }

  const handleSubmit = () => {
    setQuizPages(99)
  }

  const currentQuizQuestion = questions[currentQuestion];

  return (
    <MyContext.Consumer>
      {(context) => (
        <div>
          <Box
            sx={{
              background:
                "linear-gradient(122.76deg, #3550DC -35.72%, #27E9F7 172.73%)",
              height: context.windowSize.height,
              display: "flex",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Box sx={{ width: "80%" }}>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "60px 0px 30px 0px",
                  }}
                >
                  {quizData ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={quizData.photo}
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "8px",
                        }}
                      />
                      <Box sx={{ color: "#FFFFFF", ml: "20px" }}>
                        <Typography sx={{ fontSize: "30px", fontWeight: 700 }}>
                          {quizData.name}
                          {/* {console.log(quizData)} */}
                        </Typography>
                        <Typography sx={{ fontSize: "14px", ml: "2px" }}>
                          Get 100 points
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    <MoreHorizIcon sx={{ fontSize: "82px" }} />
                  )}
                  {/* <AccountCircleIcon
                    sx={{ color: "white", fontSize: "44px" }}
                  /> */}
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "35px",
                      fontWeight: 700,
                      mr: "5px",
                    }}
                  >
                    {minutes}:{seconds < 10 ? "0" : ""}
                    {seconds}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  background: "white",
                  height: "1000px",
                  mt: "5px",
                  borderRadius: "25px",
                  padding: "30px",
                }}
              >
                {quizPages === -1 ? (
                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Box
                        sx={{
                          background:
                            "linear-gradient(122.76deg, #3550DC -35.72%, #27E9F7 172.73%)",
                          borderRadius: "10px",
                          width: "15%",
                          height: "4px",
                          mt: "-5px",
                          mb: "24px",
                        }}
                      />
                    </Box>
                    <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
                      Brief explanation about this quiz
                    </Typography>
                    <Box>
                      <Box sx={{ display: "flex", mt: "16px" }}>
                        <Box>
                          <QuizRoundedLogo />
                        </Box>
                        <Box sx={{ ml: "16px" }}>
                          <Typography sx={{ fontWeight: "bold" }}>
                            10 Questions
                          </Typography>
                          <Typography>
                            10 points for a correct answer
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", mt: "16px" }}>
                        <Box>
                          <ClockRoundedLogo />
                        </Box>
                        <Box sx={{ ml: "16px" }}>
                          <Typography sx={{ fontWeight: "bold" }}>
                            10 Minutes
                          </Typography>
                          <Typography>Total duration of the quiz</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", mt: "16px" }}>
                        <Box>
                          <RatingRoundedLogo />
                        </Box>
                        <Box sx={{ ml: "16px" }}>
                          <Typography sx={{ fontWeight: "bold" }}>
                            {difficulty.charAt(0).toUpperCase() +
                              difficulty.slice(1)}
                          </Typography>
                          <Typography>Difficulty level of the quiz</Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Typography sx={{ fontWeight: 700, mt: "24px" }}>
                      Please read the text below carefully so you can understand
                      it
                    </Typography>
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: "12px",
                        }}
                      >
                        <Box
                          sx={{
                            background: "#333333",
                            width: "8px",
                            height: "8px",
                            borderRadius: "100%",
                            mr: "16px",
                          }}
                        />
                        <Typography>
                          10 point awarded for a correct answer and no marks for
                          a incorrect answer
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: "12px",
                        }}
                      >
                        <Box
                          sx={{
                            background: "#333333",
                            width: "8px",
                            height: "8px",
                            borderRadius: "100%",
                            mr: "16px",
                          }}
                        />
                        <Typography>
                          Tap on options to select the correct answer
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: "12px",
                        }}
                      >
                        <Box
                          sx={{
                            background: "#333333",
                            width: "8px",
                            height: "8px",
                            borderRadius: "100%",
                            mr: "16px",
                          }}
                        />
                        <Typography>
                          Tap on the bookmark icon to save interesting questions
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: "12px",
                        }}
                      >
                        <Box
                          sx={{
                            background: "#333333",
                            width: "8px",
                            height: "8px",
                            borderRadius: "100%",
                            mr: "16px",
                          }}
                        />
                        <Typography>
                          Click submit if you are sure you want to
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        bottom: "3%",
                        left: 0,
                        position: "fixed",
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          textTransform: "none",
                          borderRadius: "5px",
                          width: "27%",
                          height: "40px",
                          background:
                            "linear-gradient(122.76deg, #3550DC -35.72%, #27E9F7 172.73%)",
                        }}
                        onClick={() => setQuizPages(0)}
                      >
                        Start Quiz
                      </Button>
                    </Box>
                  </Box>
                ) : (
                    quizPages === 99 ? 
                    <Box sx={{width: '100%', display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
                    <Box>
                        <Typography>Right answer: {score}</Typography>
                        <Typography>Wrong answer:  {10-score}</Typography>
                    </Box>
                    <Button variant="outlined" onClick={()=>navigate("/")} sx={{mt: '20px'}}>
                        home
                    </Button>
                    </Box>
                    
                    :
                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Box
                        sx={{
                          background:
                            "linear-gradient(122.76deg, #3550DC -35.72%, #27E9F7 172.73%)",
                          borderRadius: "10px",
                          width: "15%",
                          height: "4px",
                          mt: "-5px",
                          mb: "24px",
                        }}
                      />
                    </Box>
                    <Container maxWidth="sm" sx={{ mt: "-20px" }}>
                      <Box my={4}>
                        <Typography
                          variant="h5"
                          component="h2"
                          align="center"
                          gutterBottom
                          sx={{ mb: "30px" }}
                        >
                          Question {currentQuestion + 1} of {questions.length}
                        </Typography>
                        <Typography
                          variant="body1"
                          align="center"
                          gutterBottom
                          sx={{ mb: "30px" }}
                        >
                          {currentQuizQuestion.question}
                        </Typography>
                        <Grid container spacing={2}>
                          {currentQuizQuestion.incorrect_answers.map(
                            (answer) => (
                              <Grid item xs={12} sm={6} key={answer}>
                                <FormControlLabel
                                  value={answer}
                                  control={<Radio color="primary" />}
                                  label={answer}
                                  onChange={handleAnswerSelection}
                                  checked={selectedAnswer === answer}
                                />
                              </Grid>
                            )
                          )}
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              value={currentQuizQuestion.correct_answer}
                              control={<Radio color="primary" />}
                              label={currentQuizQuestion.correct_answer}
                              onChange={handleAnswerSelection}
                              checked={
                                selectedAnswer ===
                                currentQuizQuestion.correct_answer
                              }
                            />
                          </Grid>
                        </Grid>
                        <Box
                          mt={4}
                          display="flex"
                          justifyContent="space-between"
                        >
                          {currentQuestion > 0 && (
                            <Button
                              variant="contained"
                              onClick={handlePreviousQuestion}
                            >
                              Previous
                            </Button>
                          )}
                          {currentQuestion < questions.length - 1 ? (
                            <Button
                              variant="contained"
                              onClick={handleNextQuestion}
                            >
                              Next
                            </Button>
                          ) : (
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                              Submit
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </Container>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </div>
      )}
    </MyContext.Consumer>
  );
}

export default Quiz;
