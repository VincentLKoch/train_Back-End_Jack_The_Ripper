/*
    Query if we want better performance to find jack function
    Unless the mysql server is really slow or busy, it is faster to use sql engine to get the distance and filter the rows
*/
SELECT t1.id AS id, t1.name AS name, (t1.posX - t2.posX)*(t1.posX - t2.posX) + (t1.posY - t2.posY)*(t1.posY - t2.posY) AS sqDist
/* We use Square distance, doesn't change anything in this case*/
FROM (
        SELECT *
    FROM LondonCitizen
    WHERE isVictim = false) 
            AS t1
    LEFT OUTER JOIN (
        SELECT *
    FROM LondonCitizen
    WHERE isVictim = true) AS t2
    ON t1.isVictim = false
/*JoinEveryWHERE*/
ORDER BY sqDist ASC
LIMIT 2;
/* We limit at two row: we need the closest and next one to check if there is not 2 closests */
