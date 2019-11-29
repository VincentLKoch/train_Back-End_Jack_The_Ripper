import Dal from './dal'
import LondonCitizen from './londonCitizen'

class London {

    constructor() {
        this.dal = new Dal()
        this.victimExists = false
        this.numClosest = 0
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
            const closestIndex 
            const distance 
            if (!victim) {throw "fin1"} // no victim found

            for (let index = 0; index < citizens.length; index++) {
                const citizen = await citizens[index];
                xDiff = citizen.posX - victim.posX
                yDiff = citizen.posY - victim.posY

                xDiff *= xDiff
                yDiff *= yDiff

                dist = Math.sqrt( xs + ys )

                if (index == 0){ 
                    distance = dist
                    this.numClosest = 1
                }

                else{
                    if(dist < distance){
                        distance = dist
                        this.numClosest = 1
                        closestIndex = index
                    }
                    else if (dist = distance) {this.numClosest = this.numClosest + 1}
                }
            }

        if (this.numClosest !== 1) {throw "fin2"} // more than one citizen is the closest 

        return citizens[closestIndex]

        } catch (error) {
            throw error
        }
    }
}

const london = new London()
export const getLondon = () => london