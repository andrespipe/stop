import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlayerDocument = Player & Document;

export class Player {

  @Prop()
  countryId: number;
  @Prop()
  userId: number | {};
  @Prop({ required: true })
  nickName: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
