import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Flavor } from './flavor.entity';

@Schema({
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
  timestamps: true,
})
export class Coffee extends Document {
  @Prop()
  name: string;

  @Prop()
  brand: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flavor' }],
  })
  flavors: Array<Flavor>;
}

export const CoffeeSchema = SchemaFactory.createForClass(Coffee);
