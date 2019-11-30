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
            if (this.dal.countVictim() !== 0) {
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
            await this.dal.removeAll()
        } catch (error) {
            throw error
        }
    }


    async findClosestCitizen() {
        try {
            const seperated = await this.dal.seperateVictimAndCitizens()
            const victim = seperated[0]
            const citizens = seperated[1]
            let closestIndex = 0
            let distance = 0
            let oneClosest = true

            if (!victim) { throw "fin1" } // no victim found
            if (!citizens) { throw "fin2" }

            for (let index = 0; index < citizens.length; index++) {
                const citizen = await citizens[index];
                let xDiff = citizen.posX - victim.posX
                let yDiff = citizen.posY - victim.posY

                xDiff *= xDiff
                yDiff *= yDiff

                let dist = Math.sqrt(xDiff + yDiff)

                if (index == 0) {
                    distance = dist
                    oneClosest = true
                }

                else {
                    if (dist < distance) {
                        distance = dist

                        closestIndex = index
                        oneClosest = true
                    }
                    else if (dist == distance) { oneClosest = false }
                }
            }

            if (!oneClosest) { throw "fin3" } // more than one citizen is the closest 


            return await citizens[closestIndex]

        } catch (error) {
            throw error
        }
    }
}

const london = new London()
export const getLondon = () => london