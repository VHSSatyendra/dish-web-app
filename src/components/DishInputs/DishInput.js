import { useState } from "react";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import "./DishInput.css";
import { storage } from "../../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const DishInput = (props) => {
  const [newDishName, setNewDishName] = useState("");
  const [newPrepTime, setNewPrepTime] = useState(0);
  const [newCookTime, setNewCookTime] = useState(0);
  const [newServings, setNewServings] = useState(0);
  const [newReviews, setNewReviews] = useState(0);
  const [ingredientList, setIngredientList] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [newImage, setNewImage] = useState("");
  const [url, setUrl] = useState("");

  const [progress, setProgress] = useState(0);

  const dishNameHandler = (e) => {
    setNewDishName(e.target.value);
  };
  const prepTimeHandler = (e) => {
    setNewPrepTime(Number(e.target.value));
  };
  const cookTimeHandler = (e) => {
    setNewCookTime(Number(e.target.value));
  };
  const servingHandler = (e) => {
    setNewServings(Number(e.target.value));
  };
  const reviewHandler = (e) => {
    setNewReviews(Number(e.target.value));
  };

  const ingredientHandler = (e) => {
    setNewIngredient(e.target.value);
  };

  const imageHandler = (e) => {
    setNewImage(e.target.files[0]);
    e.target.value = null;
    console.log("Image: " + newImage.name);
  };

  const onAddIngredientList = () => {
    setIngredientList([...ingredientList, newIngredient]);
    setNewIngredient("");
  };

  const uploadFile = () => {
    const imageName = newImage.name;
    const imageRef = ref(storage, `images/${imageName}`);
    const uploadTask = uploadBytesResumable(imageRef, newImage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setUrl(downloadURL);
      }
    );
  };

  const onSubmitDishHandler = (event) => {
    event.preventDefault();

    const dishData = {
      name: newDishName,
      prepTime: newPrepTime,
      cookTime: newCookTime,
      serving: newServings,
      reviews: newReviews,
      ingredients: ingredientList,
      imageUrl: url,
    };

    props.onSubmitData(dishData);

    setNewDishName("");
    setNewPrepTime("");
    setNewCookTime("");
    setNewServings("");
    setNewReviews("");
    setNewIngredient("");
    setNewImage("");
    setProgress(0);
    setUrl("");
    setIngredientList("");
  };

  return (
    <div className="dishInputMain">
      <form onSubmit={onSubmitDishHandler}>
        <label>Dish Name</label>
        <Input value={newDishName} onChange={dishNameHandler} />
        <label>Preparation Time</label>
        <Input value={newPrepTime} type="number" onChange={prepTimeHandler} />
        <label>Cooking Time</label>
        <Input value={newCookTime} type="number" onChange={cookTimeHandler} />
        <div className="hor-div">
          <label>Servings</label>
          <Input
            className="smallSizeInputs"
            value={newServings}
            type="number"
            onChange={servingHandler}
          />
          <label>Reviews</label>
          <Input
            className="smallSizeInputs"
            value={newReviews}
            type="number"
            onChange={reviewHandler}
          />
        </div>
        <label>Add Ingredient</label>
        <Input value={newIngredient} onChange={ingredientHandler} />
        <div className="ingredList">
          <Button onClick={onAddIngredientList} className="addButton">
            Add
          </Button>
          <div className="ingScroll">
            {ingredientList.length > 0 &&
              ingredientList.map((ingredient, index) => (
                <p key={index}>{ingredient}</p>
              ))}
          </div>
        </div>
        <input
          type="file"
          className="fileButton"
          accept="image/*"
          onChange={imageHandler}
        />
        <div className="chooseFile">
          <Button className="fileBtn">Choose File</Button>
          <p>{newImage?.name}</p>
        </div>
        <div className="uploadLine">
          <Button onClick={uploadFile} className="uploadButton">
            Upload
          </Button>
          {progress > 0 && <p>{progress}%</p>}
        </div>

        <Button className="submitButton" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default DishInput;
