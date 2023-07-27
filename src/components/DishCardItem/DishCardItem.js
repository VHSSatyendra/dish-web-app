import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

import Card from "../UI/Card/Card";
import "./DishCardItem.css";
import { useState } from "react";
import Button from "../UI/Button/Button";

const DishCardItem = (props) => {
  const [isUpdate, setIsUpdate] = useState("");

  const [updatedDishList, setUpdatedDishList] = useState({
    name: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    reviews: "",
  });

  const deleteDishHandler = (id) => {
    props.deleteDishItem(id);
  };

  const updateDishHandler = (id) => {
    console.log("Update Items");
    setIsUpdate(id);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDishList((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const updateDishes = (id) => {
    console.log("Update Dish Items");
    setIsUpdate("");
    props.updateDishItem(id, updatedDishList);
    console.log(updatedDishList);
    setUpdatedDishList({
      name: "",
      prepTime: "",
      cookTime: "",
      servings: "",
      reviews: "",
    });
  };

  return (
    <>
      {props.dishItem.map((dish) => (
        <Card className="dishCardItemMain">
          <Card className="imageCard">
            <img src={dish.imageUrl} />
          </Card>
          <div className="subDiv">
            <h2>
              {isUpdate === dish.id ? (
                <input
                  onChange={onChange}
                  type="text"
                  name="name"
                  defaultValue={dish.name}
                />
              ) : (
                dish.name
              )}
            </h2>
            <p>
              Preparation Time:
              {isUpdate === dish.id ? (
                <input
                  onChange={onChange}
                  className="updateTxt"
                  type="text"
                  name="prepTime"
                  defaultValue={dish.prepTime}
                />
              ) : (
                dish.prepTime
              )}
              min
            </p>
            <p>
              Cooking Time:
              {isUpdate === dish.id ? (
                <input
                  onChange={onChange}
                  className="updateTxt"
                  type="text"
                  name="cookTime"
                  defaultValue={dish.cookTime}
                />
              ) : (
                dish.cookTime
              )}
              min
            </p>
            <p>
              Servings:
              {isUpdate === dish.id ? (
                <input
                  onChange={onChange}
                  className="updateTxt"
                  type="text"
                  name="servings"
                  defaultValue={dish.servings}
                />
              ) : (
                dish.servings
              )}
            </p>
            <p>
              Reviews:
              {isUpdate === dish.id ? (
                <input
                  onChange={onChange}
                  className="updateTxt"
                  type="text"
                  name="reviews"
                  defaultValue={dish.reviews}
                />
              ) : (
                dish.reviews
              )}
            </p>
            {isUpdate === dish.id ? (
              <Button
                onClick={() => updateDishes(dish.id)}
                className="updateBtn"
              >
                Update
              </Button>
            ) : (
              ""
            )}
          </div>
          <div className="ingredDiv">
            <h4>Ingredients</h4>
            <ul>
              {dish.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="icons">
            <FontAwesomeIcon
              onClick={() => updateDishHandler(dish.id)}
              id="pen"
              icon={faPen}
            />
            <FontAwesomeIcon
              onClick={() => deleteDishHandler(dish.id)}
              id="trash"
              icon={faTrash}
            />
          </div>
        </Card>
      ))}
    </>
    // </div>
  );
};

export default DishCardItem;
