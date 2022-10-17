import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Coffee } from './coffee.entity';

@Schema({
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
  timestamps: true,
})
export class Flavor extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Coffee' }],
  })
  coffees: Coffee[];
}

export const flavorSchema = SchemaFactory.createForClass(Flavor);
