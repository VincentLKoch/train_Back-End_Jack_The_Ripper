import { createConnection } from 'typeorm'
import { londonCitizenSchema } from './LondonCitizenSchema'
import LondonCitizen from './londonCitizen'

class Dal {
    async connect() {
        try {
            return await createConnection({
                type: 'mysql',
                host: '0.0.0.0',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'Db_London1888',
                entities: [londonCitizenSchema]
            })
        } catch (err) {
            console.error('Unable to connect')
            throw err
        }
    }

    async create(newCitizen) {
        let connection
        try {
            connection = await this.connect()
            //First get Repository
            //We put newStack in SQL
            return await connection
                .getRepository(LondonCitizen)
                .save(newCitizen)
        } catch (err) {
            console.error(err.message)
            throw err
        } finally {
            await connection.close()
        }
    }

    async countVictim() {
        let connection
        try {
            connection = await this.connect()
            return await connection
                .getRepository(LondonCitizen)
                .createQueryBuilder("londonCitizen")
                .where("londonCitizen.isVIctim = TRUE")
                .getCount()

        } catch (err) {
            console.error(err.message)
            throw err
        } finally {
            await connection.close()
        }
    }



    async getCitizensData() {
        let connection
        try {
            connection = await this.connect()
            return await connection
                .getRepository(LondonCitizen)
                .createQueryBuilder("londonCitizen")
                .getMany();
        } catch (err) {
            console.error(err.message)
            throw err
        } finally {
            await connection.close()
        }
    }


    async seperateVictimAndCitizens() {
        let connection
        try {
            connection = await this.connect()
            const victim = await connection
                .getRepository(LondonCitizen)
                .createQueryBuilder("londonCitizen")
                .where("londonCitizen.isVIctim = :isVictim", { isVictim: true })
                .getOne();

            const citizens = await connection
                .getRepository(LondonCitizen)
                .find({
                    isVictim: false
                })

            return [victim, citizens]

        } catch (error) {
            console.error(error.message)
            throw error
        } finally {
            await connection.close()
        }
    }

    async removeAll() {
        let connection
        try {
            connection = await this.connect()
            return await connection
                .getRepository(LondonCitizen)
                .query('TRUNCATE TABLE LondonCitizen')
        } catch (error) {
            console.error(error.message)
            throw error
        } finally {
            await connection.close()
        }
    }

}

export default Dal