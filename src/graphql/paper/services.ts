import { Member, Paper, IPaper } from '../../db/models';

export class PaperServices {
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
    const member = await this.Paper.findByPk(d.id);
    return member.update(d);
  }

  public async deletePaper(id: number) {
    return this.Paper.findByPk(id).then(d => d.destroy());
  }
}
