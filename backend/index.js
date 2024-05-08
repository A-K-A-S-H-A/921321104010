const express = require('express');
const axios = require('axios');
const cors = require('cors');  
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let bearerToken = null;

async function fetchToken() {
  const authUrl = 'http://20.244.56.144/test/auth';
  const authData = {
    companyName: "PSNA college of Engineering and Technology",
    clientID: "a5782fb7-ef43-4f2d-b8ce-b04600fd73ee",
    clientSecret: "UzwPGHNoWVzClVNc",
    ownerName: "Akash A",
    ownerEmail: "akasha21cs@psnacet.edu.in",
    rollNo: "921321104010"
  };

  try {
    const response = await axios.post(authUrl, authData);
    bearerToken = response.data.access_token;
    console.log('Token refreshed');
  } catch (error) {
    console.error('Failed to fetch token:', error);
  }
}

// Initial token fetch
fetchToken();
// Refresh token every three minutes
setInterval(fetchToken, 180000);
console.log(bearerToken);





// .then((response) => {
//   console.log(JSON.stringify(response.data));
// })
// .catch((error) => {
//   console.log(error);
// });









app.get('/categories/:categoryname/products', async (req, res) => {
    console.log("check for data fetch");
    const { categoryname } = req.params;
    const { company, top, minPrice, maxPrice, page } = req.query;
    console.log(categoryname,company,top,minPrice,maxPrice,page)
    console.log(bearerToken);
    if (!company) {
        return res.status(400).json({ message: "Company parameter is required" });
    }
    const url = `http://20.244.56.144/test/companies/${company}/categories/${categoryname}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url || 'http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${bearerToken}`
        }
      };
      
     

    try {
        const response = await axios.request(config);
        console.log("response receiVED")
        //console.log(response);
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
