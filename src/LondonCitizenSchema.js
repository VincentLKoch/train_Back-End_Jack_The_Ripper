import LondonCitizen from './londonCitizen'
import { EntitySchema } from 'typeorm'

export const londonCitizenSchema = new EntitySchema({
    tableName: 'LondonCitizen',
    name: 'londonCitizen',
    target: LondonCitizen,
    columns: {
        id: {
            primary: true,
            generated: true,
            type: 'int'
        },

        name: {
            type: 'varchar',
            nullable: false
        },

        posX: {
            type: 'int',
            nullable: false
        },

        posY: {
            type: 'int',
            nullable: false
        },

        isVictim: {
            type: 'boolean',
            nullable: false
        },
    }
})