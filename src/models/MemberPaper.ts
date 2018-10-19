import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface IMemberPaper {
  id: number;
  memberId: number;
  paperId: number;
}

type MemberPaperInstance = Sequelize.Instance<IMemberPaper> & IMemberPaper;

type MemberPaperModel = Sequelize.Model<MemberPaperInstance, IMemberPaper>;

const memberPaperFactory = (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IMemberPaper> = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    memberId: Sequelize.INTEGER,
    paperId: Sequelize.INTEGER,
  };
  const MemberPaper = sequalize.define<MemberPaperInstance, IMemberPaper>(
    'MemberPaper',
    attributes
  );

  return MemberPaper;
};

export { memberPaperFactory, MemberPaperModel };
