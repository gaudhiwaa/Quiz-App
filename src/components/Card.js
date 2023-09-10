import { Box, Typography } from "@mui/material";
import QuizLogo from "../img/QuizLogo";
import ClockLogo from "../img/ClockLogo";
import RatingLogo from "../img/RatingLogo";
import { useNavigate } from "react-router-dom";

export default function Card({ id, category, quizName, difficulty, img, categoryId }) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        height: "120px",
        borderRadius: "5px",
        boxShadow: "10px 24px 54px rgba(51, 51, 51, 0.1)",
        mt: "22px",
        display: "flex",
        alignItems: "center",
        "&:hover": { border: "2px  solid #77a0dc", height: 120 - 4 },
        cursor: "pointer",
      }}
      onClick={() => navigate(`/${category}/${id}?&category=${categoryId}&difficulty=${difficulty}`)}
    //   <Link to={`/web/animal/${id}?name=${name}&type=${type}`}>View Animal</Link>
    // categoryNum, difficulty masukin ke dalam route
    >
      <img
        style={{
          width: "92px",
          height: "92px",
          borderRadius: "3px",
          marginRight: "20px",
          marginLeft: "20px",
        }}
        src={img}
      />

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          mr: "27px",
        }}
      >
        <Box>
          <Typography
            sx={{
              background:
                "linear-gradient(122.76deg, #3550DC -35.72%, #27E9F7 172.73%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {quizName}{" "}
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <QuizLogo />
            <Typography sx={{ fontSize: "14px", color: "#999999", ml: "2px" }}>
              10 Questions
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ClockLogo />
            <Typography sx={{ fontSize: "14px", color: "#999999", ml: "2px" }}>
              10 minutes
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <RatingLogo />
          <Typography
            sx={{
              ml: "5px",
              background:
                "linear-gradient(122.76deg, #3550DC -35.72%, #27E9F7 172.73%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "16px",
            }}
          >
            4.8
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
