import { MemberPaper, IMemberPaper } from '../../db/models';

export class MemberPaperServices {
  MemberPaper = MemberPaper;

  public createMemberPaper(d: IMemberPaper) {
    return this.MemberPaper.create(d);
  }

  public async updateMemberPaper(d: IMemberPaper) {
    const member = await this.MemberPaper.findByPk(d.id);
    return member.update(d);
  }

  public async deleteMemberPaper(id: number) {
    return this.MemberPaper.findByPk(id).then(d => d.destroy());
  }
}
