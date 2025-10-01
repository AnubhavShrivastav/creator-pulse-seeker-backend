import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUser extends Document {
  pk: number;
  username: string;
  full_name?: string;
  is_private?: boolean;
  profile_pic_url?: string;
  profile_pic_url_hd?: string | null;
  is_verified?: boolean;
  media_count?: number;
  follower_count?: number;
  following_count?: number;
  biography?: string;
  external_url?: string;
  account_type?: number;
  is_business?: boolean;
  public_email?: string;
  contact_phone_number?: string;
  public_phone_country_code?: string;
  public_phone_number?: string;
  business_contact_method?: string;
  business_category_name?: string | null;
  category_name?: string | null;
  category?: string;
  address_street?: string;
  city_id?: string;
  city_name?: string;
  latitude?: number;
  longitude?: number;
  zip?: string;
  instagram_location_id?: string;
  interop_messaging_user_fbid?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    pk: { type: Number, unique: true, required: true },
    username: { type: String, required: true },
    full_name: { type: String },
    is_private: { type: Boolean },
    profile_pic_url: { type: String },
    profile_pic_url_hd: { type: String },
    is_verified: { type: Boolean },
    media_count: { type: Number },
    follower_count: { type: Number },
    following_count: { type: Number },
    biography: { type: String },
    external_url: { type: String },
    account_type: { type: Number },
    is_business: { type: Boolean },
    public_email: { type: String },
    contact_phone_number: { type: String },
    public_phone_country_code: { type: String },
    public_phone_number: { type: String },
    business_contact_method: { type: String },
    business_category_name: { type: String },
    category_name: { type: String },
    category: { type: String },
    address_street: { type: String },
    city_id: { type: String },
    city_name: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    zip: { type: String },
    instagram_location_id: { type: String },
    interop_messaging_user_fbid: { type: Number },
  },
  { timestamps: true }
);

const Creator: Model<IUser> = mongoose.model<IUser>("Creator", userSchema);

export default Creator;
