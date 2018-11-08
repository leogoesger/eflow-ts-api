import { Member, Paper, IPaper } from '../../db/models';

export class paperServices {
  Paper = Paper;

  public getPapers() {
    return this.Paper.findAll({});
  }

  public getPaper(id: number) {
    return this.Paper.findOne({
      where: { id },
      include: [{ model: Member, as: 'members' }],
    });
  }

  public createPaper(d: IPaper) {
    return this.Paper.create(d);
  }

  public async updatePaper(d: IPaper) {
    const member = await this.Paper.findById(d.id);
    return member.updateAttributes(d);
  }

  public async deletePaper(id: number) {
    return this.Paper.findById(id).then(d => d.destroy());
  }
}
