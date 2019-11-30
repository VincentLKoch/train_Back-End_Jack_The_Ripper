/*
    Query if we want better performance to find jack function, unless the mysql server is really slow or busy, it's faster to use sql engine to get the distance
*/
SELECT t1.id AS id, t1.name AS name, (t1.posX - t2.posX)*(t1.posX - t2.posX) + (t1.posY - t2.posY)*(t1.posY - t2.posY) AS sqDist
/* We use Square distance, doesn't change anything */
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
