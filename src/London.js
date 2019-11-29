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
            
            if ((victim.posX !== xPos)||( victim.posY !== yPos)) {
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
            let closestIndex = 0
            let distance = 0
            let oneClosest = true 

            if (!victim) {throw "fin1"} // no victim found
            if (!citizens){throw "fin2"}

            for (let index = 0; index < citizens.length; index++) {
                const citizen = await citizens[index];
                let xDiff = citizen.posX - victim.posX
                let yDiff = citizen.posY - victim.posY

                xDiff *= xDiff
                yDiff *= yDiff

                let dist = Math.sqrt( xDiff + yDiff )

                if (index == 0){ 
                    distance = dist
                    oneClosest = true
                }

                else{
                    if(dist < distance){
                        distance = dist
                        closestIndex = index
                        oneClosest = true
                    }
                    else if (dist = distance) {oneClosest = false}
                }
            }

        if (!oneClosest) {throw "fin3"} // more than one citizen is the closest 

        return await citizens[closestIndex]

        } catch (error) {
            throw error
        }
    }
}

const london = new London()
export const getLondon = () => london