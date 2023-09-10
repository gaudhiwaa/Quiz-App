import MyContext from "../util/MyContext";
import { Box, InputBase, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import Tabs from "../components/Tabs";

function SearchQuizPage() {
  
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
              overflow: 'hidden'
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
                  <Box sx={{ color: "#FFFFFF" }}>
                    {context.data.displayName ? (
                      <Typography sx={{ fontSize: "14px" }}>
                        Hello, {context.data.displayName}
                      </Typography>
                    ) : (
                      <MoreHorizIcon sx={{ fontSize: "17.5px" }} />
                    )}
                    <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
                      Let's test your knowledge 
                      {/* {console.log(quizData)} */}
                    </Typography>
                  </Box>
                  <AccountCircleIcon
                    sx={{ color: "white", fontSize: "44px" }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  background: "#FFFFFF",
                  borderRadius: "35px",
                  width: "100%",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <SearchIcon sx={{ color: "#60a4e4", ml: "14px", mr: "7px" }} />
                <InputBase placeholder="Search…" sx={{ width: "93%" }} />
              </Box>
              <Box
                sx={{
                  background: "white",
                  height: "1000px",
                  width: "100%",
                  mt: "30px",
                  borderRadius: "25px",
                }}
              >
                <Tabs />
              </Box>
            </Box>
          </Box>
        </div>
      )}
    </MyContext.Consumer>
  );
}

export default SearchQuizPage;
