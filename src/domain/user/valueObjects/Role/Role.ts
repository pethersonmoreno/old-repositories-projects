import { v4 as uuidv4 } from 'uuid';

const securityValue = uuidv4();

export default class Role{
    private constructor(secValue: any){
        if(secValue !== securityValue){
            throw new Error("Invalid Instantiation")
        }
    }
}