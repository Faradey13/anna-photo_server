import { Column, DataType, Model, Table } from "sequelize-typescript";


@Table
export class User extends Model<User>{
  @Column({allowNull: false, unique: true, autoIncrement: true, primaryKey: true, type: DataType.INTEGER})
  id: number;

  @Column({unique: true, type: DataType.STRING})
  email: string;

  @Column({unique: true, type: DataType.STRING})
  password: string;

}