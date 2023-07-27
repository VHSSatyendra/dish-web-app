import "./Home.css";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import DishInput from "../DishInputs/DishInput";
import DishCardItem from "../DishCardItem/DishCardItem";
import { auth, db } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [dishList, setDishList] = useState([]);
  const [dishCount, setDishCount] = useState(1);

  const dishesCollectionRef = collection(db, "dishes");

  const navigate = useNavigate();

  const getDishList = async () => {
    try {
      const data = await getDocs(dishesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const numOfDishes = filteredData.length;
      setDishCount(numOfDishes);
      setDishList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDishList();
  }, [getDishList]);

  const onSubmitDish = async (enteredDishData) => {
    const dishData = {
      ...enteredDishData,
    };

    console.log("Dishes Count: " + dishCount);

    try {
      await addDoc(dishesCollectionRef, {
        name: dishData.name,
        prepTime: dishData.prepTime,
        cookTime: dishData.cookTime,
        servings: dishData.serving,
        reviews: dishData.reviews,
        ingredients: dishData.ingredients,
        imageUrl: dishData.imageUrl,
      });

      getDishList();
    } catch (err) {
      console.error(err);
    }
  };

  const signOutHandler = async () => {
    try {
      await signOut(auth);
      console.log("SignedOut");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const updateDishName = async (id, updateDishList) => {
    console.log("Update Items id" + id);
    const dishDoc = doc(db, "dishes", id);

    await updateDoc(dishDoc, {
      ...(updateDishList.name !== "" ? { name: updateDishList.name } : ""),
      ...(updateDishList.prepTime !== ""
        ? { prepTime: updateDishList.prepTime }
        : ""),
      ...(updateDishList.cookTime !== ""
        ? { cookTime: updateDishList.cookTime }
        : ""),
      ...(updateDishList.servings !== ""
        ? { servings: updateDishList.servings }
        : ""),
      ...(updateDishList.reviews !== ""
        ? { reviews: updateDishList.reviews }
        : ""),
    });
  };

  const deleteDish = async (id) => {
    const dishDoc = doc(db, "dishes", id);
    await deleteDoc(dishDoc);
  };

  return (
    <Card className="mainHome">
      <div className="topContent">
        <h1>Dashboard</h1>
        <Button className="signOutButton" onClick={signOutHandler}>
          Sign Out
        </Button>
      </div>

      <div className="cardArrange">
        <Card className="dishInputsMain">
          <DishInput onSubmitData={onSubmitDish} />
        </Card>
        <Card className="dishLstMain">
          <DishCardItem
            dishItem={dishList}
            deleteDishItem={deleteDish}
            updateDishItem={updateDishName}
          />
        </Card>

        <div className="displayCount">
          <Card className="countCard">
            <FontAwesomeIcon id="icon" icon={faBowlFood} />
            <h2>{dishCount}</h2>
            <p>Dishes</p>
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default Home;
