import {
  ISubjectModels,
  TSubjectCategory,
  TWeekNumber,
  TSemester,
} from '../interface/model';

class Subject implements ISubjectModels {
  public id: string = '';

  public subject_name: string = '';

  public semester: TSemester = 'semester_1';

  public week_number: TWeekNumber = 'week1';

  public subject_category: TSubjectCategory = 'back_end';

  public subject_ppt_slide_url: string = '';

  public created_at: number = new Date().getTime();

  public updated_at: number = -1;

  public created_by: string = '';

  public updated_by: string = '';

  constructor(data?: ISubjectModels) {
    if (data) {
      this.subject_name = data.subject_name;
      this.week_number = data.week_number;
      this.subject_category = data.subject_category;
      this.subject_ppt_slide_url = data.subject_ppt_slide_url;
    }
  }

  public getAttributes(withId?: boolean) {
    if (withId) {
      return {
        id: this.id,
        subject_name: this.subject_name,
        semester: this.semester,
        week_number: this.week_number,
        subject_category: this.subject_category,
        subject_ppt_slide_url: this.subject_ppt_slide_url,
        created_at: this.created_at,
        updated_at: this.updated_at,
        created_by: this.created_by,
        updated_by: this.updated_by,
      };
    }

    return {
      subject_name: this.subject_name,
      semester: this.semester,
      week_number: this.week_number,
      subject_category: this.subject_category,
      subject_ppt_slide_url: this.subject_ppt_slide_url,
      created_at: this.created_at,
      updated_at: this.updated_at,
      created_by: this.created_by,
      updated_by: this.updated_by,
    };
  }
}

export default Subject;
