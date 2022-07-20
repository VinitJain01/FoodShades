import {useEffect , useState} from 'react' ;
import styles from "./AvailableMeals.module.css";
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {

  const [mealsArr , setMealsArr] = useState([]);
  const [isLoading , setisLoading] = useState(false);
  const [errorOccuredInFetching , setErrorOccuredInFetching] = useState(); // To have the error mssg in this variable

  useEffect( () =>{
      setisLoading(true);
      const fetchMeals = async() => {
          const response = await fetch('https://react-app-fff65-default-rtdb.firebaseio.com/meals.json');

          if(!response.ok){
            throw new Error('Something Went Wrong');
          }
          const responseData = await response.json();   // To convert json into JS object
            // responseData is again a promise/ handler to the obj
          const loadedMeals = [];

          for (const key in responseData) {
            loadedMeals.push({
              id : key,
              name : responseData[key].name,
              description : responseData[key].description,
              price : responseData[key].price,
            });
          }
          setMealsArr(loadedMeals);
          setisLoading(false);
    };

      fetchMeals().catch( (error) => {
        const errorMessage = error.message ;
      setisLoading(false);
      setErrorOccuredInFetching(errorMessage);
      } );
  } , []);

  if(isLoading){
    return <section className={styles.mealsLoading} >
      <p>Loading.....</p>
    </section>;
  }
  if(errorOccuredInFetching){
    return <section className={styles.mealsError} >
      <p>{errorOccuredInFetching}</p>
    </section>;
  }

    const mealsList = mealsArr.map(meal => 
    <MealItem key={meal.id} id={meal.id} mealName={meal.name} description={meal.description} price={meal.price} />)
    // mealsList is our arr of mealItems
    return <section className={styles.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>
}

export default AvailableMeals;