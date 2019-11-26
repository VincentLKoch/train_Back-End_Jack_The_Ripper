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
            const dataRepositoryCitizens = connection.getRepository(LondonCitizen)
            

            //We put newStack in SQL
            await dataRepositoryCitizens.save(newCitizen)
            return newCitizen

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
            return await connection.getRepository(LondonCitizen)
                .createQueryBuilder("londonCItizen")
                .getMany();
        } catch (err) {
            console.error(err.message)
            throw err
        } finally {
            await connection.close()
        }
    }

    async getCitizen(citizenName, xPos, yPos) {
        let connection
        try {
            connection = await this.connect()
            return await connection.getRepository(LondonCitizen)
                .createQueryBuilder("londonCitizen")
                .where("londonCitizen.name = :name", { name: citizenName })
                .andWhere("londonCitizen.posX = :posX", { posX: xPos })
                .andWhere("londonCitizen.posY = :posY", { posY: yPos })
                .getOne();
        } catch (err) {
            console.error(err.message)
            throw err
        } finally {
            await connection.close()
        }
    }

    async makeCitizenVictim(citizenId) {
        let connection
        try {
            connection = await this.connect()
            await connection.createQueryBuilder()
                .update(LondonCitizen)
                .set({ isVictim: true })
                .where("londonCitizen.id=:id", { id: citizenId })
                .execute();
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
            await connection.getRepository(LondonCitizen)
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