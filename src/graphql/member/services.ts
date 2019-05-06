import { Member, Paper, IMember } from '../../db/models';

export class MemberServices {
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
    const member = await this.Member.findByPk(d.id);
    return member.update(d);
  }

  public async deleteMember(id: number) {
    return this.Member.findByPk(id).then(d => d.destroy());
  }
}
