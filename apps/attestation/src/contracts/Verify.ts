import { Field, SmartContract, state, State, method } from 'o1js';

export class Verify extends SmartContract {
    @state(Field) initial = State<Field>();

    @method async assertEqual() {
        
    }
    @method async assertGreater() {
        
    }
    @method async assertLesser() {
        
    }
    @method async assertGreaterEqual() {
        
    }
    @method async assertLesserEqual() {
        
    }
}