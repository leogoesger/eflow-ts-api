import { MemberPaper, IMemberPaper } from '../../db/models';

export class memberPaperServices {
  MemberPaper = MemberPaper;

  public createMemberPaper(d: IMemberPaper) {
    return this.MemberPaper.create(d);
  }

  public async updateMemberPaper(d: IMemberPaper) {
    const member = await this.MemberPaper.findById(d.id);
    return member.updateAttributes(d);
  }

  public async deleteMemberPaper(id: number) {
    return this.MemberPaper.findById(id).then(d => d.destroy());
  }
}
