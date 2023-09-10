import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import MyContext from "./MyContext";

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setData(user);
      console.log(user);
      if (!user) {
        navigate("/login");
      }
    });

    return unsubscribe;
  },);

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    const storedData = localStorage.getItem("myData");

    if (storedData) {
      setData(JSON.parse(storedData));
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("myData", JSON.stringify(data));
  }, [data]);

  return (
    <MyContext.Provider value={{ currentUser, windowSize, data, setData }}>
      {children}
    </MyContext.Provider>
  );
};

export default AuthProvider;
