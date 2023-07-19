import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CharacterCard from "./CharacterCard";
import characters from "./protagonists.json";
import { useState } from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./App.css";

function App() {
  // state variable to store the click count!
  const [count, setCounter] = useState(0);
  const [number, setNumber] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [definition, setDefinition] = useState("");

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Perform the API fetch request with the user input
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          // Assuming the API response is an array of definitions
          const firstDefinition = data[0].meanings[0].definitions[0].definition;
          setDefinition(firstDefinition);
        } else {
          setDefinition("No definition found.");
        }
      })
      .catch((error) => {
        console.log("error", error);
        setDefinition("Error occurred during API request.");
      });
  };

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  function mybuttoninc() {
    setNumber(number + 1);
  }

  return (
    <div className="App">
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid lightgray" }}
      >
        <Toolbar>
          <img
            src="https://1000logos.net/wp-content/uploads/2017/03/NASA_logo_PNG3.png"
            alt="NASA Logo"
            style={{
              color: "red",
              marginRight: 10,
              marginBottom: 10,
              marginTop: 10,
              width: 85,
              height: 85,
            }}
          />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Astronomy Picture Of The Day
            <Typography varient sx={{ flexGrow: 1 }}>
              Powered by NASA
            </Typography>
          </Typography>

          <Button
            href="#"
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
            style={{ backgroundColor: "#000080", color: "white" }}
            onClick={() => {
              fetch(
                "https://uselessfacts.jsph.pl/api/v2/facts/random",
                requestOptions
              )
                .then((response) => response.json())
                .then(
                  (result) =>
                    (document.getElementById("sub-content").innerHTML =
                      result.text)
                )

                .catch((error) => console.log("error", error));

              {
                mybuttoninc();
              }
              setCounter(count + 1);
            }}
          >
            Reveal a random fact!
          </Button>

          {/* TextBox to collect usur's info*/}

          <form
            onSubmit={handleFormSubmit}
            // style={{ textAlign: "center", alignItems: "center" }}
          >
            <TextField
              style={{ marginTop: 30 }}
              label="Enter a word"
              value={userInput}
              onChange={handleInputChange}
            />

            <br />

            <button type="submit">Define a Word</button>
          </form>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography variant="h6" align="center" color="White" sx={{ py: 2 }}>
          <a href="https://apod.nasa.gov/apod/archivepix.html">
            Discover the cosmos!
          </a>{" "}
          Each day a different image or photograph of our fascinating universe
          is featured, along with a brief explanation written by a professional
          astronomer.
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="white"
          sx={{ mx: 10 }}
          id="sub-content"
        ></Typography>
      </Container>
      {/* Display the definition */}
      <div style={{ textAlign: "center" }}>
        <TextField
          label="Definition"
          style={{
            textAlign: "center",

            marginLeft: 50,
          }}
          variant="standard"
          multiline
          value={definition}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      {/* End hero unit */}
      <Container maxWidth="lg">
        <Grid
          container
          spacing={5}
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid item xs={12} md={4} key={characters[0].title}>
            <CharacterCard
              characterName={characters[0].title}
              image={characters[0].pic}
              descriptionArray={characters[0].description}
              date={characters[0].date}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
