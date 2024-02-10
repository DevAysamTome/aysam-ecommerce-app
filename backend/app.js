const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT || 3001;
const cors=require("cors");
const cookieParser = require('cookie-parser');
const salt = 10;
const http = require("http");
const path = require('path');



const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    methods :["POST" , "GET"],
    
}

app.use(cors(corsOptions));
app.use(cookieParser()); // Add this line
app.use(express.json());
app.use(express.static(path.join(__dirname , "../client/")));


// MySQL database connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecommerce',
};

const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});


// Define an API endpoint to fetch data
app.get('/api/data', (_req, res) => {
  // Perform a simple SELECT query
  const query = 'SELECT * FROM products ';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/data/feutred', (_req, res) => {
    // Perform a simple SELECT query
    const query = 'SELECT * FROM products  JOIN categories ON products.categoryId = categories.id where addtofeutre = true';
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  });

  app.get('/api/data/category/electronic', (_req, res) => {
    // Perform a simple SELECT query
    const query = 'SELECT * FROM products  JOIN categories ON products.categoryId = categories.id where products.categoryId=3';
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  });
  
  app.get('/api/data/category/jewelery', (_req, res) => {
    // Perform a simple SELECT query
    const query = 'SELECT * FROM products  JOIN categories ON products.categoryId = categories.id where products.categoryId=4';
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  });
  

  app.get('/api/data/category/sports', (_req, res) => {
    // Perform a simple SELECT query
    const query = 'SELECT * FROM products  JOIN categories ON products.categoryId = categories.id where products.categoryId=5';
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  });
  

  app.get('/api/data/category', (_req, res) => {
    // Perform a simple SELECT query
    const query = 'SELECT categories.id, categories.name ,categories.imageUrl , COUNT(products.id) AS productCount FROM categories LEFT JOIN products ON categories.id = products.categoryId GROUP BY categories.id, categories.name;'
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  });

  app.get('/api/data/category/Mens-Clothing', (_req, res) => {
    // Perform a simple SELECT query
    const query = 'SELECT * FROM products  JOIN categories ON products.categoryId = categories.id  where products.categoryId=1;'
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  });
 
  app.get('/api/data/category/Women-Clothing', (_req, res) => {
    // Perform a simple SELECT query
    const query = 'SELECT * FROM products  JOIN categories ON products.categoryId = categories.id  where products.categoryId=2;'
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  });

  app.get('/home', (req, res) => {
    // Verify JWT token and return user data in the response
    const token = req.cookies.token;
    if (token) {
      jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: 'Unauthorized' })
        }
        // Return user data in the response
        const query = 'SELECT * FROM users WHERE id = ?'
        connection.query(query, [decoded.id], (err, results) => {
          if (err){
            console.error('Error executing MySQL query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
            
        else{
          return res.status(200).json({ name: decoded.name }) 
        }
      })
    }) 
  }})

  app.get('/admin/dashboard', (req, res) => {
    // Verify JWT token and return user data in the response
    const tokens = req.cookies.tokens;
    const isAdmin = false;

    if (tokens) {
      jwt.verify(tokens, 'jwt-secret-keys', (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: 'Unauthorized' })
        }
        // Return user data in the response
        const query = 'SELECT * FROM admin WHERE id = ?'
        connection.query(query, [decoded.id], (err, results) => {
          if (err){
            console.error('Error executing MySQL query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
        else{
          return res.status(200).json({isAdmin:true, name: decoded.name })
        }
      })
    }) 
  }})

  app.get('/logout', (req, res) => {
    // Clear the JWT token from the cookie
    res.cookie('token', null, { maxAge: 0 })
    res.cookie('tokens', null, { maxAge: 0 })

    return res.status(200).json({ message: 'Logout successful' })
  });

  app.post('/signup', (req, res) => {
    // Perform a SELECT query to find the user with the given email and password
    const query = 'SELECT * FROM users WHERE `email`  = ?'
    const values = [req.body.email]
    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err)
        res.status(500).json({ error: 'Internal Server Error' })
      } else if (results.length > 0) {
        // If a user is found, return an error message
        res.status(400).json({ error: 'Email already in use' })
        
      } else if(req.body.username !== '' || req.body.password !== '' || req.body.email !== ''){

     
        // Insert the new user into the database
        const insertQuery = 'INSERT INTO users (`name`, `email`, `password`) VALUES (?,?,?)';
        bcrypt.hash(req.body.password,salt,(err,hash) =>{
          if(err) return res.json({Error:"Error for Hashing password"});
          const insertValues = [req.body.username, req.body.email, hash];
  
          connection.query(insertQuery, insertValues, (err, _results) => {
            if (err) {
              console.error('Error executing MySQL query:', err)
              res.status(500).json({ error: 'Internal Server Error' })
            } else {
              // If the insert was successful, return a success message
              res.status(200).json({ message: 'User created successfully' })
            }
          })
        })
      }
    })
  })
  


/*   app.post("/login/auth" ,(req,res)=>{
    const values = [req.body.email,req.body.password]
    const query = 'SELECT * FROM users WHERE email  = ?';
    connection.query(query, [req.body.email], (err, data) => {
      if (err) 
        return res.json({ Error: 'Internal Server Error' });
      if (data.length > 0)
      {
        bcrypt.compare(req.body.password , data[0].password , (err,response) =>{
          if(err) return res.json({Error:"Password compare failed"});
          if(response){
            const name = data[0].name;
            const token = jwt.sign({name},"jwt-secret-key",{expiresIn:'1d'});
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json({ Status: 'Success', message: 'Login successful'});
          }
          else{
            return res.json({Error:"Password Not Match"});
          }
        })
        // If a user is found, set the Location header to the URL of the home page
      } else{
        return res.json({Error:"No Email Exited"});

      }
    })
  }) */

  app.post('/login/auth', (req, res) => {
    const { email, password } = req.body;
  
    const User = 'SELECT * FROM users WHERE email = ?';
    connection.query(User, [email], (err, users) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (users.length === 0) {
        const Admin = 'SELECT * FROM admin WHERE admin_email = ?';
        connection.query(Admin, [email], (err, admins) => {
          if (err) {
            console.error('Error executing MySQL query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
  
          if (admins.length === 0) {
            return res.status(401).json({
              Status: 'Error',
              Message: 'Invalid email or password',
            });
          }
  
          // Admin found, compare the password
          bcrypt.compare(password, admins[0].password, (err, responseadmin) => {
            if (err) {
              return res.json({ Error: 'Password compare failed' });
            }
  
            if (responseadmin) {
              const name = admins[0].name;
              const tokens = jwt.sign({ name }, 'jwt-secret-keys', {
                expiresIn: '1d',
              });
              res.cookie('tokens', tokens, { httpOnly: true });
              return res.status(200).json({
                Status: 'Success',
                Message: 'Admin logged in successfully',
                admin: admins[0],
              });
            }
  
            return res.json({ Error: 'Password Not Match' });
          });
        });
      } else {
        // User found, compare the password
        bcrypt.compare(password, users[0].password, (err, responseuser) => {
          if (err) {
            return res.json({ Error: 'Password compare failed' });
          }
  
          if (responseuser) {
            const name = users[0].name;
            const token = jwt.sign({ name }, 'jwt-secret-key', {
              expiresIn: '1d',
            });
            res.cookie('token', token, { httpOnly: true });
            return res.status(200).json({
              Status: 'Success',
              Message: 'User logged in successfully',
              user: users[0],
            });
          }
  
          return res.json({ Error: 'Password Not Match' });
        });
      }
    });
  });
  


    
 
// Start the server
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on http://localhost:8080`);
});
