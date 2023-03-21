import {AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @AfterInsert()
    logInsert() {
        console.log("User inserted with id: ", this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log("User updated with id: ", this.id)
    }

    @AfterRemove()
    logRemove() {
        console.log("User removed with id: ", this.id);
    }
}
