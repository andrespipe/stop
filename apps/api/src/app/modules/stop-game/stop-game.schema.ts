import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
// import * as mongoose from 'mongoose';

export type StopGameDocument = StopGame & Document;

@Schema()
export class StopGame {
  id: string;
  @Prop({ required: true })
  isPrivateGame: boolean;
  @Prop({ required: true })
  language: string;
  //@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }] })
  @Prop({ required: true })
  players: any[];
  @Prop({ required: true })
  rounds: number;
}

export const StopGameSchema = SchemaFactory.createForClass(StopGame);
