const port = 4000;
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
// const { db } = require('pg');
const db = require('./db');
app.use(express.json());
app.use(cors());

// api Creation
app.get("/", (req, res) => {
    res.send("Express App is Running.")
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on port " + port)
    }
    else {
        console.log("Error : " + error)
    }
})

//Image storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.feildname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
}
)

const upload = multer({ storage: storage })
app.use('/images', express.static('upload/images'))

// Api for adding products for admin
app.post('/addproduct', async (req, res) => {
    try {
        const getLastProductIdQuery = 'SELECT id FROM products ORDER BY id DESC LIMIT 1';
        const lastProductResult = await db.query(getLastProductIdQuery);
        let id = 1;
        if (lastProductResult.rows.length > 0) {
            id = lastProductResult.rows[0].id + 1;
        }
        const { name, image, category, new_price, old_price } = req.body;
        const insertProductQuery = `
            INSERT INTO products (id, name, image, category, new_price, old_price)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const values = [id, name, image, category, new_price, old_price];
        const result = await db.query(insertProductQuery, values);
        res.json({
            success: true,
            name: name,
        });
    } catch (error) {
        console.error('Error inserting product:', error);
        res.status(500).json({ success: false, error: 'Failed to add product' });
    }
});

// Creating API for Deleting products for Admin
app.post('/removeproduct', async (req, res) => {
    const { id } = req.body;
    const deleteProductQuery = 'DELETE FROM products WHERE id = $1';
    const values = [id];
    try {
        await db.query(deleteProductQuery, values);
        console.log("Product removed");
        res.json({
            success: true,
            id: id,
        });
    } catch (error) {
        console.error('Error removing product:', error);
        res.status(500).json({ success: false, error: 'Failed to remove product' });
    }
});

// Creating API for fetching all products for admin
app.get('/allproducts', async (req, res) => {
    try {
        const allProductsQuery = 'SELECT * FROM products';
        const { rows: products } = await db.query(allProductsQuery);
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch products' });
    }
});

// User registration endpoint
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const checkUserQuery = 'SELECT * FROM Users WHERE email = $1';
        const checkUserValues = [email];
        const existingUser = await db.query(checkUserQuery, checkUserValues);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ success: false, errors: "Existing user found with the same email address." })
        }
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }
        const insertUserQuery = `
            INSERT INTO users (name, email, password, cartData)
            VALUES ($1, $2, $3, $4)
            RETURNING * `;
        const insertUserValues = [name, email, password, JSON.stringify(cart)];
        const newUser = await db.query(insertUserQuery, insertUserValues);
        const data = {
            user: {
                id: newUser.rows[0].id
            }
        }
        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token })

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, error: 'Failed to register user' });
    }
});

// creating endpoint for user login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const getUserQuery = 'SELECT * FROM Users WHERE email = $1';
        const getUserValues = [email];
        const userResult = await db.query(getUserQuery, getUserValues);

        if (userResult.rows.length === 0) {
            return res.json({ success: false, errors: "Wrong Email Id" });
        }

        const user = userResult.rows[0];
        const passCompare = password === user.password;

        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            };
            const expiresIn = '1d';
            const token = jwt.sign(data, 'secret_ecom', { expiresIn });
            res.json({ success: true, token });
        } else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ success: false, error: 'Failed to login' });
    }
});

// creating endpoint for newcollection data
app.get('/newcollections', async (req, res) => {
    try {
        const getNewCollectionQuery = 'SELECT * FROM products ORDER BY date DESC LIMIT 8';
        const { rows: newCollection } = await db.query(getNewCollectionQuery);
        res.json(newCollection);
    } catch (error) {
        console.error('Error fetching new collection:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch new collection' });
    }
});

// creating endpoint for popular in women section
app.get('/popularinwomen', async (req, res) => {
    try {
        const getPopularInWomenQuery = 'SELECT * FROM products WHERE category = $1 LIMIT 4';
        const category = 'women';
        const { rows: popularInWomen } = await db.query(getPopularInWomenQuery, [category]);
        res.json(popularInWomen);
    } catch (error) {
        console.error('Error fetching popular in women:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch popular in women' });
    }
});

// Middleware to fetch user details from token
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate using valid token." });
    }
    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ errors: "Please authenticate using valid token" });
    }
}

// Creating API for fetching products by category
app.get('/products/:category', fetchUser, async (req, res) => {
    try {
        const { category } = req.params;
        const getProductsByCategoryQuery = 'SELECT * FROM products WHERE category = $1';
        const { rows: products } = await db.query(getProductsByCategoryQuery, [category]);
        res.json(products);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch products by category' });
    }
});

//Endpoint for adding products to cart
app.post('/addtocart', fetchUser, async (req, res) => {
    try {
        const { itemId } = req.body;
        const { id } = req.user;
        // console.log("Added", req.body.itemId);
        const getUserCartQuery = 'SELECT cartData FROM users WHERE id = $1';
        const userCartResult = await db.query(getUserCartQuery, [id]);

        if (userCartResult.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        let cartData = userCartResult.rows[0].cartdata || {};
        cartData[itemId] = cartData[itemId] ? cartData[itemId] + 1 : 1;

        const updateCartQuery = 'UPDATE users SET cartData = $1 WHERE id = $2';
        await db.query(updateCartQuery, [JSON.stringify(cartData), id]);

        res.json({ success: true, message: 'Item added to cart' });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ success: false, error: 'Failed to add product to cart' });
    }
});

// Endpoint for removing product from cartItem
app.post('/removefromcart', fetchUser, async (req, res) => {
    try {
        const { itemId } = req.body;
        const { id } = req.user;
        const getUserCartQuery = 'SELECT cartData FROM users WHERE id = $1';
        const userCartResult = await db.query(getUserCartQuery, [id]);
        if (userCartResult.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        let cartData = userCartResult.rows[0].cartdata || {};
        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        }
        const updateCartQuery = 'UPDATE users SET cartData = $1 WHERE id = $2';
        await db.query(updateCartQuery, [JSON.stringify(cartData), id]);

        res.json({ success: true, message: 'Item removed from cart' });
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({ success: false, error: 'Failed to remove product from cart' });
    }
});

// Endpoint to get cart data
app.post('/getcart', fetchUser, async (req, res) => {
    try {
        const { id } = req.user;
        const getUserCartQuery = 'SELECT cartData FROM Users WHERE id = $1';
        const userCartResult = await db.query(getUserCartQuery, [id]);

        if (userCartResult.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const userData = userCartResult.rows[0];
        const cartData = userData.cartdata;
        res.json(cartData);
    } catch (error) {
        console.error('Error fetching cart data:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch cart data' });
    }
});

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})
