import { Member, Paper, IMember } from '../../db/models';

export class memberServices {
  Member = Member;

  public getMembers() {
    return this.Member.findAll();
  }

  public getMember(id: number) {
    return this.Member.findOne({
      where: { id },
      include: [{ model: Paper, as: 'papers' }],
    });
  }

  public createMember(d: IMember) {
    return this.Member.create(d);
  }

  public async updateMember(d: IMember) {
    const member = await this.Member.findById(d.id);
    return member.updateAttributes(d);
  }

  public async deleteMember(id: number) {
    return this.Member.findById(id).then(d => d.destroy());
  }
}
