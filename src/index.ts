import express from 'express';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

const app = express();
const port = 3000;

app.use(express.json());

// Dummy user data
let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' }
];

// Load Swagger YAML file
const swaggerDocument = yaml.load('./openApiSpec.yaml');

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Users endpoint
app.get('/users', (req, res) => {
    const { name } = req.query;

    if (name) {
        //@ts-ignore
        const filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(name.toLowerCase())
        );
        res.json(filteredUsers);
    } else {
        res.json(users);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});


// http://localhost:3000/users?name=j
// npm install swagger-ui-express yamljs
// 
