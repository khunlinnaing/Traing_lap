const express = require('express');
const StudentRoute = require('./routes/StudentRoute');
const app = express();
app.use(express.json());
app.use('/api/student', StudentRoute);
app.listen(5000, () => {
    console.log('Server started on port 5000');
});