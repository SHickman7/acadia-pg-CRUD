# CRUD!

The 4 thigns we want to do with data!

| Idea   | Axios/Express | SQL |
| ------ | ------------- | --- |
| CREATE | POST          | INSERT |
| READ   | GET           | SELECT |
| UPDATE | PUT           | UPDATE ___ SET |
| DELETE | DELETE        | DELETE |

## Sending Data From the Client (Axios)
GET - You don't usually send data
POST - Use a `data` object for content.
DELETE - Use a `url parameter` for the `id`
PUT - Use a `url parameter` for the `id`, and a `data` object for any content.

## You have to have a database set up for this to wrk

0) Make sure postgres is running!

1) Checkout the value of `database:` in `songs.router.js` to see what to call the database.

2) Checkout `database.sql` to see what sql to run in postico, to get things set up

3) `npm run engage` starts up the server

## Lecture notes

[GET/POST](https://github.com/PrimeAcademy/acadia-syllabus/blob/main/curriculum-content/week-08-fullstack-sql/08-02a_pg-intro.md)  
[DELETE](https://github.com/PrimeAcademy/acadia-syllabus/blob/main/curriculum-content/week-08-fullstack-sql/08-03b_params-delete.md)  
[PUT](https://github.com/PrimeAcademy/acadia-syllabus/blob/main/curriculum-content/week-08-fullstack-sql/08-03c_put.md)  
