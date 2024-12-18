const path = require('path');
const date = (req, res, next) => {
    let date = new Date();
    let h = date.getHours();
    if (!(h >= 9 && h <= 17)) {
        const filePath = path.join(__dirname, '../public/', 'outOff.html');
        res.sendFile(filePath);
        return;
    }
    next()
}
module.exports = date;