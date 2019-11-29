import Dal from './dal'
import LondonCitizen from './londonCitizen'

class London {

    constructor() {
        this.dal = new Dal()
        this.victimExists = false
    }

    async createCitizen(name, posX, posY) {
        try {
            return await this.dal.create(new LondonCitizen(null, name, posX, posY, false))
        } catch (err) {
            console.error(err.message)
            throw err
        }
    }

    async makeVictim(name, xPos, yPos) {
        try {
            const victim = await this.dal.getCitizen(name, xPos, yPos)
            if (this.victimExists) { //already a victim
                throw "vic1"
            }

            if ((victim.posX !== xPos) || (victim.posY !== yPos)) {
                //Incorrect positions given
                throw "vic2"
            }
            //making the citizen the victim
            await this.dal.makeCitizenVictim(victim.id)
            this.victimExists = true
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
            let closestIndex
            let dist
            let numClosest = 0

            if (!victim) { throw "fin1" } // no victim found
            if (!citizens) { throw "fin2" }

            for (let index = 0; index < citizens.length; index++) {
                const citizen = await citizens[index];
                xDiff = citizen.posX - victim.posX
                yDiff = citizen.posY - victim.posY

                xDiff *= xDiff
                yDiff *= yDiff

                dist = Math.sqrt(xs + ys)

                if (index == 0) {
                    dist = dist
                    numClosest = 1
                }

                else {
                    if (dist < dist) {
                        dist = dist
                        numClosest = 1
                        closestIndex = index
                    }
                    else if (dist = dist) { numClosest = numClosest + 1 }
                }
            }

            if (numClosest !== 1) { throw "fin3" } // more than one citizen is the closest 

            return await citizens[closestIndex]

        } catch (error) {
            throw error
        }
    }
}

const london = new London()
export const getLondon = () => london