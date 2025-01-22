const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');

mongoose.connect('mongodb://mongodb:27017/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    console.log('Registering user:', { name, email }); // Debug log

    try {
        const existingUser = await User.findOne({ name });
        if (existingUser) {
            console.log('User already exists');
            return res.status(400).send('User already exists');
        }

	const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        console.log('User created successfully'); // Debug log
        res.status(201).send('User created');
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Error creating user');
    }
});


app.get('/users', async (req, res) => {
    User.find() // Find all users
        .then(users => res.status(200).json(users)) // Send back the users as JSON
        .catch(err => {
            console.error('Error retrieving users:', err);
            res.status(500).send('Error retrieving users');
        });
});

app.post('/login', async (req, res) => {
    const { name, password } = req.body;

    try {
        console.log('Attempting to log in with username:', name); // Debug log
        
        const user = await User.findOne({ name });
        
        if (!user) {
            console.log('User not found'); // Debug log
            return res.status(401).send('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            console.log('Invalid password'); // Debug log
            return res.status(401).send('Invalid password');
        }

        res.status(200).send('Login successful');
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).send('Error logging in');
    }
});


app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
