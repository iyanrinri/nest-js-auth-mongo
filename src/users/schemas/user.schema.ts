
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  @Prop({required: true})
  name: string;

  @Prop({required: true})
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Virtual property agar 'id' sama dengan '_id'
UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
UserSchema.set('toJSON', { virtuals: true });
