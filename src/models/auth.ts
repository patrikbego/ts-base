import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Auth {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    email!: string;

    @Column()
    refreshToken!: string;

    @Column()
    accessToken!: string;

    @Column()
    userId!: number;
    
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}