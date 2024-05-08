const express = require('express');
const axios = require('axios');
const cors = require('cors');  
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
const BEARER_TOKEN = process.env.BEARER_TOKEN;

app.get('/categories/:categoryname/products', async (req, res) => {
    console.log("check for data fetch");
    const { categoryname } = req.params;
    const { company, top, minPrice, maxPrice, page } = req.query;

    if (!company) {
        return res.status(400).json({ message: "Company parameter is required" });
    }

    const url = `http://20.244.56.144/test/companies/${company}/categories/${categoryname}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    const config = {
        headers: {
            'Authorization': `Bearer ${process.env.BEARER_TOKEN}`
        }
    };

    try {
        const response = await axios.get(url, config);
        const products = response.data;
        const n = parseInt(top);
        if (n > 10) {
            const pageNumber = parseInt(page) || 1;
            const startIndex = (pageNumber - 1) * n;
            const paginatedProducts = products.slice(startIndex, startIndex + n);
            res.json(paginatedProducts);
        } else {
            res.json(products);
        }
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ message: "Failed to fetch products", error: error.message });
    }
});


app.get('/categories/:categoryname/products/:productid', (req, res) => {
    const { categoryname, productid } = req.params;

    res.json({
        id: productid,
        name: "Example Product",
        category: categoryname,
        price: 299,
        rating: 4.5,
        discount: 10,
        company: "AMZ",
        availability: true,
        description: "Detailed description here."
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
