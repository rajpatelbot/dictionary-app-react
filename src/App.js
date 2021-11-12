import { Container, MenuItem } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@emotion/react";
import categories from "./data/category";
import Result from "./components/results/Result";

function App() {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState([]);
  const [category, setCategory] = useState("en");

  const dictionaryApi = async () => {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      );
      setMeaning(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    dictionaryApi();
    // eslint-disable-next-line
  }, [category, word]);

  return (
    <>
      <div
        className="App"
        style={{ color: "white" }}
      >
        <Header />
        <Container
          maxWidth="md"
          style={{
            display: "flex",
            flexDirection: "coloum",
            height: "10vh",
            margin: "auto",
            maxWidth: "100vw",
            marginTop: "3rem",
          }}
        >
          <ThemeProvider theme={darkTheme}>
            <TextField
              helperText=" "
              id="demo-helper-text-aligned-no-helper"
              className="textField"
              label="Type a word"
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />
            <TextField
              style={{ width: "20vw", marginLeft: "7px" }}
              id="standard-select-currency"
              className="textField select"
              select
              label="Language"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </ThemeProvider>
        </Container>
        {meaning && (
          <Result word={word} meaning={meaning} category={category} />
        )}
      </div>
    </>
  );
}

export default App;
