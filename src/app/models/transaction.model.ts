
/* Blueprint for a single transaction. Every transaction has an id, description and an amount and their respective getters.*/

export class Transaction {

    constructor(private id: number, private amount: number, private description: string) {}

    getId() {
        return this.id;
    }

    getAmount() {
        return this.amount;
    }

    getDescription() {
        return this.description;
    }



}