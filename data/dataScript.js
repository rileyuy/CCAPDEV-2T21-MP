const fs = require("fs");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require('bcryptjs');
var moment = require('moment')

const User = require("../models/user");
const Recipe = require("../models/recipe");
const Comment = require("../models/comment");

const saltrounds = 10;

const dbURI = 'mongodb+srv://arren:j6Eg3-sJgundeqD@cluster0.lwgsy.mongodb.net/ccapdev-mp?retryWrites=true;'
mongoose.connect (dbURI, {useNewUrlParser : true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var tyrone = new User({
    email: "tyrone@gmail.com",
    firstName: "Tyrone",
    lastName: "Sta. Maria",
    password: bcrypt.hashSync("gotou", saltrounds)
});

var gavin = new User({
    email: "gavin@gmail.com",
    firstName: "Gavin",
    lastName: "Dizon",
    password: bcrypt.hashSync("peanuts", saltrounds)
});

var lance = new User({
    email: "lance@gmail.com",
    firstName: "Lance",
    lastName: "Uy",
    password: bcrypt.hashSync("nokma", saltrounds)
});

var janine = new User({
    email: "janine@gmail.com",
    firstName: "Janine",
    lastName: "Siy",
    password: bcrypt.hashSync("tetris", saltrounds)
});

var mozart = new User({
    email: "mozart@gmail.com",
    firstName: "Mozart",
    lastName: "Uy",
    password: bcrypt.hashSync("prodigy", saltrounds)
});

var recipe1 = new Recipe({
    recipeName: "Gnocchi Skillet with Chicken Sausage & Tomatoes",
    recipeIngredients: "1 pound frozen or shelf-stable gnocchi Kosher salt and freshly ground black pepper 9 ounces cooked chicken sausage (about 3 links), sliced into 1/4-inch-thick coins 1 pint cherry or grape tomatoes, sliced in half lengthwise 1 to 2 ounces fresh basil leaves, thinly sliced (1/2 to 1 cup loosely packed)",
    recipeInstructions: "Bring a large pot of salted water to a boil over medium-high heat. Add the gnocchi and cook for 2 minutes or according to package directions. Drain and toss with a drizzle of olive oil. Heat a 10-inch or larger cast iron skillet over medium heat with a light drizzle of olive oil. Add the sausages and cook until it begins to brown, 2 to 3 minutes. Push the sausages into a pile at the edge of the skillet and turn the heat up to high. When the skillet is quite hot, add the tomatoes, skin down, crowding them in if necessary. Cook until they are blistered, 1 to 2 minutes. Stir in the sausage and cook until both tomatoes and sausage are slightly browned, about 2 minutes more. Stir in gnocchi and cook just until all is combined, but the tomatoes have not broken down into sauce. Remove the skillet from the heat and stir in the basil. Taste and season with salt and pepper. Serve immediately.",
    img: {
        data: fs.readFileSync(path.join(__dirname + "/recipePictures/gnocci-skillet-with-chicken-sausage-&-tomatoes.jpg")),
        contentType: "image/jpg"
    },
    userId: tyrone._id,
    rating: "",
    createdDate: moment().format('MM-DD-YYYY').toString()
})

var recipe2 = new Recipe({
    recipeName: "Sheet Pan Lemon Pepper Chicken",
    recipeIngredients: "1 large lemon, sliced into thin rounds, 1.25 pounds boneless skinless chicken breasts, cut into bite-sized pieces, 1 pound fresh green beans, trimmed and halved, 1/2 of one large or 1 medium red onion, sliced into strips or small chunks 2 to 3 tablespoons olive oil, 1 to 2 teaspoons freshly ground lemon pepper seasoning blend, 1 teaspoon kosher salt, or to taste, 1/2 teaspoon freshly ground black pepper, or to taste fresh parsley, optional for garnishing optionally finish with Parmesan cheese, garlic, soy sauce, chili garlic sauce, etc.",
    recipeInstructions: "Preheat oven to 425F, line a baking sheet with aluminum foil for easier cleanup, and add the lemon slices evenly dispersed around the baking sheet. Add the chicken, green beans, onions, evenly drizzle with olive oil, evenly season with lemon pepper, salt, pepper, and bake for about 15 minutes or until chicken is cooked through and vegetables have some golden color. Toss the chicken and vegetables (leave the lemon slices on the bottom) halfway through baking to ensure even cooking. Cooking time will vary based on the thickness of the chicken and being that this is quite a hot oven, check early and often so you don’t overcook the chicken which dries it out. Optionally garnish with fresh parsley and finish with any of the optionally suggested items.",
    img: {
        data: fs.readFileSync(path.join(__dirname + "/recipePictures/pan-lemon-pepper-chicken.jpg")),
        contentType: "image/jpg"
    },
    userId: gavin._id,
    rating: "",
    createdDate: moment().format('MM-DD-YYYY').toString()
})

var recipe3 = new Recipe({
    recipeName: "Garlic Butter Chicken with Parmesan Cauliflower Rice",
    recipeIngredients: "2 large boneless and skinless chicken breasts, halved horizontally to make, 4 1/2 cup fresh Parmesan, finely grated Salt and fresh cracked black pepper, 2 large cloves garlic, grated, 1 teaspoon paprika, 1 teaspoon Italian seasoning, 4 tablespoons unsalted butter, divided, 1 head cauliflower, riced 1/2 cup white onion, chopped, 2 large cloves garlic, minced, 2 tablespoons vegetable stock Juice of one lemon (+ zest, if you like) Red chili pepper flakes, optional, 1/4 cup fresh parsley, chopped",
    recipeInstructions: "FOR THE CHICKEN: 1. To make this parmesan chicken recipe: In a shallow plate, combine parmesan cheese, grated garlic, paprika, and Italian seasoning. Season the chicken breasts with salt and pepper; dredge in the parmesan mixture; shake off excess and set aside. 2. In a large non-stick skillet melt 2 tablespoons of butter over medium-high heat. Cook chicken cutlets until golden on each side and cooked through – about 3-4 minutes for each side, depending on the thickness of your chicken cutlets. Transfer to a plate. FOR THE CAULIFLOWER RICE: 1. In the same pan, melt 2 tablespoons of butter. Fry the garlic and onion for 1 minute until fragrant — be careful not to burn. 2. Add the riced cauliflower to the skillet and stir to mix everything together well and coat in melted butter. Cook, stirring regularly for 1 minute. 3. Stir in the 2 tablespoons vegetable stock, about half the parsley, and lemon zest (if using). Cook the cauliflower rice for one minute to reduce juices then add the lemon juice and a few sprinkles of leftover parmesan cheese, if you like. 4. Adjust seasoning as needed. Stir in the remaining parsley. Return chicken breasts over cauliflower rice and reheat quickly. Serve your parmesan chicken with fresh cracked black pepper, red chili pepper flakes, and more parmesan. Enjoy!",
    img: {
        data: fs.readFileSync(path.join(__dirname + "/recipePictures/garlic-butter-chicken-with-parmesan-cauliflower-rice.png")),
        contentType: "image/jpg"
    },
    userId: lance._id,
    rating: "",
    createdDate: moment().format('MM-DD-YYYY').toString()
})

var recipe4 = new Recipe({
    recipeName: "Thai Basil Chicken",
    recipeIngredients: "2 tablespoons vegetable oil, 3 tablespoons oyster sauce, 2 tablespoons soy sauce, 2 tablespoons fish sauce, 3 tablespoons sugar, 1 red bell pepper, chopped, 8 ounces green beans, 1 1/2 pounds boneless, skinless chicken thighs, coarsely chopped, 4 sliced shallots, 4 cloves garlic, minced, 4 minced Thai chilies, or to taste, 1 cup very thinly sliced fresh Thai basil leaves Jasmine rice, to serve",
    recipeInstructions: "Heat the oil in a wok or heavy, high-walled skillet over high heat. As the wok is heating up, whisk together the oyster sauce, soy sauce, fish sauce, and sugar until well-combined. Set aside. Add the bell pepper and green beans to the hot wok. Stir-fry for one minute. Add in the chicken and stir-fry, breaking apart as you go, until beginning to brown, about 2 minutes. Stir in the shallots, garlic, and Thai chilies. Cook until fragrant, about 1 more minute. Then, pour in the prepared sauce. Continue to cook until the sauce begins to glaze onto the meat, about 1-2 more minutes. Stir in the Thai basil leaves and cook until the chicken is completely cooked through, the basil is wilted, and the liquid has mostly evaporated. Serve warm with rice.",
    img: {
        data: fs.readFileSync(path.join(__dirname + "/recipePictures/thai-basil-chicken.jpg")),
        contentType: "image/jpg"
    },
    userId: janine._id,
    rating: "",
    createdDate: moment().format('MM-DD-YYYY').toString()
})

var recipe5 = new Recipe({
    recipeName: "Thai Red Curry Ramen",
    recipeIngredients: "1/4 cup olive oil 1 small yellow onion, finely chopped, 8oz boneless skinless chicken thighs, cut into bite-sized pieces salt, 4oz shiitake mushrooms, sliced, 1 inch piece ginger, crushed, 2 large cloves garlic, crushed, 1 whole shallot, chopped, 3 1-inch pieces lemongrass, crushed, 2 tbsp red curry paste, 1 cup coconut cream, 4 cups chicken broth, 1 tbsp lime juice, 1 tsp lime zest, 1 tbsp fish sauce, 1 tbsp palm sugar, 4oz Chinese wheat noodles",
    recipeInstructions: "Heat the oil in a large wok over medium-high heat, Add the onion, sauté 2-3 minutes, Add the chicken and a generous pinch of salt, Sauté the chicken and onions for 3-4 more minutes, Add the shiitake mushrooms, ginger, garlic, shallot, lemongrass and red curry paste, mix until everything is well combined, Continue to sauté 3-4 minutes, Pour in the coconut cream and chicken broth, mix, Add the lime juice and zest, fish sauce and palm sugar, Bring to a boil, Add the noodles, cook for 3 minutes, Remove wok from heat, divide ramen into 2 large bowls, Top each with a soft boiled egg, Thai basil, green onion a sprinkle of sesame seeds and lime slices",
    img: {
        data: fs.readFileSync(path.join(__dirname + "/recipePictures/thai-red-curry-ramen.jpg")),
        contentType: "image/jpg"
    },
    userId: mozart._id,
    rating: "",
    createdDate: moment().format('MM-DD-YYYY').toString()
});

var comment1 = new Comment ({
    recipeId: recipe1._id, 

    userId: tyrone._id,

    rating: 4.5,

    userComment: "Looks pretty good! Will try it tonight."
});

var comment2 = new Comment ({
    recipeId: recipe2._id, 

    userId: gavin._id,

    rating: 5,

    userComment: "This recipe is the G.O.A.T!"
});

var comment3 = new Comment ({
    recipeId: recipe3._id, 

    userId: lance._id,

    rating: 4,

    userComment: "OOOOOOOOOOOOOO! SOLID RECIPE!"
});

var comment4 = new Comment ({
    recipeId: recipe4._id, 

    userId: janine._id,

    rating: 3.5,

    userComment: "Tried the recipe but I got lost a few steps in, wenk wonk..."
});

var comment5 = new Comment ({
    recipeId: recipe5._id, 

    userId: mozart._id,

    rating: 1,

    userComment: "I don't remember asking for the instructions."
});

async function resetAndLoad(){

    try{
        await User.deleteMany ({});
        await Comment.deleteMany ({});
        await Recipe.deleteMany ({});
        let update;
        let result = await tyrone.save();
        console.log(result);
        result = await gavin.save();
        console.log(result);
        result = await lance.save();
        console.log(result);
        result = await janine.save();
        console.log(result);
        result = await mozart.save();
        console.log(result);

        result = await recipe1.save();
        update = {
            shoppingListName: result.recipeName,
            shoppingListIngredients: result.recipeIngredients,
            shoppingListId:result._id.toString()
        };
        User.collection.updateOne ({
            _id: tyrone._id
        }, {
            $addToSet: { shoppingList: update }
        })


        result = await recipe2.save();
        update = {
            shoppingListName: result.recipeName,
            shoppingListIngredients: result.recipeIngredients,
            shoppingListId:result._id.toString()
        };
        User.collection.updateOne ({
            _id: gavin._id
        }, {
            $addToSet: { shoppingList: update }
        })

        result = await recipe3.save();
        update = {
            shoppingListName: result.recipeName,
            shoppingListIngredients: result.recipeIngredients,
            shoppingListId:result._id.toString()
        };
        User.collection.updateOne ({
            _id: lance._id
        }, {
            $addToSet: { shoppingList: update }
        })

        result = await recipe4.save();
        update = {
            shoppingListName: result.recipeName,
            shoppingListIngredients: result.recipeIngredients,
            shoppingListId:result._id.toString()
        };
        User.collection.updateOne ({
            _id: janine._id
        }, {
            $addToSet: { shoppingList: update }
        })

        result = await recipe5.save();
        update = {
            shoppingListName: result.recipeName,
            shoppingListIngredients: result.recipeIngredients,
            shoppingListId:result._id.toString()
        };
        User.collection.updateOne ({
            _id: mozart._id
        }, {
            $addToSet: { shoppingList: update }
        })

        result = await comment1.save();
        console.log(result);
        result = await comment2.save();
        console.log(result);
        result = await comment3.save();
        console.log(result);
        result = await comment4.save();
        console.log(result);
        result = await comment5.save();
        console.log(result);
    }
    catch (err){
        console.log (err);
    }

}

resetAndLoad().then(() => {
    console.log("Database was cleared and sample data is now loaded into the database.");
    process.exit();
})
.catch((err) => {
    console.log(err);
});