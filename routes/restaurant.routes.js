import express from "express";
import Restaurant from '../models/Restaurant.js'

const restaurant = express.Router();

restaurant.get('/', (req, res) => {
    res.send('Rota de Restaurantes');
});

restaurant.post("/register", async (req, res) => {
    
    const { name, type, description, address } = req.body;

    const alreadyExistsRestaurant = await Restaurant.findOne({ where: { name } }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (alreadyExistsRestaurant) {
        return res.status(409).json({ message: "Lista ja registrada" });
    }

    const newRestaurant = new Restaurant({ name, type, description, address });
    const savedRestaurant = await newRestaurant.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Sorry! Could not register the List" });
    });

    if (savedRestaurant) res.json({ message: "Nova lista registrada!" });
});

restaurant.get('/find', async (req, res) => {
    const restaurants = await Restaurant.findAll().catch(
        (err) => {
            console.log(err)
        }
    );

    if (restaurants){
        return res.json({restaurants})
    } else {
        return null
    }
})

export default restaurant;