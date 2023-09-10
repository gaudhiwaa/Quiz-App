import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Card from "./Card";
import quiz from "../data/quiz.json";

export default function Tabs() {
  const [value, setValue] = React.useState(
    localStorage.getItem("tab") ? localStorage.getItem("tab") : "0"
  );

  React.useEffect(() => {
    const storedValue = localStorage.getItem("tab");
    if (storedValue) {
      setValue(storedValue);
    }
  }, []);

  const handleChange = (event, newValue) => {
    localStorage.setItem("tab", newValue);
    setValue(newValue);
  };


  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            variant="scrollable"
            sx={{ ml: "-0.6%", textTransform: "none" }}
          >
            {Object.keys(quiz).map((category, index) => (
              <Tab
                label={category.charAt(0).toUpperCase() + category.slice(1)}
                value={index.toString()}
                sx={{ textTransform: "none", height: "57px" }}
              />
            ))}
          </TabList>
        </Box>
        <Box
          sx={{
            overflowY: "scroll",
            height: "700px",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {Object.keys(quiz).map((category, index) => (
            <TabPanel value={index.toString()} sx={{ mt: "-20px" }}>
              {quiz[category].map((quiz) => (
                <Box key={quiz.id}>
                  <Card
                    id={quiz.id}
                    quizName={quiz.name}
                    difficulty={quiz.difficulty}
                    img={quiz.photo}
                    category={category}
                    categoryId={quiz.categoryId}
                  />
                </Box>
              ))}
              <Box sx={{ width: "100%", height: "175px" }} />
            </TabPanel>
          ))}
        </Box>
      </TabContext>
    </Box>
  );
}
