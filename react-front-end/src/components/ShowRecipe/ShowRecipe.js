import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  GridContainer,
  TopLeft,
  TopRight,
  BottomLeft,
  BottomRight,
} from "./ShowRecipeStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShare } from "@fortawesome/fontawesome-free-solid";
import toast, { Toaster } from "react-hot-toast";
import Tooltip from "@mui/material/Tooltip";
import { UserContext } from "../UserContext";
import styled from "styled-components";

const axios = require("axios");

function ShowRecipe() {
  const [drink, setDrink] = useState({});
  console.log("drink is: ", drink);
  const [ingredients, setIngredients] = useState([]);
  const [measurements, setMeasurements] = useState([]);

  const { user } = useContext(UserContext);
  // get drink id from the endpoint

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    getDrinkById();
  }, []);

  // get drink by id
  const getDrinkById = () => {
    axios
      .get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => {
        console.log("response is: ", response);
        setDrink(response.data.drinks[0]);
        getIngredientsForDrink(response.data.drinks[0]);
        getMeasurementsForDrink(response.data.drinks[0]);
        console.log(response.data.drinks[0]);
      })
      .catch((err) => console.log(err));
  };

  // get ingredients for the drink
  const getIngredientsForDrink = (cocktail) => {
    const ingredientsArray = [];
    for (let i = 1; i < 16; i++) {
      if (cocktail[`strIngredient${i}`] !== null) {
        ingredientsArray.push(cocktail[`strIngredient${i}`]);
      }
    }
    setIngredients(ingredientsArray);
  };

  // get measurements for ingredients
  const getMeasurementsForDrink = (cocktail) => {
    const measurementsArray = [];

    for (let i = 1; i < 16; i++) {
      if (cocktail[`strMeasure${i}`] !== null) {
        measurementsArray.push(cocktail[`strMeasure${i}`]);
      }
    }
    setMeasurements(measurementsArray);
  };

  // copy url to clipboard after click the share button
  const CopyToClipboard = async () => {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(window.location.href);
    } else {
      return Document.execCommand("copy", true, window.location.href);
    }
  };

  // show noticication after click on the share button
  const handleShare = () => {
    CopyToClipboard()
      .then((res) => toast.success("Successfully copied URL to clipboard!"))
      .catch((err) => toast.error("Faild to copy URL!"));
  };

  // On click function to add cocktail to the favourites database by user id
  const addToFavourites = () => {
    fetch(`/api/favourites/${user.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        api_cocktail_id: drink.idDrink,
      }),
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  //// youtube video
  // examples of cocktails with videos ( aviation , Alexander )
  function getUrl(url) {
    let embeded = url.replace("/watch?v=", "/embed/");
    return embeded;
  }

  return (
    <div>
      <GridContainer>
        <TopLeft>
          <div>
            <h1>{drink.strDrink}</h1>
            <p>{drink.strCategory}</p>
            <Tooltip title="Add to favourite">
              <FontAwesomeIcon
                icon={faHeart}
                size="2x"
                className="fa-icon-heart"
                onClick={() => addToFavourites()}
              />
            </Tooltip>

            <Tooltip title="Share URL">
              <FontAwesomeIcon
                icon={faShare}
                size="2x"
                className="fa-icon-share"
                onClick={handleShare}
              />
            </Tooltip>
          </div>
        </TopLeft>
        <TopRight>
          <img src={drink.strDrinkThumb} alt={drink.strDrink} />
        </TopRight>

        <BottomLeft>
          <h3>Ingredients</h3>
          <div>
            <ul>
              {ingredients.map((ingredient, index) => {
                return (
                  <li key={index}>
                    {ingredient} - {measurements[index]}
                  </li>
                );
              })}
            </ul>
          </div>
        </BottomLeft>

        <BottomRight>
          <h3>Instructions</h3>
          <p>{drink.strInstructions}</p>
        </BottomRight>
      </GridContainer>
      {drink.strVideo && <Iframe src={getUrl(drink.strVideo)}></Iframe>}
    </div>
  );
}

export default ShowRecipe;

const Iframe = styled.iframe`
  margin-top: 10rem;
  height: 50rem;
  width: 80%;
  margin-bottom: 13rem;
`;
