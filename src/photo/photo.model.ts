import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class Photo extends Model<Photo> {
  @Column({allowNull:false,unique:true,autoIncrement:true, type: DataType.INTEGER, primaryKey: true})
  id: number;


  @Column({allowNull:true,unique:true, type: DataType.STRING})
  commonName: string;

  @Column({type: DataType.STRING, allowNull:true,unique:false})
  name_s: string;

  @Column({type: DataType.STRING, allowNull:true,unique:false})
  name_l: string;

  @Column({type: DataType.STRING, allowNull:true,unique:false})
  path_s: string;

  @Column({type: DataType.STRING, allowNull:true,unique:false})
  path_l: string;

  @Column({type: DataType.STRING, allowNull:false,unique:false})
  type: string
}