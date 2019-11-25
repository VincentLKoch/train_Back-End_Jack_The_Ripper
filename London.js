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
                throw "vic 1"
            }
            //If there is a stack in the envelope
            if ((victim.posX !== xPos)||( victim.posY !== yPos)) {
                //Incorrect positions given
                throw "vic 2"
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


}

const london = new London()
export const getLondon = () => london