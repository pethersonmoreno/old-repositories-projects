import { v4 as uuidv4 } from 'uuid';

const securityValue = uuidv4();

type ValidRole = 'Administrator' | 'PokemonTrainer';

export default class Role{
    private constructor(value: ValidRole, secValue: any){
        if(secValue !== securityValue){
            throw new Error("Invalid Instantiation")
        }
    }
    
    private static create(value: ValidRole, secValue: any){
        return new Role(value, secValue);
    }

    public static createAdministrator() {
        return this.create('Administrator', securityValue);
    }

    public static createPokemonTrainer() {
        return this.create('PokemonTrainer', securityValue);
    }
}