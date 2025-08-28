
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Exclude } from 'class-transformer';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  @Prop({required: true})
  name: string;

  @Prop({required: true})
  email: string;

  @Prop()
  @Exclude()
  password: string;

  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

UserSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc: any, ret: { [key: string]: any }) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  }
});
