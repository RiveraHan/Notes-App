/**
 * Fichero principal o main
 */

require('dotenv').config();
const app = require('./server');

require('./database');
require('./config/passport');


// Server is listenning
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));

});