import {
  IUserModels,
  TRole,
} from '../interface/model';

class User implements IUserModels {
  public id: string = '';

  public user_email: string = '';

  public user_isVerified: boolean = false;

  public user_full_name: string = '';

  public user_role: TRole = 'student';

  public user_status_active: boolean = false;

  public user_phone_number: string = '';

  public user_photo_url: string = '';

  public created_at: number = new Date().getTime();

  public updated_at: number = -1;

  public created_by: string = 'Firebase system';

  public updated_by: string = '';

  constructor(data?: any) {
    if (data) {
      this.user_email = data.user_email;
      this.user_isVerified = data.user_isVerified;
      this.user_full_name = data.user_full_name;
      this.user_role = data.user_role;
      this.user_status_active = data.user_status_active;
      this.user_phone_number = data.user_phone_number;
      this.user_photo_url = data.user_photo_url;
    }
  }

  public getAttributes(withId?: boolean) {
    if (withId) {
      return {
        id: this.id,
        user_email: this.user_email,
        user_isVerified: this.user_isVerified,
        user_full_name: this.user_full_name,
        user_role: this.user_role,
        user_status_active: this.user_status_active,
        user_phone_number: this.user_phone_number,
        user_photo_url: this.user_photo_url,
        created_at: this.created_at,
        updated_at: this.updated_at,
        created_by: this.created_by,
        updated_by: this.updated_by,
      };
    }
    return {
      user_email: this.user_email,
      user_isVerified: this.user_isVerified,
      user_full_name: this.user_full_name,
      user_role: this.user_role,
      user_status_active: this.user_status_active,
      user_phone_number: this.user_phone_number,
      user_photo_url: this.user_photo_url,
      created_at: this.created_at,
      updated_at: this.updated_at,
      created_by: this.created_by,
      updated_by: this.updated_by,
    };
  }
}

export default User;
