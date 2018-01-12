var date = new Date().setTime(new Date().getTime() + (60 * 60 * 1000))/1000;
module.exports = {
    secretKey: 'my_todo_app',
    expiration_date: date
}