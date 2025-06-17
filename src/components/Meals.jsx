export default function Meals() {
    async function fetchMeals() {
        
        const response = fetch('http://localhost3000/meals');

        if(!response.ok){
             throw new Error('Failed to fetch meals');
        }

        const meals = await response.json();
    }

    useEffect(() => {
    fetchMeals();
  }, []);

    return <ul id="meals"></ul>
}