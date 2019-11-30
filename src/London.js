import Dal from './dal'
import LondonCitizen from './londonCitizen'

class London {

    constructor() {
        this.dal = new Dal()
    }

    async createCitizen(name, posX, posY) {
        try {
            return await this.dal.create(new LondonCitizen(null, name, posX, posY, false))
        } catch (err) {
            throw err //re-throw any error, app.js will check if it's know or not
        }
    }

    async createVictim(name, posX, posY) {
        try {
            //test if there is already a victim
            if (await this.dal.countVictim() !== 0) {
                throw "already a Victim"
            }

            //create        
            return await this.dal.create(new LondonCitizen(null, name, posX, posY, true))
        } catch (error) {
            throw error
        }
    }

    async removeEvidences() {
        try {
            //no need to return the number anything
            await this.dal.removeAll()
        } catch (error) {
            throw error
        }
    }

    //See getClosest.sql for the query / comment of an SQL way to get Jack (way faster)
    //But since this TP is a javascript TP we will do it in javascript
    async findJack() {
        try {
            const victim = await this.dal.getData(true)
            if (!victim || !(victim.length > 0)) {
                throw "No Victim"
            }

            const citizens = await this.dal.getData(false)
            if (!citizens || !(citizens.length > 0)) { throw "No Citizen" }


            const result = citizens.map(civil => {
                //We use sqare distance, no need to root it in this case
                const dist = (civil.posX - victim[0]['posX']) * (civil.posX - victim[0]['posX']) + (civil.posY - victim[0]['posY']) * (civil.posY - victim[0]['posY'])
                return { citizen: civil, distance: dist }
            })

            const jack = result.reduce((civil1, civil2) => {
                return (civil1.distance < civil2.distance ? civil1 : civil2); // return the civil closest of the two by two reducing
            })

            //We got "Jack" but we still need to check if there is 2 closest citizen
            if (result.filter((civil) => {
                return civil.distance === jack.distance
            }).length !== 1) {
                throw "Two Jack ?"
            }

            return jack.citizen

        } catch (error) {
            throw error
        }
    }
}

const london = new London()
export const getLondon = () => london