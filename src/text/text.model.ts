import { Column, DataType, Model, Table } from "sequelize-typescript";



@Table
export class Text extends Model<Text> {
  @Column({allowNull: false, autoIncrement: true, primaryKey: true,type: DataType.INTEGER, unique: true})
  id: number;
  @Column({allowNull: false,  type: DataType.STRING})
  lang: string
  @Column({allowNull: false,  type: DataType.STRING})
  type: string
  @Column({allowNull: false,  type: DataType.STRING})
  key: string
  @Column({allowNull: false,  type: DataType.STRING(1000), unique: true})
  text: string
}