import { BaseModel } from './BaseModel';

export class PushSubscriptionModel extends BaseModel {
  id!: number;
  userId!: number;
  subscription!: PushSubscriptionJSON;
  token!: string;
}