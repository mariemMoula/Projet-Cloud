const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3001;

// Configurer Sequelize et se connecter à la base de données MySQL
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'your-rds-endpoint',
    dialect: 'mysql',
});

// Définir un modèle User pour la table Users
const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Synchroniser le modèle avec la base de données
sequelize.sync();

app.use(bodyParser.json());

// Route pour enregistrer un utilisateur
app.post('/api/register', async (req, res) => {
    try {
        const { firstName, lastName } = req.body;
        const user = await User.create({ firstName, lastName });
        res.json({ success: true, user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Route pour obtenir la liste des utilisateurs
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const sequelize1 = new Sequelize('projectrdb', 'mimi', 'mimi019mimi', {
    host: 'projectrdb.cxmgi6wu6c5b.us-east-1.rds.amazonaws.com:3306',
    dialect: 'mysql',
});
