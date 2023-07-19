import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";

var requestOptions = {
  method: "GET",
  redirect: "follow",
};

export default function CharacterCard(props) {
  // Each card is initialized as a Disney character until card button is pressed.
  const [eventImg, setEventImg] = useState(props.image);
  const [eventTitle, setEventTitle] = useState(props.characterName);
  const [description, setDescription] = useState(props.descriptionArray);
  const [date, setDate] = useState(props.date);

  let newDate = date + "->";

  async function getEvent() {
    // Get a random cat image
    // the "has_breeds=1" is important for the second part
    const response = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=SgHMgglehkV2hudhWe6TZWBYcq5ASGtlJScsXNaK",
      requestOptions
    );
    const eventdata = await response.json();
    // get the first cat in the response data array
    const eventData = eventdata[0];

    // Save URL of cat image
    setEventImg(eventdata.url);

    // Use the cat's ID to make a new request for cat info
    // const catId = catData.id;
    // const infoResponse = await fetch(
    //   `https://api.thecatapi.com/v1/images/${catId}`,
    //   requestOptions
    // );
    //const catInfo = await infoResponse.json();
    setEventTitle(eventdata.title);

    // split the string into an array so we make bullet points later
    //const temperamentList = catInfo.breeds[0].temperament.split(", ");
    setDescription([eventdata.explanation]);

    setDate([eventdata.date]);

    // const [cutePet, setEvent] = useState();
    // function getEvent() {
    //   var requestOptions = {
    //     method: "GET",
    //     redirect: "follow",
    //   };

    //   fetch(
    //     "https://api.nasa.gov/planetary/apod?api_key=SgHMgglehkV2hudhWe6TZWBYcq5ASGtlJScsXNaK",
    //     requestOptions
    //   )
    //     .then((response) => response.json())
    //     .then((result) => setEvent(result[0].url))
    //     .catch((error) => console.log("error", error));
  }

  return (
    <Card sx={{ width: "500px", align: "center" }}>
      <CardMedia component="img" height="500px" image={eventImg} />
      <CardHeader
        title={newDate + "" + " " + " " + eventTitle}
        titleTypographyProps={{ align: "center" }}
        sx={{ mt: 1 }}
      />

      <CardContent sx={{ pt: 0 }}>
        <ul>
          {description.map((sentence) => (
            <Typography component="li" key={sentence}>
              {sentence}
            </Typography>
          ))}
        </ul>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          sx={{ px: 6, mx: "auto" }}
          onClick={() => {
            getEvent();
          }}
        >
          GET EVENT
        </Button>
      </CardActions>
    </Card>
  );
}
