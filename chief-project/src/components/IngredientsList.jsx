export default function IngredientsList(props) {

    const list = props.ingredients.map((ingredient) => (<li key={ingredient}>{ingredient}</li>))

    return (
        <section className="ingredients-list-container">
            <div className="ingredients-list-block">
                <h2>Ingredients on hand:</h2>
                <ul className="ingredients-list" aria-live="polite">{list}</ul>
                {props.ingredients.length>3 &&
                    <div className="get-recipe-container">
                        <div style={{
                            lineHeight: "30px",
                        }}>
                            <h3>Ready for a recipe?</h3>
                            <p>Generate a recipe from your list of ingredients.</p>
                        </div>
                        <button
                            onClick={props.getRecipe}
                        >Get a recipe</button>
                    </div>
                }
            </div>
        </section>
    )
}