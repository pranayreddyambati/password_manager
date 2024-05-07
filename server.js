// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require('express-session');
const dotenv = require("dotenv");


const app = express();
dotenv.config();

const port = process.env.PORT || 5000;

const username = process.env.MONGODB_USERNAME
const password = process.env.MONGODB_PASSWORD

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Use the session middleware
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false
}));

mongoose.connect("mongodb+srv://"+username+":"+password+"@cluster0.uessgmm.mongodb.net/passwordManagerDB")

// Define a mongoose schema for the user
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  savedCredentials: [{
    website: String,
    username: String,
    password: String,
  }],
});

const User = mongoose.model('User', userSchema);

// Route for the Success page
app.get("/success", async (req, res) => {
  try {
    // Assume the user is logged in (you should implement proper authentication)
    const loggedInUser = await User.findOne({ username: req.session.username });

    if (loggedInUser) {

      const savedCredentials = loggedInUser.savedCredentials;

      // Display saved credentials in a table
      if (savedCredentials.length > 0) {

        let tableHtml = '<title>Password Manager</title>';
        tableHtml += '<link rel="stylesheet" href="./success.css"></link>';
        tableHtml += `
          <header>
            <h2>Password Manager</h2>
            <a href="/signout">Sign Out</a>
          </header>
        `;
        
        tableHtml += '<main>';
        tableHtml += '<h3>Saved Passwords</h3>';
        tableHtml += '<table border="1"><tr><th>Website</th><th>Username</th><th>Password</th><th>Action</th></tr>';

        tableHtml += `
        <tr id="addCredentialsRow">
          <td>
            <input type="text" name="website" placeholder="Enter Website" required="">
          </td>
          <td>
            <input type="text" name="username" placeholder="Enter Username" required="">
          </td>
          <td>
            <input type="password" name="password" placeholder="Enter Password" required="">
          </td>
          <td>
            <input type="submit" value="Add Credentials" onclick="addCredentials()">
          </td>
        </tr>
        `;

        savedCredentials.forEach((credential, index) => {
          tableHtml += `<tr><td>${credential.website}</td><td>${vigenereDecrypt(credential.username, loggedInUser.username)}</td>`;
          tableHtml += `<td class="password" onclick="togglePassword(this)" data-password="${vigenereDecrypt(credential.password, loggedInUser.username)}">*********</td>`;
          tableHtml += `<td><a href="/success/delete/${index}">Delete</a></td></tr>`;
        });

        tableHtml += '</table>';

        tableHtml += '</main>';
        tableHtml += `
        <script>
          function togglePassword(element) {
            const currentType = element.getAttribute("data-original-type");
        
            if (currentType === "password") {
              element.innerHTML = element.getAttribute("data-password");
              element.setAttribute("data-original-type", "text");
            } else {
              element.innerHTML = "*********";
              element.setAttribute("data-original-type", "password");
            }
          }

          function addCredentials() {
            const website = document.querySelector('input[name="website"]').value;
            const username = document.querySelector('input[name="username"]').value;
            const password = document.querySelector('input[name="password"]').value;
          
            // Validation
            if (!website || !username || !password) {
              alert("Please fill in all fields.");
              return;
            }
          
            // Create a form dynamically
            const form = document.createElement('form');
            form.method = 'post';
            form.action = '/success/add';
          
            // Create input fields for each value
            const websiteField = document.createElement('input');
            websiteField.type = 'text';
            websiteField.name = 'website';
            websiteField.value = website;
            form.appendChild(websiteField);
          
            const usernameField = document.createElement('input');
            usernameField.type = 'text';
            usernameField.name = 'username';
            usernameField.value = username;
            form.appendChild(usernameField);
          
            const passwordField = document.createElement('input');
            passwordField.type = 'password';
            passwordField.name = 'password';
            passwordField.value = password;
            form.appendChild(passwordField);
          
            // Append the form to the document
            document.body.appendChild(form);
          
            // Submit the form
            form.submit();
          }          
        </script>
        `;
        

        res.send(tableHtml);
      } else {

        let messageHtml = '<title>Password Manager</title>';
        messageHtml += '<link rel="stylesheet" href="./success.css"></link>';
        messageHtml += `
          <header>
            <h2>Password Manager</h2>
            <a href="/signout">Sign Out</a>
          </header>
        `;
        messageHtml += '<main>';
        messageHtml += '<h3>Saved Passwords</h3>';
        messageHtml += '<table border="1"><tr><th>Website</th><th>Username</th><th>Password</th><th>Action</th></tr>';
        messageHtml += `
          <tr id="addCredentialsRow">
            <td>
              <input type="text" name="website" placeholder="Enter Website" required="">
            </td>
            <td>
              <input type="text" name="username" placeholder="Enter Username" required="">
            </td>
            <td>
              <input type="password" name="password" placeholder="Enter Password" required="">
            </td>
            <td>
              <input type="submit" value="Add Credentials" onclick="addCredentials()">
            </td>
          </tr>
        `;

        // Display message when there are no saved passwords
        messageHtml += '<tr>';
        messageHtml += `<td colspan="4" style="text-align: center;">No Saved Passwords</td>`;
        messageHtml += '</tr>';


        messageHtml += '</table>';
        messageHtml += '</main>';
        messageHtml += `
          <script>
            function addCredentials() {
              const website = document.querySelector('input[name="website"]').value;
              const username = document.querySelector('input[name="username"]').value;
              const password = document.querySelector('input[name="password"]').value;
            
              // Validation
              if (!website || !username || !password) {
                alert("Please fill in all fields.");
                return;
              }
            
              // Create a form dynamically
              const form = document.createElement('form');
              form.method = 'post';
              form.action = '/success/add';
            
              // Create input fields for each value
              const websiteField = document.createElement('input');
              websiteField.type = 'text';
              websiteField.name = 'website';
              websiteField.value = website;
              form.appendChild(websiteField);
            
              const usernameField = document.createElement('input');
              usernameField.type = 'text';
              usernameField.name = 'username';
              usernameField.value = username;
              form.appendChild(usernameField);
            
              const passwordField = document.createElement('input');
              passwordField.type = 'password';
              passwordField.name = 'password';
              passwordField.value = password;
              form.appendChild(passwordField);
            
              // Append the form to the document
              document.body.appendChild(form);
            
              // Submit the form
              form.submit();
            }          
          </script>
        `;

        res.send(messageHtml);


      }
    } else {
      // Handle case where the user is not logged in
      const errorMessage = "You are not logged in.";
      res.send(`<script>alert("${errorMessage}"); window.location.href = "/";</script>`);
    }
  } catch (err) {
    // Handle errors with client-side alert
    const errorMessage = "An unexpected error occurred. Please try again later.";
    res.send(`<script>alert("${errorMessage}"); window.location.href = "/";</script>`);
  }
});

// Route for signing out
app.get("/signout", (req, res) => {
  // Destroy the session and redirect to the Sign In page
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    res.redirect('/');
  });
});

// Route for the Sign In page
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/public/signin.html');
});

// Route for the Sign Up page
app.get("/signup", (req, res) => {
  res.sendFile(__dirname + '/public/signup.html');
});

// Route for handling sign-in
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const loggedInUser = await User.findOne({ username: username });

    if (loggedInUser && vigenereDecrypt(loggedInUser.password, username) === password) {
      // Store the logged-in user in the session
      req.session.username = loggedInUser.username;
      // Redirect to the success page upon successful sign-in
      res.redirect('/success');
    } else {
      // Handle unsuccessful sign-in with client-side alert
      const errorMessage = "Invalid username or password. Please try again.";
      res.send(`<script>alert("${errorMessage}"); window.location.href = "/";</script>`);
    }
  } catch (err) {
    // Handle errors with client-side alert
    const errorMessage = "An unexpected error occurred. Please try again later.";
    res.send(`<script>alert("${errorMessage}"); window.location.href = "/";</script>`);
  }
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
      // User already exists, handle accordingly with client-side alert
      const errorMessage = "Username already taken. Please choose a different username.";
      res.send(`<script>alert("${errorMessage}"); window.location.href = "/signup";</script>`);
    } else {
      // Create a new user
      const newUser = new User({
        username: username,
        password: vigenereEncrypt(password, username),
        savedCredentials: [],
      });

      await newUser.save();
      const errorMessage = "User Signned Up Successfully!";
      res.send(`<script>alert("${errorMessage}"); window.location.href = "/";</script>`);
    }
  } catch (err) {
    // Handle errors with client-side alert
    const errorMessage = "An unexpected error occurred. Please try again later.";
    res.send(`<script>alert("${errorMessage}"); window.location.href = "/signup";</script>`);
  }
});

// Route for adding new credentials
app.post("/success/add", async (req, res) => {
  try {
    // Assume the user is logged in (you should implement proper authentication)
    const loggedInUser = await User.findOne({ username: req.session.username });

    if (loggedInUser) {
      
      const { website, username, password } = req.body;

      // Add new credentials to the user's savedCredentials array
      loggedInUser.savedCredentials.push({
        website: website,
        username: vigenereEncrypt(username, loggedInUser.username),
        password: vigenereEncrypt(password, loggedInUser.username),
      });

      await loggedInUser.save();
      res.redirect('/success');
    } else {
      // Handle case where the user is not logged in
      const errorMessage = "You are not logged in.";
      res.send(`<script>alert("${errorMessage}"); window.location.href = "/";</script>`);
    }
  } catch (err) {
    // Handle errors with client-side alert
    const errorMessage = "An unexpected error occurred. Please try again later.";
    res.send(`<script>alert("${errorMessage}"); window.location.href = "/";</script>`);
  }
});

// Route for deleting credentials
app.get("/success/delete/:index", async (req, res) => {
  try {
    // Assume the user is logged in (you should implement proper authentication)
    const loggedInUser = await User.findOne({ username: req.session.username });

    if (loggedInUser) {
      const index = req.params.index;

      // Remove the credential at the specified index
      loggedInUser.savedCredentials.splice(index, 1);

      await loggedInUser.save();
      res.redirect('/success');
    } else {
      // Handle case where the user is not logged in
      const errorMessage = "You are not logged in.";
      res.send(`<script>alert("${errorMessage}"); window.location.href = "/";</script>`);
    }
  } catch (err) {
    // Handle errors with client-side alert
    const errorMessage = "An unexpected error occurred. Please try again later.";
    res.send(`<script>alert("${errorMessage}"); window.location.href = "/";</script>`);
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Vigenère Cipher Encryption
function vigenereEncrypt(plainText, key) {
  const alphabetLength = 26;
  let encryptedText = '';

  for (let i = 0, j = 0; i < plainText.length; i++) {
    const char = plainText.charAt(i);

    if (/[a-zA-Z]/.test(char)) {
      const shift = key[j % key.length].toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
      const isUpperCase = char === char.toUpperCase();

      const encryptedChar = String.fromCharCode(
        ((char.charCodeAt(0) - (isUpperCase ? 'A' : 'a').charCodeAt(0) + shift) % alphabetLength) +
          (isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0))
      );

      encryptedText += encryptedChar;
      j++;
    } else {
      encryptedText += char;
    }
  }

  return encryptedText;
}


// Vigenère Cipher Decryption
function vigenereDecrypt(encryptedText, key) {
    const alphabetLength = 26;
    let decryptedText = '';

    for (let i = 0, j = 0; i < encryptedText.length; i++) {
    const char = encryptedText.charAt(i);
    
    if (/[a-zA-Z]/.test(char)) {
        const shift = key[j % key.length].toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
        const isUpperCase = char === char.toUpperCase();
        
        const decryptedChar = String.fromCharCode(
            ((char.charCodeAt(0) - (isUpperCase ? 'A' : 'a').charCodeAt(0) - shift + alphabetLength) % alphabetLength) +
            (isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0))
            );
            
            decryptedText += decryptedChar;
            j++;
          } else {
      decryptedText += char;
    }
  }
  
  return decryptedText;
}
